import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User';
import LoginLog from '../models/LoginLog';
import { parseRequestInfo } from '../utils/deviceDetector';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { asyncHandler, createError } from '../middleware/errorHandler';

// ── Validators ─────────────────────────────────────────────────────────────
export const registerValidators = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
  body('role')
    .optional()
    .isIn(['student', 'parent'])
    .withMessage('Invalid role. Only student or parent allowed on self-registration.'),
  body('phone').optional().trim(),
];

export const loginValidators = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// ── Register ────────────────────────────────────────────────────────────────
export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { firstName, lastName, email, password, role = 'student', phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError('Email already registered', 409);
  }

  const user = await User.create({ firstName, lastName, email, password, role, phone });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    },
  });
});

// ── Login ───────────────────────────────────────────────────────────────────
export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;
  const deviceInfo = parseRequestInfo(req);

  const user = await User.findOne({ email, isActive: true }).select('+password +refreshToken');
  if (!user) {
    // Save failed login attempt
    await LoginLog.create({
      email,
      status: 'failed',
      failureReason: 'User not found or account deactivated',
      ...deviceInfo,
    });
    throw createError('Invalid email or password', 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    // Save failed login attempt
    await LoginLog.create({
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: 'failed',
      failureReason: 'Incorrect password',
      ...deviceInfo,
    });
    throw createError('Invalid email or password', 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save successful login log & update user's last login
  await LoginLog.create({
    userId: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    status: 'success',
    ...deviceInfo,
  });

  user.lastLogin = new Date();
  user.lastLoginIp = deviceInfo.ip;
  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        chessRating: user.chessRating,
      },
    },
  });
});

// ── Get Login History (Admin) ────────────────────────────────────────────────
export const getLoginHistory = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 50, email, status } = req.query;
  const filter: any = {};
  if (email) filter.email = new RegExp(String(email), 'i');
  if (status) filter.status = status;

  const logs = await LoginLog.find(filter)
    .sort({ timestamp: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .populate('userId', 'firstName lastName role');

  const total = await LoginLog.countDocuments(filter);

  res.json({
    success: true,
    data: {
      logs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

// ── Refresh Token ───────────────────────────────────────────────────────────
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  if (!token) throw createError('Refresh token required', 400);

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw createError('Invalid or expired refresh token', 401);
  }

  const user = await User.findById(payload.userId).select('+refreshToken');
  if (!user || user.refreshToken !== token) {
    throw createError('Refresh token revoked or invalid', 401);
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await user.save();

  res.json({
    success: true,
    data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
  });
});

// ── Logout ──────────────────────────────────────────────────────────────────
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// ── Get Me ──────────────────────────────────────────────────────────────────
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId);
  if (!user) throw createError('User not found', 404);

  res.json({ success: true, data: { user } });
});

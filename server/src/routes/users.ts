import { Router } from 'express';
import User from '../models/User';
import Enrollment from '../models/Enrollment';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Admin: list all users (with filtering)
router.get(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const { role, active, page = 1, limit = 20, search } = req.query;
    const query: any = {};
    if (role) query.role = role;
    if (active !== undefined) query.isActive = active === 'true';
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      User.countDocuments(query),
    ]);

    res.json({ success: true, data: { users, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } });
  })
);

// Admin: create user (coach / admin)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) throw createError('Email already registered', 409);
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: { user } });
  })
);

// Any authenticated user: get their own profile
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const user = await User.findById(req.user.userId);
    if (!user) throw createError('User not found', 404);
    res.json({ success: true, data: { user } });
  })
);

// Any authenticated user: update their own profile
router.put(
  '/me',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const { password, role, refreshToken, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
      new: true, runValidators: true,
    });
    if (!user) throw createError('User not found', 404);
    res.json({ success: true, data: { user } });
  })
);

// Admin: update any user
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const { password, refreshToken, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true, runValidators: true,
    });
    if (!user) throw createError('User not found', 404);
    res.json({ success: true, data: { user } });
  })
);

// Admin: toggle user active status
router.patch(
  '/:id/toggle-active',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const user = await User.findById(req.params.id);
    if (!user) throw createError('User not found', 404);
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, data: { user } });
  })
);

// Student/Parent: get student's enrollments
router.get(
  '/:id/enrollments',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    // Only allow access to own data or admin/coach
    if (req.user.userId !== req.params.id && !['admin', 'coach'].includes(req.user.role)) {
      throw createError('Access denied', 403);
    }
    const enrollments = await Enrollment.find({ studentId: req.params.id })
      .populate('courseId', 'title thumbnail skillLevel schedule sessionsPerWeek')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: { enrollments } });
  })
);

export default router;

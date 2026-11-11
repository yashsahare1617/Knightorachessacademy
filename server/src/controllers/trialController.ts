import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import TrialBooking from '../models/TrialBooking';
import { asyncHandler, createError } from '../middleware/errorHandler';
import nodemailer from 'nodemailer';

// ── Validators ─────────────────────────────────────────────────────────────
export const trialValidators = [
  body('parentName').trim().notEmpty().withMessage('Parent/Guardian name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('studentName').trim().notEmpty().withMessage('Student name is required'),
  body('studentAge')
    .isInt({ min: 4, max: 80 })
    .withMessage('Student age must be between 4 and 80'),
  body('preferredDate').isISO8601().withMessage('Valid preferred date is required'),
  body('preferredTime').trim().notEmpty().withMessage('Preferred time is required'),
];

const sendNotificationEmail = async (booking: typeof TrialBooking.prototype) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@knightora.com',
      to: adminEmail,
      subject: `New Trial Booking - ${booking.studentName}`,
      html: `
        <h2>New Trial Class Booking</h2>
        <p><strong>Student:</strong> ${booking.studentName} (Age: ${booking.studentAge})</p>
        <p><strong>Parent:</strong> ${booking.parentName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Preferred Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</p>
        <p><strong>Preferred Time:</strong> ${booking.preferredTime}</p>
        <p><strong>Message:</strong> ${booking.message || 'None'}</p>
      `,
    });
  } catch (err) {
    console.error('Failed to send booking notification email:', err);
  }
};

// ── Create Trial Booking (Public) ────────────────────────────────────────────
export const createTrialBooking = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const booking = await TrialBooking.create(req.body);
  await sendNotificationEmail(booking);

  res.status(201).json({
    success: true,
    message: "Trial booking submitted! We'll confirm within 24 hours.",
    data: { bookingId: booking._id },
  });
});

// ── Get All Trial Bookings (Admin) ───────────────────────────────────────────
export const getTrialBookings = asyncHandler(async (req: Request, res: Response) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query: Record<string, unknown> = {};
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [bookings, total] = await Promise.all([
    TrialBooking.find(query)
      .populate('interestedCourse', 'title')
      .populate('assignedCoach', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    TrialBooking.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: { bookings, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) },
  });
});

// ── Update Trial Booking Status (Admin/Coach) ────────────────────────────────
export const updateTrialBooking = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = await TrialBooking.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!booking) throw createError('Booking not found', 404);
  res.json({ success: true, data: { booking } });
});

// ── Delete Trial Booking (Admin) ─────────────────────────────────────────────
export const deleteTrialBooking = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = await TrialBooking.findByIdAndDelete(id);
  if (!booking) throw createError('Booking not found', 404);
  res.json({ success: true, message: 'Booking deleted' });
});

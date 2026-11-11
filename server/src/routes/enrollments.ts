import { Router } from 'express';
import Enrollment from '../models/Enrollment';
import Course from '../models/Course';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Admin: enroll a student
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const existing = await Enrollment.findOne({
      studentId: req.body.studentId,
      courseId: req.body.courseId,
    });
    if (existing) throw createError('Student already enrolled in this course', 409);

    const enrollment = await Enrollment.create(req.body);

    // Update course student count
    await Course.findByIdAndUpdate(req.body.courseId, { $inc: { currentStudents: 1 } });

    const populated = await enrollment.populate([
      { path: 'studentId', select: 'firstName lastName email' },
      { path: 'courseId', select: 'title skillLevel' },
    ]);

    res.status(201).json({ success: true, data: { enrollment: populated } });
  })
);

// Student: get own enrollments
router.get(
  '/my',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const enrollments = await Enrollment.find({ studentId: req.user.userId })
      .populate('courseId', 'title thumbnail skillLevel schedule sessionsPerWeek coachId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: { enrollments } });
  })
);

// Admin: list all enrollments
router.get(
  '/',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    const { courseId, status, page = 1, limit = 20 } = req.query;
    const query: any = {};
    if (courseId) query.courseId = courseId;
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [enrollments, total] = await Promise.all([
      Enrollment.find(query)
        .populate('studentId', 'firstName lastName email chessRating')
        .populate('courseId', 'title skillLevel')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Enrollment.countDocuments(query),
    ]);

    res.json({ success: true, data: { enrollments, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } });
  })
);

// Admin: update enrollment
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!enrollment) throw createError('Enrollment not found', 404);
    res.json({ success: true, data: { enrollment } });
  })
);

export default router;

import { Request, Response } from 'express';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';
import { asyncHandler, createError } from '../middleware/errorHandler';

// ── Get All Courses (Public) ─────────────────────────────────────────────────
export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const { skillLevel, ageGroup, featured, active = 'true', page = 1, limit = 12 } = req.query;
  const query: Record<string, unknown> = {};

  if (active === 'true') query.isActive = true;
  if (skillLevel) query.skillLevel = skillLevel;
  if (ageGroup) query.ageGroup = ageGroup;
  if (featured === 'true') query.isFeatured = true;

  const skip = (Number(page) - 1) * Number(limit);
  const [courses, total] = await Promise.all([
    Course.find(query)
      .populate('coachId', 'firstName lastName avatar bio')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Course.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: { courses, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) },
  });
});

// ── Get Single Course ────────────────────────────────────────────────────────
export const getCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await Course.findOne({ slug: req.params.slug, isActive: true }).populate(
    'coachId',
    'firstName lastName avatar bio specializations experience'
  );
  if (!course) throw createError('Course not found', 404);
  res.json({ success: true, data: { course } });
});

// ── Create Course (Admin) ────────────────────────────────────────────────────
export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  // Auto-generate slug from title
  if (!req.body.slug) {
    req.body.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: { course } });
});

// ── Update Course (Admin) ────────────────────────────────────────────────────
export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) throw createError('Course not found', 404);
  res.json({ success: true, data: { course } });
});

// ── Delete Course (Admin) ────────────────────────────────────────────────────
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await Course.findById(req.params.id);
  if (!course) throw createError('Course not found', 404);

  // Check for active enrollments
  const activeEnrollments = await Enrollment.countDocuments({
    courseId: course._id,
    status: 'active',
  });
  if (activeEnrollments > 0) {
    throw createError(
      `Cannot delete: ${activeEnrollments} active enrollment(s) exist. Deactivate the course instead.`,
      409
    );
  }

  await course.deleteOne();
  res.json({ success: true, message: 'Course deleted successfully' });
});

// ── Get Course Enrollments (Admin/Coach) ─────────────────────────────────────
export const getCourseEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const enrollments = await Enrollment.find({ courseId: req.params.id, status: 'active' })
    .populate('studentId', 'firstName lastName email avatar chessRating')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: { enrollments } });
});

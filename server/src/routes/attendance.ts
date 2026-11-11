import { Router } from 'express';
import Attendance from '../models/Attendance';
import Enrollment from '../models/Enrollment';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Coach: mark attendance for a session
router.post(
  '/',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    const { courseId, sessionDate, sessionTopic, records } = req.body;
    const coachId = req.user.userId;

    // Prevent duplicate sessions on same date
    const existing = await Attendance.findOne({
      courseId,
      sessionDate: new Date(sessionDate),
    });
    if (existing) throw createError('Attendance already marked for this date', 409);

    const attendance = await Attendance.create({ courseId, coachId, sessionDate, sessionTopic, records });
    res.status(201).json({ success: true, data: { attendance } });
  })
);

// Coach/Admin: get attendance for a course
router.get(
  '/course/:courseId',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [sessions, total] = await Promise.all([
      Attendance.find({ courseId: req.params.courseId })
        .populate('records.studentId', 'firstName lastName')
        .sort({ sessionDate: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Attendance.countDocuments({ courseId: req.params.courseId }),
    ]);
    res.json({ success: true, data: { sessions, total } });
  })
);

// Student: get own attendance summary
router.get(
  '/my/:courseId',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const sessions = await Attendance.find({ courseId: req.params.courseId });
    const total = sessions.length;
    const present = sessions.filter(s =>
      s.records.some(r => r.studentId.toString() === req.user.userId && r.present)
    ).length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    res.json({ success: true, data: { total, present, absent: total - present, percentage } });
  })
);

// Coach: update an attendance record
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) throw createError('Attendance record not found', 404);
    res.json({ success: true, data: { attendance } });
  })
);

export default router;

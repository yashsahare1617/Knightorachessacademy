import { Router } from 'express';
import User from '../models/User';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';
import Attendance from '../models/Attendance';
import TrialBooking from '../models/TrialBooking';
import Assignment from '../models/Assignment';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Admin: dashboard summary stats
router.get(
  '/admin-summary',
  authenticate,
  authorize('admin'),
  asyncHandler(async (_req: any, res: any) => {
    const [
      totalStudents,
      totalCoaches,
      totalCourses,
      activeEnrollments,
      pendingTrials,
      totalParents,
    ] = await Promise.all([
      User.countDocuments({ role: 'student', isActive: true }),
      User.countDocuments({ role: 'coach', isActive: true }),
      Course.countDocuments({ isActive: true }),
      Enrollment.countDocuments({ status: 'active' }),
      TrialBooking.countDocuments({ status: 'pending' }),
      User.countDocuments({ role: 'parent', isActive: true }),
    ]);

    res.json({
      success: true,
      data: {
        totalStudents,
        totalCoaches,
        totalCourses,
        activeEnrollments,
        pendingTrials,
        totalParents,
      },
    });
  })
);

// Student: progress report
router.get(
  '/student/:studentId',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    // Students can only see own report; admin/coach can see any
    if (
      req.user.userId !== req.params.studentId &&
      !['admin', 'coach'].includes(req.user.role)
    ) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const [enrollments, assignments] = await Promise.all([
      Enrollment.find({ studentId: req.params.studentId })
        .populate('courseId', 'title skillLevel sessionsPerWeek'),
      Assignment.find({
        'submissions.studentId': req.params.studentId,
      }).select('title maxGrade submissions courseId'),
    ]);

    // Calculate attendance per course
    const attendancePromises = enrollments.map(async (enrollment: any) => {
      const sessions = await Attendance.find({ courseId: enrollment.courseId._id });
      const total = sessions.length;
      const present = sessions.filter(s =>
        s.records.some(r => r.studentId.toString() === req.params.studentId && r.present)
      ).length;
      return {
        courseId: enrollment.courseId._id,
        courseName: (enrollment.courseId as any).title,
        total,
        present,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0,
      };
    });

    const attendanceSummary = await Promise.all(attendancePromises);

    // Grade summary
    const grades = assignments.flatMap(a =>
      a.submissions
        .filter(s => s.studentId.toString() === req.params.studentId && s.grade !== undefined)
        .map(s => ({
          assignmentTitle: a.title,
          grade: s.grade,
          maxGrade: a.maxGrade,
          percentage: Math.round(((s.grade ?? 0) / a.maxGrade) * 100),
        }))
    );

    res.json({
      success: true,
      data: {
        enrollments,
        attendanceSummary,
        grades,
        averageGrade:
          grades.length > 0
            ? Math.round(grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length)
            : null,
      },
    });
  })
);

export default router;

import { Router } from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseEnrollments,
} from '../controllers/courseController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public
router.get('/', getCourses);
router.get('/:slug', getCourse);

// Admin only
router.post('/', authenticate, authorize('admin'), createCourse);
router.put('/:id', authenticate, authorize('admin'), updateCourse);
router.delete('/:id', authenticate, authorize('admin'), deleteCourse);
router.get('/:id/enrollments', authenticate, authorize('admin', 'coach'), getCourseEnrollments);

export default router;

import { Router } from 'express';
import {
  createTrialBooking,
  getTrialBookings,
  updateTrialBooking,
  deleteTrialBooking,
  trialValidators,
} from '../controllers/trialController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public: submit a trial booking
router.post('/', trialValidators, createTrialBooking);

// Admin/Coach: manage bookings
router.get('/', authenticate, authorize('admin', 'coach'), getTrialBookings);
router.put('/:id', authenticate, authorize('admin', 'coach'), updateTrialBooking);
router.delete('/:id', authenticate, authorize('admin'), deleteTrialBooking);

export default router;

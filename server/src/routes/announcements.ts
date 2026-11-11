import { Router } from 'express';
import Announcement from '../models/Announcement';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Public/Authenticated: get active announcements
router.get(
  '/',
  asyncHandler(async (req: any, res: any) => {
    const query: any = { isActive: true };
    // filter by expiry
    query.$or = [{ expiresAt: { $gt: new Date() } }, { expiresAt: null }];
    // optionally filter by role
    if (req.query.role) {
      query.targetRoles = { $in: [req.query.role, 'all'] };
    }
    const announcements = await Announcement.find(query).sort({ pinned: -1, createdAt: -1 }).limit(10);
    res.json({ success: true, data: { announcements } });
  })
);

// Admin: create
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const announcement = await Announcement.create({ ...req.body, createdBy: req.user.userId });
    res.status(201).json({ success: true, data: { announcement } });
  })
);

// Admin: update
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!announcement) throw createError('Announcement not found', 404);
    res.json({ success: true, data: { announcement } });
  })
);

// Admin: delete
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) throw createError('Announcement not found', 404);
    res.json({ success: true, message: 'Announcement deleted' });
  })
);

export default router;

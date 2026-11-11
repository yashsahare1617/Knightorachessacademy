import { Router } from 'express';
import Setting from '../models/Setting';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Public: get settings by category
router.get(
  '/',
  asyncHandler(async (req: any, res: any) => {
    const { category } = req.query;
    const query: any = {};
    if (category) query.category = category;
    const settings = await Setting.find(query).sort({ category: 1, key: 1 });
    // Convert to key-value map
    const map: Record<string, any> = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json({ success: true, data: { settings: map, raw: settings } });
  })
);

// Admin: upsert setting
router.put(
  '/:key',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { ...req.body, key: req.params.key, updatedBy: req.user.userId },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: { setting } });
  })
);

// Admin: bulk upsert settings
router.post(
  '/bulk',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const { settings } = req.body; // Array of {key, value, label, category, type}
    if (!Array.isArray(settings)) throw createError('Settings must be an array', 400);

    const ops = settings.map(s => ({
      updateOne: {
        filter: { key: s.key },
        update: { ...s, updatedBy: req.user.userId },
        upsert: true,
      },
    }));
    await Setting.bulkWrite(ops);
    res.json({ success: true, message: `${settings.length} settings updated` });
  })
);

export default router;

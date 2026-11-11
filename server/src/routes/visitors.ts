import { Router, Request, Response } from 'express';
import VisitorLog from '../models/VisitorLog';
import { parseRequestInfo } from '../utils/deviceDetector';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticate, authorize } from '../middleware/auth';
import { verifyAccessToken } from '../utils/jwt';

const router = Router();

// ── Track Visitor (Public - Non-blocking) ──────────────────────────────────
router.post(
  '/track',
  asyncHandler(async (req: Request, res: Response) => {
    const { visitorId, page, title, referrer, screenResolution } = req.body;

    if (!visitorId || !page) {
      return res.status(400).json({ success: false, message: 'visitorId and page are required' });
    }

    const deviceInfo = parseRequestInfo(req);

    // Optional user attachment if authenticated
    let userId: any = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const payload = verifyAccessToken(token);
        if (payload?.userId) {
          userId = payload.userId;
        }
      } catch {
        // Silently proceed as anonymous visitor
      }
    }

    await VisitorLog.create({
      visitorId: String(visitorId).trim(),
      page: String(page).trim(),
      title: title ? String(title).slice(0, 200) : undefined,
      referrer: referrer ? String(referrer).slice(0, 300) : undefined,
      screenResolution,
      userId,
      ...deviceInfo,
    });

    res.status(201).json({ success: true });
  })
);

// ── Get Visitor Analytics & Stats (Admin) ──────────────────────────────────
router.get(
  '/stats',
  authenticate,
  authorize('admin'),
  asyncHandler(async (_req: Request, res: Response) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalVisits,
      todayVisits,
      uniqueVisitorsResult,
      topPages,
      devices,
      recentVisitors,
    ] = await Promise.all([
      VisitorLog.countDocuments(),
      VisitorLog.countDocuments({ timestamp: { $gte: startOfToday } }),
      VisitorLog.distinct('visitorId'),
      VisitorLog.aggregate([
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      VisitorLog.aggregate([
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      VisitorLog.find()
        .sort({ timestamp: -1 })
        .limit(50)
        .populate('userId', 'firstName lastName email role'),
    ]);

    res.json({
      success: true,
      data: {
        totalVisits,
        todayVisits,
        uniqueVisitors: uniqueVisitorsResult.length,
        topPages,
        devices,
        recentVisitors,
      },
    });
  })
);

export default router;


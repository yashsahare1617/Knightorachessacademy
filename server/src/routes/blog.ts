import { Router } from 'express';
import BlogPost from '../models/BlogPost';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Public: get published posts
router.get(
  '/',
  asyncHandler(async (req: any, res: any) => {
    const { tag, category, page = 1, limit = 9 } = req.query;
    const query: any = { isPublished: true };
    if (tag) query.tags = tag;
    if (category) query.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate('authorId', 'firstName lastName avatar')
        .select('-content')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      BlogPost.countDocuments(query),
    ]);

    res.json({ success: true, data: { posts, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } });
  })
);

// Public: get single post (increments view count)
router.get(
  '/:slug',
  asyncHandler(async (req: any, res: any) => {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('authorId', 'firstName lastName avatar bio');
    if (!post) throw createError('Post not found', 404);
    res.json({ success: true, data: { post } });
  })
);

// Admin: create post
router.post(
  '/',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    if (!req.body.slug) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (req.body.isPublished && !req.body.publishedAt) {
      req.body.publishedAt = new Date();
    }
    req.body.authorId = req.user.userId;
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: { post } });
  })
);

// Admin: update post
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    if (req.body.isPublished && !req.body.publishedAt) req.body.publishedAt = new Date();
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) throw createError('Post not found', 404);
    res.json({ success: true, data: { post } });
  })
);

// Admin: delete post
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) throw createError('Post not found', 404);
    res.json({ success: true, message: 'Post deleted' });
  })
);

// Admin: list all posts (including drafts)
router.get(
  '/admin/all',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (_req: any, res: any) => {
    const posts = await BlogPost.find().populate('authorId', 'firstName lastName').sort({ createdAt: -1 });
    res.json({ success: true, data: { posts } });
  })
);

export default router;

import { Router } from 'express';
import Gallery from '../models/Gallery';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Public: list published albums
router.get(
  '/',
  asyncHandler(async (_req: any, res: any) => {
    const albums = await Gallery.find({ isPublished: true })
      .select('-images.cloudinaryId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: { albums } });
  })
);

// Public: get album
router.get(
  '/:slug',
  asyncHandler(async (req: any, res: any) => {
    const album = await Gallery.findOne({ slug: req.params.slug, isPublished: true });
    if (!album) throw createError('Album not found', 404);
    res.json({ success: true, data: { album } });
  })
);

// Admin: create album
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    if (!req.body.slug) {
      req.body.slug = req.body.albumName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    const album = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: { album } });
  })
);

// Admin: upload images to album
router.post(
  '/:id/images',
  authenticate,
  authorize('admin'),
  upload.array('images', 20),
  asyncHandler(async (req: any, res: any) => {
    const album = await Gallery.findById(req.params.id);
    if (!album) throw createError('Album not found', 404);

    const files = req.files as Express.Multer.File[];
    const uploadPromises = files.map(file =>
      uploadToCloudinary(file.buffer, 'knightora/gallery')
    );
    const results = await Promise.all(uploadPromises);

    const newImages = results.map((result, i) => ({
      url: result.secure_url,
      cloudinaryId: result.public_id,
      caption: req.body.captions?.[i] || '',
      order: album.images.length + i,
    }));

    album.images.push(...newImages as any);
    if (!album.coverImage && newImages.length > 0) {
      album.coverImage = newImages[0].url;
    }
    await album.save();

    res.json({ success: true, data: { album } });
  })
);

// Admin: delete image from album
router.delete(
  '/:id/images/:imageId',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: any, res: any) => {
    const album = await Gallery.findById(req.params.id);
    if (!album) throw createError('Album not found', 404);

    const img = album.images.find((i: any) => i._id.toString() === req.params.imageId);
    if (!img) throw createError('Image not found', 404);

    if (img.cloudinaryId) {
      await cloudinary.uploader.destroy(img.cloudinaryId);
    }

    album.images = album.images.filter((i: any) => i._id.toString() !== req.params.imageId) as any;
    await album.save();
    res.json({ success: true, message: 'Image deleted' });
  })
);

export default router;

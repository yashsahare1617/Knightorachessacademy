import { Router } from 'express';
import Assignment from '../models/Assignment';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Coach: create assignment
router.post(
  '/',
  authenticate,
  authorize('admin', 'coach'),
  upload.single('attachment'),
  asyncHandler(async (req: any, res: any) => {
    let attachmentUrl, cloudinaryId;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'knightora/assignments');
      attachmentUrl = result.secure_url;
      cloudinaryId = result.public_id;
    }

    const assignment = await Assignment.create({
      ...req.body,
      coachId: req.user.userId,
      attachmentUrl,
      cloudinaryId,
    });
    res.status(201).json({ success: true, data: { assignment } });
  })
);

// Get assignments for a course
router.get(
  '/course/:courseId',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const assignments = await Assignment.find({ courseId: req.params.courseId, isActive: true })
      .populate('coachId', 'firstName lastName')
      .sort({ dueDate: 1 });
    res.json({ success: true, data: { assignments } });
  })
);

// Student: submit assignment
router.post(
  '/:id/submit',
  authenticate,
  authorize('student'),
  upload.single('file'),
  asyncHandler(async (req: any, res: any) => {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) throw createError('Assignment not found', 404);

    const alreadySubmitted = assignment.submissions.some(
      s => s.studentId.toString() === req.user.userId
    );
    if (alreadySubmitted) throw createError('Already submitted', 409);

    let fileUrl, cloudinaryId;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'knightora/submissions');
      fileUrl = result.secure_url;
      cloudinaryId = result.public_id;
    }

    assignment.submissions.push({
      studentId: req.user.userId,
      submittedAt: new Date(),
      content: req.body.content,
      fileUrl,
      cloudinaryId,
    } as any);

    await assignment.save();
    res.json({ success: true, message: 'Assignment submitted successfully' });
  })
);

// Coach: grade submission
router.patch(
  '/:id/grade/:studentId',
  authenticate,
  authorize('admin', 'coach'),
  asyncHandler(async (req: any, res: any) => {
    const { grade, feedback } = req.body;
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) throw createError('Assignment not found', 404);

    const submission = assignment.submissions.find(
      s => s.studentId.toString() === req.params.studentId
    );
    if (!submission) throw createError('Submission not found', 404);

    submission.grade = grade;
    submission.feedback = feedback;
    submission.gradedAt = new Date();
    submission.gradedBy = req.user.userId;

    await assignment.save();
    res.json({ success: true, message: 'Graded successfully' });
  })
);

export default router;

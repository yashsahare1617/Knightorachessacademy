import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission {
  studentId: mongoose.Types.ObjectId;
  submittedAt: Date;
  content?: string;
  fileUrl?: string;
  cloudinaryId?: string;
  grade?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: mongoose.Types.ObjectId;
}

export interface IAssignment extends Document {
  courseId: mongoose.Types.ObjectId;
  coachId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  maxGrade: number;
  attachmentUrl?: string;
  cloudinaryId?: string;
  submissions: ISubmission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    submittedAt: { type: Date, default: Date.now },
    content: { type: String },
    fileUrl: { type: String },
    cloudinaryId: { type: String },
    grade: { type: Number, min: 0 },
    feedback: { type: String },
    gradedAt: { type: Date },
    gradedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: true }
);

const AssignmentSchema = new Schema<IAssignment>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    maxGrade: { type: Number, required: true, default: 100 },
    attachmentUrl: { type: String },
    cloudinaryId: { type: String },
    submissions: [SubmissionSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AssignmentSchema.index({ courseId: 1, dueDate: -1 });

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);

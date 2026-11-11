import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrolledAt: Date;
  status: 'active' | 'completed' | 'suspended' | 'dropped';
  progress: number; // 0-100 percentage
  paidAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  startDate: Date;
  endDate?: Date;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'suspended', 'dropped'],
      default: 'active',
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    paidAmount: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'refunded'],
      default: 'pending',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

// Unique student-course pair
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
EnrollmentSchema.index({ courseId: 1, status: 1 });

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

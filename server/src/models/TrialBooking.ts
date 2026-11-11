import mongoose, { Document, Schema } from 'mongoose';

export type TrialStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ITrialBooking extends Document {
  // Contact info
  parentName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  // Student info
  studentName: string;
  studentAge: number;
  currentLevel?: string;
  // Booking details
  preferredDate: Date;
  preferredTime: string;
  interestedCourse?: mongoose.Types.ObjectId;
  message?: string;
  status: TrialStatus;
  // Admin fields
  assignedCoach?: mongoose.Types.ObjectId;
  adminNotes?: string;
  confirmedDate?: Date;
  confirmedTime?: string;
  // Tracking
  referralSource?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrialBookingSchema = new Schema<ITrialBooking>(
  {
    parentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    studentName: { type: String, required: true, trim: true },
    studentAge: { type: Number, required: true, min: 4, max: 80 },
    currentLevel: { type: String, default: 'beginner' },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    interestedCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    message: { type: String, maxlength: 1000 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    assignedCoach: { type: Schema.Types.ObjectId, ref: 'User' },
    adminNotes: { type: String },
    confirmedDate: { type: Date },
    confirmedTime: { type: String },
    referralSource: { type: String },
  },
  { timestamps: true }
);

TrialBookingSchema.index({ status: 1, createdAt: -1 });
TrialBookingSchema.index({ email: 1 });

export default mongoose.model<ITrialBooking>('TrialBooking', TrialBookingSchema);

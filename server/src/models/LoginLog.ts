import mongoose, { Document, Schema } from 'mongoose';

export interface ILoginLog extends Document {
  userId?: mongoose.Types.ObjectId;
  email: string;
  fullName?: string;
  role?: string;
  status: 'success' | 'failed';
  failureReason?: string;
  ip: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  device?: string;
  timestamp: Date;
}

const LoginLogSchema = new Schema<ILoginLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true, lowercase: true, trim: true },
    fullName: { type: String, trim: true },
    role: { type: String },
    status: { type: String, enum: ['success', 'failed'], required: true },
    failureReason: { type: String },
    ip: { type: String, default: 'unknown' },
    userAgent: { type: String },
    browser: { type: String },
    os: { type: String },
    device: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

LoginLogSchema.index({ email: 1, timestamp: -1 });
LoginLogSchema.index({ status: 1, timestamp: -1 });
LoginLogSchema.index({ timestamp: -1 });

export default mongoose.model<ILoginLog>('LoginLog', LoginLogSchema);


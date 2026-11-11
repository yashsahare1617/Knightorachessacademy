import mongoose, { Document, Schema } from 'mongoose';

export interface IVisitorLog extends Document {
  visitorId: string;
  page: string;
  title?: string;
  referrer?: string;
  ip: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  device?: string;
  screenResolution?: string;
  userId?: mongoose.Types.ObjectId;
  timestamp: Date;
}

const VisitorLogSchema = new Schema<IVisitorLog>(
  {
    visitorId: { type: String, required: true, index: true },
    page: { type: String, required: true, index: true },
    title: { type: String },
    referrer: { type: String },
    ip: { type: String, default: 'unknown' },
    userAgent: { type: String },
    browser: { type: String, default: 'Unknown' },
    os: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Desktop' },
    screenResolution: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

VisitorLogSchema.index({ timestamp: -1 });
VisitorLogSchema.index({ page: 1, timestamp: -1 });
VisitorLogSchema.index({ visitorId: 1, timestamp: -1 });

export default mongoose.model<IVisitorLog>('VisitorLog', VisitorLogSchema);


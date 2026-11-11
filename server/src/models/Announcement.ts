import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'event';
  targetRoles: string[]; // ['all'] or specific roles
  isActive: boolean;
  pinned: boolean;
  expiresAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'event'],
      default: 'info',
    },
    targetRoles: [{ type: String }],
    isActive: { type: Boolean, default: true },
    pinned: { type: Boolean, default: false },
    expiresAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

AnnouncementSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);

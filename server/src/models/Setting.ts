import mongoose, { Document, Schema } from 'mongoose';

// Key-value settings store for academy configuration
export interface ISetting extends Document {
  key: string;
  value: string | number | boolean | object;
  type: 'string' | 'number' | 'boolean' | 'json';
  category: string;
  label: string;
  description?: string;
  updatedBy?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    type: {
      type: String,
      enum: ['string', 'number', 'boolean', 'json'],
      default: 'string',
    },
    category: { type: String, default: 'general' },
    label: { type: String, required: true },
    description: { type: String },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

SettingSchema.index({ key: 1 });
SettingSchema.index({ category: 1 });

export default mongoose.model<ISetting>('Setting', SettingSchema);

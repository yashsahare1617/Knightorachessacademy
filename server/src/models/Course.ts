import mongoose, { Document, Schema } from 'mongoose';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';
export type AgeGroup = 'kids' | 'juniors' | 'teens' | 'adults' | 'all';

export interface ISchedule {
  dayOfWeek: number; // 0=Sun, 6=Sat
  startTime: string; // "HH:MM"
  endTime: string;
}

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  skillLevel: SkillLevel;
  ageGroup: AgeGroup;
  ageMin?: number;
  ageMax?: number;
  duration: number; // in weeks
  sessionsPerWeek: number;
  sessionDuration: number; // in minutes
  price: number;
  currency: string;
  maxStudents: number;
  currentStudents: number;
  coachId?: mongoose.Types.ObjectId;
  schedule: ISchedule[];
  thumbnail?: string;
  cloudinaryId?: string;
  topics: string[];
  prerequisites: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false }
);

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'elite'],
      required: true,
    },
    ageGroup: {
      type: String,
      enum: ['kids', 'juniors', 'teens', 'adults', 'all'],
      required: true,
    },
    ageMin: { type: Number },
    ageMax: { type: Number },
    duration: { type: Number, required: true },
    sessionsPerWeek: { type: Number, required: true, default: 2 },
    sessionDuration: { type: Number, required: true, default: 60 },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    maxStudents: { type: Number, required: true, default: 20 },
    currentStudents: { type: Number, default: 0 },
    coachId: { type: Schema.Types.ObjectId, ref: 'User' },
    schedule: [ScheduleSchema],
    thumbnail: { type: String },
    cloudinaryId: { type: String },
    topics: [{ type: String }],
    prerequisites: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

CourseSchema.index({ skillLevel: 1, ageGroup: 1 });
CourseSchema.index({ isFeatured: 1, isActive: 1 });

export default mongoose.model<ICourse>('Course', CourseSchema);

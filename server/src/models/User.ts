import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'admin' | 'coach' | 'student' | 'parent';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  cloudinaryId?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  refreshToken?: string;
  // Student-specific
  dateOfBirth?: Date;
  parentId?: mongoose.Types.ObjectId;
  chessRating?: number;
  // Coach-specific
  bio?: string;
  specializations?: string[];
  experience?: number;
  // Parent-specific
  childrenIds?: mongoose.Types.ObjectId[];
  lastLogin?: Date;
  lastLoginIp?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  fullName: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ['admin', 'coach', 'student', 'parent'],
      default: 'student',
    },
    phone: { type: String, trim: true },
    avatar: { type: String },
    cloudinaryId: { type: String },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    refreshToken: { type: String, select: false },
    // Student fields
    dateOfBirth: { type: Date },
    parentId: { type: Schema.Types.ObjectId, ref: 'User' },
    chessRating: { type: Number, default: 0 },
    // Coach fields
    bio: { type: String, maxlength: 1000 },
    specializations: [{ type: String }],
    experience: { type: Number },
    // Parent fields
    childrenIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastLogin: { type: Date },
    lastLoginIp: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual full name
UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Index for fast queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ parentId: 1 });

export default mongoose.model<IUser>('User', UserSchema);

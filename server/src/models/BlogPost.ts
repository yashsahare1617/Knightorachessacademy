import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML/Markdown content
  authorId: mongoose.Types.ObjectId;
  coverImage?: string;
  cloudinaryId?: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  publishedAt?: Date;
  views: number;
  readTime: number; // minutes
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 500 },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coverImage: { type: String },
    cloudinaryId: { type: String },
    tags: [{ type: String, lowercase: true }],
    category: { type: String, default: 'General' },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 },
  },
  { timestamps: true }
);

BlogPostSchema.index({ isPublished: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

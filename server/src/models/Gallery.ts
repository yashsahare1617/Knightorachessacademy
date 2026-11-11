import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryImage {
  url: string;
  cloudinaryId: string;
  caption?: string;
  order: number;
}

export interface IGallery extends Document {
  albumName: string;
  slug: string;
  description?: string;
  coverImage?: string;
  images: IGalleryImage[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    caption: { type: String },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const GallerySchema = new Schema<IGallery>(
  {
    albumName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    coverImage: { type: String },
    images: [GalleryImageSchema],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

GallerySchema.index({ slug: 1 });

export default mongoose.model<IGallery>('Gallery', GallerySchema);

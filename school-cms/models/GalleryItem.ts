import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  image: string;
  mediaType?: "image" | "video";
  category?: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    category: { type: String, trim: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export default GalleryItem;

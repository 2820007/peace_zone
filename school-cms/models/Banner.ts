import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  image: string;
  buttonLabel?: string;
  buttonHref?: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    image: { type: String, required: true },
    buttonLabel: { type: String, trim: true },
    buttonHref: { type: String, trim: true },
    displayOrder: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;

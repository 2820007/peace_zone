import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IHomeBanner extends Document {
  title: string;
  image: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HomeBannerSchema = new Schema<IHomeBanner>(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    displayOrder: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const HomeBanner: Model<IHomeBanner> =
  mongoose.models.HomeBanner || mongoose.model<IHomeBanner>("HomeBanner", HomeBannerSchema);

export default HomeBanner;

import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface INotice extends Document {
  title: string;
  slug: string;
  content: string;
  attachmentUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    attachmentUrl: { type: String },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const Notice: Model<INotice> =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);

export default Notice;

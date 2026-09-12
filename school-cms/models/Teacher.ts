import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISocialLinks {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface ITeacher extends Document {
  name: string;
  slug: string;
  designation: string;
  qualification?: string;
  department?: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  socialLinks?: ISocialLinks;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    designation: { type: String, required: true, trim: true },
    qualification: { type: String, trim: true },
    department: { type: String, trim: true, index: true },
    bio: { type: String },
    image: { type: String },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
    displayOrder: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

TeacherSchema.index({ name: "text", designation: "text", department: "text" });

const Teacher: Model<ITeacher> =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;

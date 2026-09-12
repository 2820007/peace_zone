import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  message: string;
  image?: string;
  rating: number;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    message: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    displayOrder: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ name: "text", message: "text" });

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;

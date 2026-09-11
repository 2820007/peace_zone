import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description?: string;
  location?: string;
  image?: string;
  startDate: Date;
  endDate?: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    location: { type: String, trim: true },
    image: { type: String },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;

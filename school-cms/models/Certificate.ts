import mongoose, { Schema, type Document, type Model } from "mongoose";

export type CertificateType =
  | "Achievement"
  | "Completion"
  | "Participation"
  | "Excellence"
  | "Appreciation"
  | "Other";

export type CertificateTemplate = "classic" | "modern";
export type CertificateStatus = "draft" | "issued" | "revoked";

export interface ICertificate extends Document {
  certificateId: string;
  studentName: string;
  studentId: string;
  certificateType: CertificateType;
  title: string;
  description?: string;
  program?: string;
  course?: string;
  issueDate: Date;
  template: CertificateTemplate;
  principalName?: string;
  principalSignature?: string;
  coordinatorName?: string;
  coordinatorSignature?: string;
  status: CertificateStatus;
  qrCodeUrl?: string;
  verificationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    studentName: { type: String, required: true, trim: true },
    studentId: { type: String, required: true, trim: true },
    certificateType: {
      type: String,
      enum: ["Achievement", "Completion", "Participation", "Excellence", "Appreciation", "Other"],
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    program: { type: String, trim: true },
    course: { type: String, trim: true },
    issueDate: { type: Date, required: true, index: true },
    template: { type: String, enum: ["classic", "modern"], default: "classic", index: true },
    principalName: { type: String, trim: true },
    principalSignature: { type: String },
    coordinatorName: { type: String, trim: true },
    coordinatorSignature: { type: String },
    status: { type: String, enum: ["draft", "issued", "revoked"], default: "draft", index: true },
    qrCodeUrl: { type: String },
    verificationUrl: { type: String },
  },
  { timestamps: true }
);

CertificateSchema.index({ studentName: "text", title: "text", certificateType: "text", program: "text" });

const Certificate: Model<ICertificate> =
  mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);

export default Certificate;

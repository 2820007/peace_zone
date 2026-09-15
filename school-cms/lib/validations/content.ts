import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  description: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  image: z.string().url("Enter a valid media URL").optional().or(z.literal("")),
  mediaType: z.enum(["image", "video", "youtube"]).optional(),
  youtubeUrl: z.string().optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
});
export type EventInput = z.infer<typeof eventSchema>;

export const noticeSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  content: z.string().min(5, "Content is required"),
  attachmentUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  published: z.boolean().default(false),
});
export type NoticeInput = z.infer<typeof noticeSchema>;

export const galleryItemSchema = z.object({
  title: z.string().min(2, "Title is required"),
  image: z.string().url("Enter a valid media URL").optional().or(z.literal("")),
  mediaType: z.enum(["image", "video", "youtube"]).optional(),
  youtubeUrl: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});
export type GalleryItemInput = z.infer<typeof galleryItemSchema>;

export const bannerSchema = z.object({
  title: z.string().min(2, "Heading is required"),
  subtitle: z.string().max(240, "Text must be 240 characters or fewer").optional().or(z.literal("")),
  image: z.string().url("Upload a valid banner image").optional().or(z.literal("")),
  buttonLabel: z.string().max(40).optional().or(z.literal("")),
  buttonHref: z.string().max(200).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(false),
});
export type BannerInput = z.infer<typeof bannerSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Please include a short message (10+ characters)"),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  designation: z.string().min(2, "Designation is required"),
  qualification: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  image: z
    .string()
    .url("Enter a valid image URL")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  linkedin: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});

export type TeacherInput = z.infer<typeof teacherSchema>;

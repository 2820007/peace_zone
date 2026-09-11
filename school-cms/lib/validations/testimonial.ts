import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Message must be at least 5 characters"),
  image: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1, "Minimum rating is 1").max(5, "Maximum rating is 5"),
  displayOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

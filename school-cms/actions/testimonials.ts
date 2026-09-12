"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";
import { testimonialSchema } from "@/lib/validations/testimonial";
import { getSession } from "@/lib/auth/session";
import { imageValueFromForm } from "@/lib/cloudinary";
import type { FormActionState } from "@/actions/teachers";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

async function parseForm(formData: FormData) {
  return testimonialSchema.safeParse({
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    message: String(formData.get("message") || ""),
    image: await imageValueFromForm(formData),
    rating: formData.get("rating") || 5,
    displayOrder: formData.get("displayOrder") || 0,
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
}

export async function createTestimonialAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  let parsed;
  try {
    parsed = await parseForm(formData);
  } catch (error) {
    return { fieldErrors: { image: error instanceof Error ? error.message : "Image upload failed." } };
  }
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }

  await connectToDatabase();
  try {
    await Testimonial.create(parsed.data);
  } catch (err) {
    console.error("createTestimonialAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  return { success: true };
}

export async function updateTestimonialAction(
  id: string,
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  let parsed;
  try {
    parsed = await parseForm(formData);
  } catch (error) {
    return { fieldErrors: { image: error instanceof Error ? error.message : "Image upload failed." } };
  }
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }

  await connectToDatabase();
  try {
    await Testimonial.findByIdAndUpdate(id, parsed.data);
  } catch (err) {
    console.error("updateTestimonialAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  return { success: true };
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
}

export async function toggleTestimonialPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await Testimonial.findByIdAndUpdate(id, { published });
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
}

"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connect";
import Event from "@/models/Event";
import { eventSchema } from "@/lib/validations/content";
import { getSession } from "@/lib/auth/session";
import { imageValueFromForm } from "@/lib/cloudinary";
import type { FormActionState } from "@/actions/teachers";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

async function parseForm(formData: FormData) {
  return eventSchema.safeParse({
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    description: String(formData.get("description") || ""),
    location: String(formData.get("location") || ""),
    image: await imageValueFromForm(formData),
    startDate: String(formData.get("startDate") || ""),
    endDate: String(formData.get("endDate") || ""),
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
}

export async function createEventAction(
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
  const existing = await Event.findOne({ slug: parsed.data.slug });
  if (existing) return { fieldErrors: { slug: "This slug is already in use." } };

  try {
    await Event.create({
      ...parsed.data,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    });
  } catch (err) {
    console.error("createEventAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }
  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { success: true };
}

export async function updateEventAction(
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
  const existing = await Event.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
  if (existing) return { fieldErrors: { slug: "This slug is already in use." } };

  try {
    await Event.findByIdAndUpdate(id, {
      ...parsed.data,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    });
  } catch (err) {
    console.error("updateEventAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }
  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { success: true };
}

export async function deleteEventAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Event.findByIdAndDelete(id);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function toggleEventPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await Event.findByIdAndUpdate(id, { published });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

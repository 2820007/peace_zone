"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connect";
import GalleryItem from "@/models/GalleryItem";
import { galleryItemSchema } from "@/lib/validations/content";
import { getSession } from "@/lib/auth/session";
import { imageValueFromForm } from "@/lib/cloudinary";
import type { FormActionState } from "@/actions/teachers";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

async function parseForm(formData: FormData) {
  return galleryItemSchema.safeParse({
    title: String(formData.get("title") || ""),
    image: await imageValueFromForm(formData),
    category: String(formData.get("category") || ""),
    displayOrder: formData.get("displayOrder") || 0,
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
}

export async function createGalleryItemAction(
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
  if (!parsed.data.image) {
    return { fieldErrors: { image: "Please choose an image to upload." } };
  }
  await connectToDatabase();
  try {
    await GalleryItem.create(parsed.data);
  } catch (err) {
    console.error("createGalleryItemAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

export async function deleteGalleryItemAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await GalleryItem.findByIdAndDelete(id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleGalleryItemPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await GalleryItem.findByIdAndUpdate(id, { published });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

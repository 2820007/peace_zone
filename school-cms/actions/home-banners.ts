"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connect";
import HomeBanner from "@/models/HomeBanner";
import { homeBannerSchema } from "@/lib/validations/content";
import { getSession } from "@/lib/auth/session";
import { imageValueFromForm } from "@/lib/cloudinary";
import type { FormActionState } from "@/actions/teachers";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

export async function createHomeBannerAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  let image: string;
  try {
    image = await imageValueFromForm(formData);
  } catch (error) {
    return { fieldErrors: { image: error instanceof Error ? error.message : "Image upload failed." } };
  }

  const parsed = homeBannerSchema.safeParse({
    title: String(formData.get("title") || ""),
    image,
    displayOrder: formData.get("displayOrder") || 0,
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }

  await connectToDatabase();
  await HomeBanner.create(parsed.data);
  revalidatePath("/");
  revalidatePath("/admin/banners");
  return { success: true };
}

export async function deleteHomeBannerAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await HomeBanner.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

export async function toggleHomeBannerPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await HomeBanner.findByIdAndUpdate(id, { published });
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

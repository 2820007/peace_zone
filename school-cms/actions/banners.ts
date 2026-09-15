"use server";

import type { FormActionState } from "@/actions/teachers";
import { getSession } from "@/lib/auth/session";
import { imageValueFromForm } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db/connect";
import { bannerSchema } from "@/lib/validations/content";
import Banner from "@/models/Banner";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

async function parseBanner(formData: FormData) {
  const image = await imageValueFromForm(formData);
  return bannerSchema.safeParse({
    title: String(formData.get("title") || ""),
    subtitle: String(formData.get("subtitle") || ""),
    image,
    buttonLabel: String(formData.get("buttonLabel") || ""),
    buttonHref: String(formData.get("buttonHref") || ""),
    displayOrder: formData.get("displayOrder") || 0,
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
}

export async function createBannerAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  let parsed;
  try {
    parsed = await parseBanner(formData);
  } catch (error) {
    return { fieldErrors: { image: error instanceof Error ? error.message : "Image upload failed." } };
  }
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }
  if (!parsed.data.image) return { fieldErrors: { image: "Please upload a banner image." } };

  await connectToDatabase();
  try {
    await Banner.create(parsed.data);
  } catch (error) {
    console.error("createBannerAction failed:", error);
    return { error: "Something went wrong while saving the banner." };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBannerAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Banner.findByIdAndDelete(id);
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function toggleBannerPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await Banner.findByIdAndUpdate(id, { published });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

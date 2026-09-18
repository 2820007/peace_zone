"use server";

import type { FormActionState } from "@/actions/teachers";
import { getSession } from "@/lib/auth/session";
import { imageValueFromForm } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db/connect";
import { bannerSchema, normalizeBannerInput } from "@/lib/validations/content";
import Banner from "@/models/Banner";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

async function parseBannerForm(formData: FormData) {
  const image = await imageValueFromForm(formData);
  return bannerSchema.safeParse(
    normalizeBannerInput({
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      image,
      buttonLabel: formData.get("buttonLabel"),
      buttonHref: formData.get("buttonHref"),
      displayOrder: formData.get("displayOrder") ?? 0,
      published: formData.get("published"),
    })
  );
}

function mapZodErrors(error: { issues: Array<{ path: (string | number)[]; message: string }> }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const [firstKey] = issue.path;
    if (typeof firstKey === "string") {
      fieldErrors[firstKey] = issue.message;
    }
  }
  return fieldErrors;
}

export async function getBannerById(id: string) {
  await requireAdmin();
  await connectToDatabase();
  const banner = await Banner.findById(id).lean();
  return banner ? JSON.parse(JSON.stringify(banner)) : null;
}

export async function createBannerAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();

  let parsed;
  try {
    parsed = await parseBannerForm(formData);
  } catch (error) {
    return { fieldErrors: { image: error instanceof Error ? error.message : "Image upload failed." } };
  }

  if (!parsed.success) {
    return { fieldErrors: mapZodErrors(parsed.error) };
  }

  if (!parsed.data.image) {
    return { fieldErrors: { image: "Please upload a banner image." } };
  }

  await connectToDatabase();
  try {
    await Banner.create(parsed.data);
  } catch (error) {
    console.error("createBannerAction failed:", error);
    return { error: "Something went wrong while saving the banner." };
  }

  await revalidatePath("/admin/banners");
  await revalidatePath("/");
  return { success: true };
}

export async function updateBannerAction(id: string, formData: FormData): Promise<FormActionState> {
  await requireAdmin();

  let parsed;
  try {
    parsed = await parseBannerForm(formData);
  } catch (error) {
    return { fieldErrors: { image: error instanceof Error ? error.message : "Image upload failed." } };
  }

  if (!parsed.success) {
    return { fieldErrors: mapZodErrors(parsed.error) };
  }

  if (!parsed.data.image) {
    return { fieldErrors: { image: "Please upload a banner image." } };
  }

  await connectToDatabase();

  try {
    await Banner.findByIdAndUpdate(id, parsed.data, { new: true });
  } catch (error) {
    console.error("updateBannerAction failed:", error);
    return { error: "Something went wrong while updating the banner." };
  }

  await revalidatePath("/admin/banners");
  await revalidatePath("/");
  return { success: true };
}

export async function deleteBannerAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Banner.findByIdAndDelete(id);
  await revalidatePath("/admin/banners");
  await revalidatePath("/");
}

export async function toggleBannerPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await Banner.findByIdAndUpdate(id, { published }, { new: true });
  await revalidatePath("/admin/banners");
  await revalidatePath("/");
}

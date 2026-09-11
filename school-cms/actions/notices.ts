"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connect";
import Notice from "@/models/Notice";
import { noticeSchema } from "@/lib/validations/content";
import { getSession } from "@/lib/auth/session";
import type { FormActionState } from "@/actions/teachers";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

function parseForm(formData: FormData) {
  return noticeSchema.safeParse({
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    content: String(formData.get("content") || ""),
    attachmentUrl: String(formData.get("attachmentUrl") || ""),
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
}

export async function createNoticeAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }
  await connectToDatabase();
  const existing = await Notice.findOne({ slug: parsed.data.slug });
  if (existing) return { fieldErrors: { slug: "This slug is already in use." } };

  try {
    await Notice.create(parsed.data);
  } catch (err) {
    console.error("createNoticeAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
  return { success: true };
}

export async function updateNoticeAction(
  id: string,
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }
  await connectToDatabase();
  const existing = await Notice.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
  if (existing) return { fieldErrors: { slug: "This slug is already in use." } };

  try {
    await Notice.findByIdAndUpdate(id, parsed.data);
  } catch (err) {
    console.error("updateNoticeAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
  return { success: true };
}

export async function deleteNoticeAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Notice.findByIdAndDelete(id);
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
}

export async function toggleNoticePublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await Notice.findByIdAndUpdate(id, { published });
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
}

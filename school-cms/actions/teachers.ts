"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/connect";
import Teacher from "@/models/Teacher";
import { teacherSchema } from "@/lib/validations/teacher";
import { getSession } from "@/lib/auth/session";

export interface FormActionState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session;
}

function parseTeacherForm(formData: FormData) {
  return teacherSchema.safeParse({
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    designation: String(formData.get("designation") || ""),
    qualification: String(formData.get("qualification") || ""),
    department: String(formData.get("department") || ""),
    bio: String(formData.get("bio") || ""),
    image: String(formData.get("image") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    linkedin: String(formData.get("linkedin") || ""),
    twitter: String(formData.get("twitter") || ""),
    website: String(formData.get("website") || ""),
    displayOrder: formData.get("displayOrder") || 0,
    published: formData.get("published") === "on" || formData.get("published") === "true",
  });
}

export async function createTeacherAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  const parsed = parseTeacherForm(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }

  await connectToDatabase();

  const existing = await Teacher.findOne({ slug: parsed.data.slug });
  if (existing) {
    return { fieldErrors: { slug: "This slug is already in use." } };
  }

  const { linkedin, twitter, website, ...rest } = parsed.data;

  try {
    await Teacher.create({
      ...rest,
      socialLinks: { linkedin, twitter, website },
    });
  } catch (err) {
    console.error("createTeacherAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

  revalidatePath("/admin/teachers");
  revalidatePath("/teachers");
  return { success: true };
}

export async function updateTeacherAction(
  id: string,
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  await requireAdmin();
  const parsed = parseTeacherForm(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }

  await connectToDatabase();

  const existing = await Teacher.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
  if (existing) {
    return { fieldErrors: { slug: "This slug is already in use." } };
  }

  const { linkedin, twitter, website, ...rest } = parsed.data;

  try {
    await Teacher.findByIdAndUpdate(id, {
      ...rest,
      socialLinks: { linkedin, twitter, website },
    });
  } catch (err) {
    console.error("updateTeacherAction failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

  revalidatePath("/admin/teachers");
  revalidatePath("/teachers");
  revalidatePath(`/teachers/${parsed.data.slug}`);
  return { success: true };
}

export async function deleteTeacherAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Teacher.findByIdAndDelete(id);
  revalidatePath("/admin/teachers");
  revalidatePath("/teachers");
}

export async function toggleTeacherPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await Teacher.findByIdAndUpdate(id, { published });
  revalidatePath("/admin/teachers");
  revalidatePath("/teachers");
}

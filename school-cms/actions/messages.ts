"use server";

import type { FormActionState } from "@/actions/teachers";
import { getSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/connect";
import { sendContactNotification } from "@/lib/email";
import { contactMessageSchema } from "@/lib/validations/content";
import ContactMessage from "@/models/ContactMessage";
import { revalidatePath } from "next/cache";
import { actionError, logServerError } from "@/lib/errors";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

/** Public action — anyone can submit the contact form. */
export async function submitContactMessageAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const parsed = contactMessageSchema.safeParse({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
    return { fieldErrors };
  }

  try {
    await connectToDatabase();
    await ContactMessage.create(parsed.data);
  } catch (err) {
    return actionError("submitContactMessageAction", err, "We couldn't send your message. Please try again shortly.");
  }

  try {
    await sendContactNotification(parsed.data);
  } catch (err) {
    logServerError("contact email notification failed", err);
    return {
      error: "Your message was saved, but we couldn't notify the office by email. Please try again later.",
    };
  }

  revalidatePath("/admin/messages");
  return { success: true };
}

export async function markMessageReadAction(id: string, read: boolean) {
  await requireAdmin();
  await connectToDatabase();
  await ContactMessage.findByIdAndUpdate(id, { read });
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await ContactMessage.findByIdAndDelete(id);
  revalidatePath("/admin/messages");
}

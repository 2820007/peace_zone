"use server";

import { getSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/connect";
import { sendStaffNotification } from "@/lib/email";
import Teacher from "@/models/Teacher";

export interface NotificationActionState {
  success?: boolean;
  error?: string;
  recipientCount?: number;
}

export async function sendStaffNotificationAction(
  _prevState: NotificationActionState,
  formData: FormData
): Promise<NotificationActionState> {
  const session = await getSession();
  if (!session) return { error: "Not authenticated." };

  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  if (!subject || !message) return { error: "Subject and message are required." };

  await connectToDatabase();
  const teachers = await Teacher.find({ email: { $exists: true, $nin: [""] } })
    .select("email")
    .lean();
  const recipients = [...new Set(teachers.map((teacher) => teacher.email?.trim()).filter(Boolean))] as string[];

  if (recipients.length === 0) {
    return { error: "No teacher or staff records have an email address." };
  }

  try {
    await sendStaffNotification({ subject, message, recipients });
    return { success: true, recipientCount: recipients.length };
  } catch (error) {
    console.error("sendStaffNotificationAction failed:", error);
    return { error: error instanceof Error ? error.message : "Unable to send notification." };
  }
}
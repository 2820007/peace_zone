"use server";

import { getSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/connect";
import { normalizeRecipientList, resolveResendSender, sendStaffNotification } from "@/lib/email";
import Teacher from "@/models/Teacher";
import { actionError } from "@/lib/errors";

export interface NotificationActionState {
  success?: boolean;
  error?: string;
  recipientCount?: number;
  mode?: "broadcast" | "test";
}

export async function sendStaffNotificationAction(
  _prevState: NotificationActionState,
  formData: FormData
): Promise<NotificationActionState> {
  const session = await getSession();
  if (!session) return { error: "Not authenticated." };

  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const mode = String(formData.get("mode") || "broadcast");
  if (!subject || !message) return { error: "Subject and message are required." };

  try {
    resolveResendSender();

    if (mode === "test") {
      const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@gmail.com";
      await sendStaffNotification({
        subject,
        message: `${message}\n\n---\nThis is a test email from the admin dashboard.`,
        recipients: [adminEmail],
      });
      return { success: true, mode: "test" };
    }

    await connectToDatabase();
    const teachers = await Teacher.find({ email: { $exists: true, $nin: [""] } })
      .select("email")
      .lean();
    const recipients = normalizeRecipientList(teachers.map((teacher) => teacher.email));

    if (recipients.length === 0) {
      return { error: "No teacher records have an email address." };
    }

    await sendStaffNotification({ subject, message, recipients });
    return { success: true, recipientCount: recipients.length, mode: "broadcast" };
  } catch (error) {
    return actionError("sendStaffNotificationAction", error, "Unable to send the notification. Please try again shortly.");
  }
}

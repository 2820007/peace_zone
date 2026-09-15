interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface StaffNotificationData {
  subject: string;
  message: string;
  recipients: string[];
}

export function normalizeRecipientList(recipients: Array<string | null | undefined>) {
  return [...new Set(
    recipients
      .map((recipient) => recipient?.trim())
      .filter((recipient): recipient is string => Boolean(recipient && recipient.length > 0))
  )];
}

export function resolveResendSender() {
  const sender =
    process.env.RESEND_FROM_EMAIL ||
    process.env.CONTACT_EMAIL_FROM ||
    process.env.RESEND_EMAIL_FROM;

  if (!sender) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL (or CONTACT_EMAIL_FROM)."
    );
  }

  const normalizedSender = sender.replace(/^.*?<([^>]+)>$/, "$1").trim();

  if (!normalizedSender.includes("@")) {
    throw new Error(
      "RESEND_FROM_EMAIL is invalid. Use a full email address such as no-reply@yourdomain.com."
    );
  }

  if (/@gmail\.com$/i.test(normalizedSender) || /@googlemail\.com$/i.test(normalizedSender)) {
    throw new Error(
      "Resend requires a verified custom domain. Update RESEND_FROM_EMAIL to an address from your verified domain, for example: no-reply@your-school.com"
    );
  }

  return normalizedSender;
}

async function sendResendEmail(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Email is not configured. Set RESEND_API_KEY.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof result === "object" && result && "message" in result && typeof result.message === "string"
        ? result.message
        : `Resend returned ${response.status}`;

    throw new Error(message);
  }

  return result;
}

export async function sendContactNotification(data: ContactEmailData) {
  const recipient = process.env.CONTACT_EMAIL_TO;
  if (!recipient) {
    throw new Error("Email is not configured. Set CONTACT_EMAIL_TO.");
  }

  await sendResendEmail({
    from: resolveResendSender(),
    to: [recipient],
    reply_to: data.email,
    subject: data.subject || `New contact message from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Subject: ${data.subject || "Not provided"}`,
      "",
      data.message,
    ].join("\n"),
  });
}

export async function sendStaffNotification(data: StaffNotificationData) {
  await sendResendEmail({
    from: resolveResendSender(),
    to: normalizeRecipientList(data.recipients),
    subject: data.subject,
    text: data.message,
  });
}
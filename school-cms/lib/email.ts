import "server-only";

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

export async function sendContactNotification(data: ContactEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL_TO;
  const sender = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !recipient || !sender) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY, CONTACT_EMAIL_TO, and CONTACT_EMAIL_FROM."
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
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
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend returned ${response.status}: ${details}`);
  }
}

export async function sendStaffNotification(data: StaffNotificationData) {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !sender) {
    throw new Error("Email is not configured. Set RESEND_API_KEY and CONTACT_EMAIL_FROM.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: data.recipients,
      subject: data.subject,
      text: data.message,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend returned ${response.status}: ${details}`);
  }
}
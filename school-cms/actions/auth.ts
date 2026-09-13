"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connect";
import Admin from "@/models/Admin";
import { verifyPassword } from "@/lib/auth/password";
import { hashPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validations/auth";

export interface LoginActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const raw = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { fieldErrors };
  }

  await connectToDatabase();

  const admin = await Admin.findOne({ email: parsed.data.email.toLowerCase() }).select(
    "+passwordHash"
  );

  // Generic error message on purpose — never reveal whether the email exists.
  if (!admin) {
    return { error: "Invalid email or password." };
  }

  const passwordMatches = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!passwordMatches) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionToken({
    adminId: admin._id.toString(),
    email: admin.email,
    name: admin.name,
  });

  await setSessionCookie(token);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export interface ChangePasswordState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be signed in to do this." };
  }

  // validation form
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  const fieldErrors: Record<string, string> = {};
  if (!currentPassword) fieldErrors.currentPassword = "Current password is required.";
  if (newPassword.length < 8) fieldErrors.newPassword = "New password must be at least 8 characters.";
  if (newPassword !== confirmPassword) fieldErrors.confirmPassword = "Passwords do not match.";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  await connectToDatabase();
  const admin = await Admin.findById(session.adminId).select("+passwordHash");
  if (!admin) return { error: "Account not found." };

  const matches = await verifyPassword(currentPassword, admin.passwordHash);
  if (!matches) {
    return { fieldErrors: { currentPassword: "Current password is incorrect." } };
  }

  admin.passwordHash = await hashPassword(newPassword);
  await admin.save();

  return { success: true };
}


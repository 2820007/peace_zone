import { redirect } from "next/navigation";
import { SettingsView } from "@/components/admin/settings-view";
import { getSession } from "@/lib/auth/session";

export const metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <SettingsView adminEmail={session.email} />;
}

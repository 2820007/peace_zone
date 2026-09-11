import { redirect } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";
import { getSession } from "@/lib/auth/session";
import { SITE_CONFIG } from "@/config/site";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="items-center text-center">
          <GraduationCap className="h-8 w-8 text-primary" />
          <CardTitle className="mt-2">{SITE_CONFIG.shortName} CMS</CardTitle>
          <CardDescription>Sign in to manage your school website</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

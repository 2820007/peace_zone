"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { changePasswordAction, type ChangePasswordState } from "@/actions/auth";
import { SITE_CONFIG } from "@/config/site";

const initialState: ChangePasswordState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update Password"}
    </Button>
  );
}

export function SettingsView({ adminEmail }: { adminEmail: string }) {
  const [state, formAction] = useFormState(changePasswordAction, initialState);

  useEffect(() => {
    if (state.success) toast.success("Password updated successfully.");
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your admin account and site configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
          <CardDescription>Signed in as {adminEmail}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" name="currentPassword" type="password" required />
              {state.fieldErrors?.currentPassword && (
                <p className="text-sm text-destructive">{state.fieldErrors.currentPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" name="newPassword" type="password" required minLength={8} />
              {state.fieldErrors?.newPassword && (
                <p className="text-sm text-destructive">{state.fieldErrors.newPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
              {state.fieldErrors?.confirmPassword && (
                <p className="text-sm text-destructive">{state.fieldErrors.confirmPassword}</p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Site Configuration</CardTitle>
          <CardDescription>
            These details are set in <code className="rounded bg-secondary px-1 py-0.5">config/site.ts</code>{" "}
            in the codebase. Update that file and redeploy to change them.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground">School Name</p>
            <p className="font-medium">{SITE_CONFIG.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Contact Email</p>
            <p className="font-medium">{SITE_CONFIG.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">{SITE_CONFIG.phone}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium">{SITE_CONFIG.address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

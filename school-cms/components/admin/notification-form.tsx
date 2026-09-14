"use client";

import { sendStaffNotificationAction, type NotificationActionState } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Loader2, Send } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: NotificationActionState = {};

export function NotificationForm({ recipientCount }: { recipientCount: number }) {
  const [state, formAction, pending] = useActionState(sendStaffNotificationAction, initialState);

  useEffect(() => {
    if (state.success) toast.success(`Notification sent to ${state.recipientCount} recipients.`);
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader><CardTitle>Send a staff notification</CardTitle></CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" placeholder="Important school update" required /></div>
            <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" placeholder="Write your update here..." required /></div>
            <Button type="submit" disabled={pending || recipientCount === 0}>{pending ? <Loader2 className="animate-spin" /> : <Send />}{pending ? "Sending..." : "Send to all staff"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="h-fit bg-emerald-50/60">
        <CardContent className="space-y-4 p-6">
          <Bell className="h-6 w-6 text-emerald-700" />
          <div><p className="text-3xl font-semibold text-emerald-900">{recipientCount}</p><p className="mt-1 text-sm text-emerald-800">teacher and staff recipients with an email address</p></div>
          <p className="text-xs leading-relaxed text-emerald-800/80">Recipients are collected from all teacher records and deduplicated before sending.</p>
        </CardContent>
      </Card>
    </div>
  );
}
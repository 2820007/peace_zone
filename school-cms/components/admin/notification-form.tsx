"use client";

import { sendStaffNotificationAction, type NotificationActionState } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Loader2, MailCheck, Send } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const initialState: NotificationActionState = {};

export function NotificationForm({ recipientCount }: { recipientCount: number }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await sendStaffNotificationAction(initialState, formData);

      if (result.success && result.mode === "broadcast") {
        toast.success(`Notification sent to ${result.recipientCount} recipients.`);
      }
      if (result.success && result.mode === "test") {
        toast.success("Test email sent successfully.");
      }
      if (result.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader><CardTitle>Send a teacher notification</CardTitle></CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" placeholder="Important school update" required /></div>
            <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" placeholder="Write your update here..." required /></div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" name="mode" value="broadcast" disabled={isPending || recipientCount === 0}>
                {isPending ? <Loader2 className="animate-spin" /> : <Send />}
                {isPending ? "Sending..." : "Send to all teachers"}
              </Button>

              <Button type="submit" variant="outline" name="mode" value="test" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : <MailCheck />}
                {isPending ? "Sending Test..." : "Send test email"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="h-fit bg-emerald-50/60">
        <CardContent className="space-y-4 p-6">
          <Bell className="h-6 w-6 text-emerald-700" />
          <div><p className="text-3xl font-semibold text-emerald-900">{recipientCount}</p><p className="mt-1 text-sm text-emerald-800">teacher recipients with an email address</p></div>
          <p className="text-xs leading-relaxed text-emerald-800/80">Recipients are collected from all teacher records and deduplicated before sending.</p>
        </CardContent>
      </Card>
    </div>
  );
}
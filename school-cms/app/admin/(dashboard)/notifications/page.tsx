import { NotificationForm } from "@/components/admin/notification-form";
import { connectToDatabase } from "@/lib/db/connect";
import Teacher from "@/models/Teacher";

export const metadata = { title: "Notifications" };

export default async function AdminNotificationsPage() {
  await connectToDatabase();
  const teachers = await Teacher.find({ email: { $exists: true, $nin: [""] } }).select("email").lean();
  const recipientCount = new Set(teachers.map((teacher) => teacher.email?.trim()).filter(Boolean)).size;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Teacher communication</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Send one email update to every teacher record with a valid email address.
        </p>
      </div>
      <NotificationForm recipientCount={recipientCount} />
    </div>
  );
}
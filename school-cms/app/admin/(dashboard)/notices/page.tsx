import { NoticesManager } from "@/components/admin/notices-manager";
import { getAllNotices } from "@/lib/queries";

export const metadata = { title: "Notices" };

export default async function AdminNoticesPage() {
  const notices = await getAllNotices();
  return <NoticesManager notices={notices as any} />;
}

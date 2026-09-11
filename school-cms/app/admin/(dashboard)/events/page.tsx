import { EventsManager } from "@/components/admin/events-manager";
import { getAllEvents } from "@/lib/queries";

export const metadata = { title: "Events" };

export default async function AdminEventsPage() {
  const events = await getAllEvents();
  return <EventsManager events={events as any} />;
}

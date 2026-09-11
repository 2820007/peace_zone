import { MessagesInbox } from "@/components/admin/messages-inbox";
import { getAllMessages } from "@/lib/queries";

export const metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();
  return <MessagesInbox messages={messages as any} />;
}

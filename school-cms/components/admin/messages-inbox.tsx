"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Mail, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { EmptyState } from "@/components/admin/empty-state";
import { formatDate } from "@/lib/utils";
import { markMessageReadAction, deleteMessageAction } from "@/actions/messages";

interface MessageRow {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesInbox({ messages }: { messages: MessageRow[] }) {
  const [selected, setSelected] = useState<MessageRow | null>(null);
  const [, startTransition] = useTransition();

  function openMessage(message: MessageRow) {
    setSelected(message);
    if (!message.read) {
      startTransition(async () => {
        try {
          await markMessageReadAction(message._id, true);
        } catch {
          toast.error("Couldn't mark as read.");
        }
      });
    }
  }

  if (messages.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Messages</h1>
          <p className="text-sm text-muted-foreground">Contact form submissions from your website.</p>
        </div>
        <EmptyState title="No messages yet" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-sm text-muted-foreground">Contact form submissions from your website.</p>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((m) => (
              <TableRow
                key={m._id}
                className={!m.read ? "cursor-pointer bg-primary/5 font-medium" : "cursor-pointer"}
                onClick={() => openMessage(m)}
              >
                <TableCell>
                  {m.read ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" />
                  )}
                </TableCell>
                <TableCell>
                  <div>{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.email}</div>
                </TableCell>
                <TableCell className="max-w-[240px] truncate">{m.subject || "—"}</TableCell>
                <TableCell>{formatDate(m.createdAt)}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DeleteConfirm itemLabel="message" onDelete={() => deleteMessageAction(m._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.subject || "Message"}</DialogTitle>
                <DialogDescription>
                  From {selected.name} ({selected.email}) · {formatDate(selected.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                {selected.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {selected.phone}
                  </p>
                )}
                <p className="whitespace-pre-line">{selected.message}</p>
              </div>
              <div className="flex justify-end">
                <Button asChild size="sm">
                  <a href={`mailto:${selected.email}`}>Reply by Email</a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

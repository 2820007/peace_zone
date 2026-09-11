"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PublishToggleProps {
  id: string;
  published: boolean;
  itemLabel: string;
  onToggle: (id: string, published: boolean) => Promise<void>;
}

export function PublishToggle({ id, published, itemLabel, onToggle }: PublishToggleProps) {
  const [pending, setPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isTransitionPending, startTransition] = useTransition();

  function handleConfirm() {
    setConfirmOpen(false);
    setPending(true);
    startTransition(async () => {
      try {
        await onToggle(id, !published);
        toast.success(!published ? `${itemLabel} published.` : `${itemLabel} unpublished.`);
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setPending(false);
      }
    });
  }

  const busy = pending || isTransitionPending;

  return (
    <>
      <div className="flex items-center gap-2">
        <Switch
          checked={published}
          disabled={busy}
          onCheckedChange={() => setConfirmOpen(true)}
          aria-label={published ? `Unpublish ${itemLabel}` : `Publish ${itemLabel}`}
        />
        <Badge variant={published ? "success" : "outline"}>
          {published ? "Published" : "Draft"}
        </Badge>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{published ? "Unpublish" : "Publish"} {itemLabel}?</AlertDialogTitle>
            <AlertDialogDescription>
              {published
                ? "This will immediately remove it from the public website."
                : "This will make it visible on the public website right away."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {published ? "Unpublish" : "Publish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

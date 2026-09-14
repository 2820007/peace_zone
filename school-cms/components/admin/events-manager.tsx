"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { EmptyState } from "@/components/admin/empty-state";
import { eventSchema, type EventInput } from "@/lib/validations/content";
import { slugify, formatDate } from "@/lib/utils";
import {
  createEventAction,
  updateEventAction,
  deleteEventAction,
  toggleEventPublishedAction,
} from "@/actions/events";

interface EventRow {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  location?: string;
  image?: string;
  mediaType?: "image" | "video" | "youtube";
  startDate: string;
  endDate?: string;
  published: boolean;
}

function EventDialog({
  event,
  open,
  onOpenChange,
}: {
  event?: EventRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [slugTouched, setSlugTouched] = useState(Boolean(event));
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          title: event.title,
          slug: event.slug,
          description: event.description || "",
          location: event.location || "",
          image: event.image || "",
          mediaType: event.mediaType || "image",
          youtubeUrl: event.mediaType === "youtube" ? event.image : "",
          startDate: event.startDate?.slice(0, 10),
          endDate: event.endDate?.slice(0, 10) || "",
          published: event.published,
        }
      : { published: true },
  });

  async function onSubmit(values: EventInput) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.set(key, value === undefined || value === null ? "" : String(value))
    );
    formData.set("media", imageFile || values.image || "");
    const result = event
      ? await updateEventAction(event._id, {}, formData)
      : await createEventAction({}, formData);

    if (result.error) return toast.error(result.error);
    if (result.fieldErrors) return toast.error(Object.values(result.fieldErrors)[0]);

    toast.success(`Event ${event ? "updated" : "created"}.`);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              onChange={(e) => {
                register("title").onChange(e);
                if (!slugTouched) setValue("slug", slugify(e.target.value));
              }}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              onChange={(e) => {
                setSlugTouched(true);
                register("slug").onChange(e);
              }}
            />
            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (optional)</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="media">Image</Label>
            <Input id="media" type="file" accept="image/*" onChange={(event) => { setImageFile(event.target.files?.[0] || null); if (event.target.files?.[0]) setValue("youtubeUrl", ""); }} />
            <p className="text-xs text-muted-foreground">{event?.image ? "Leave blank to keep the current media." : "PNG, JPEG, WebP, or GIF; maximum 5 MB."}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">YouTube video link</Label>
            <Input id="youtubeUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." {...register("youtubeUrl", { onChange: () => setImageFile(null) })} />
            <p className="text-xs text-muted-foreground">Paste a YouTube video or Shorts link to play it on your website.</p>
            {errors.youtubeUrl && <p className="text-sm text-destructive">{errors.youtubeUrl.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} {...register("description")} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : event ? "Save Changes" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EventsManager({ events }: { events: EventRow[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<EventRow | undefined>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Events</h1>
          <p className="text-sm text-muted-foreground">Manage events shown on the public site.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState title="No events found" />
      ) : (
        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{formatDate(event.startDate)}</TableCell>
                  <TableCell>{event.location || "—"}</TableCell>
                  <TableCell>
                    <PublishToggle
                      id={event._id}
                      published={event.published}
                      itemLabel={event.title}
                      onToggle={toggleEventPublishedAction}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditing(event)} aria-label="Edit event">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DeleteConfirm itemLabel="event" onDelete={() => deleteEventAction(event._id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <EventDialog open={createOpen} onOpenChange={setCreateOpen} />
      {editing && (
        <EventDialog event={editing} open={Boolean(editing)} onOpenChange={(o) => !o && setEditing(undefined)} />
      )}
    </div>
  );
}

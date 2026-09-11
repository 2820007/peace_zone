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
import { noticeSchema, type NoticeInput } from "@/lib/validations/content";
import { slugify, formatDate } from "@/lib/utils";
import {
  createNoticeAction,
  updateNoticeAction,
  deleteNoticeAction,
  toggleNoticePublishedAction,
} from "@/actions/notices";

interface NoticeRow {
  _id: string;
  title: string;
  slug: string;
  content: string;
  attachmentUrl?: string;
  published: boolean;
  createdAt: string;
}

function NoticeDialog({
  notice,
  open,
  onOpenChange,
}: {
  notice?: NoticeRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [slugTouched, setSlugTouched] = useState(Boolean(notice));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoticeInput>({
    resolver: zodResolver(noticeSchema),
    defaultValues: notice
      ? {
          title: notice.title,
          slug: notice.slug,
          content: notice.content,
          attachmentUrl: notice.attachmentUrl || "",
          published: notice.published,
        }
      : { published: false },
  });

  async function onSubmit(values: NoticeInput) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.set(key, value === undefined || value === null ? "" : String(value))
    );
    const result = notice
      ? await updateNoticeAction(notice._id, {}, formData)
      : await createNoticeAction({}, formData);

    if (result.error) return toast.error(result.error);
    if (result.fieldErrors) return toast.error(Object.values(result.fieldErrors)[0]);

    toast.success(`Notice ${notice ? "updated" : "created"}.`);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{notice ? "Edit Notice" : "Add Notice"}</DialogTitle>
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
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" rows={5} {...register("content")} />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="attachmentUrl">Attachment URL (optional)</Label>
            <Input id="attachmentUrl" placeholder="https://..." {...register("attachmentUrl")} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : notice ? "Save Changes" : "Create Notice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NoticesManager({ notices }: { notices: NoticeRow[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<NoticeRow | undefined>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notices</h1>
          <p className="text-sm text-muted-foreground">Manage announcements shown on the public site.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Add Notice
        </Button>
      </div>

      {notices.length === 0 ? (
        <EmptyState title="No notices found" />
      ) : (
        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice._id}>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>{formatDate(notice.createdAt)}</TableCell>
                  <TableCell>
                    <PublishToggle
                      id={notice._id}
                      published={notice.published}
                      itemLabel={notice.title}
                      onToggle={toggleNoticePublishedAction}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditing(notice)} aria-label="Edit notice">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DeleteConfirm itemLabel="notice" onDelete={() => deleteNoticeAction(notice._id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <NoticeDialog open={createOpen} onOpenChange={setCreateOpen} />
      {editing && (
        <NoticeDialog notice={editing} open={Boolean(editing)} onOpenChange={(o) => !o && setEditing(undefined)} />
      )}
    </div>
  );
}

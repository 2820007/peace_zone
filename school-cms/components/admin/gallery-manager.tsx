"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { EmptyState } from "@/components/admin/empty-state";
import { galleryItemSchema, type GalleryItemInput } from "@/lib/validations/content";
import {
  createGalleryItemAction,
  deleteGalleryItemAction,
  toggleGalleryItemPublishedAction,
} from "@/actions/gallery";

interface GalleryItemRow {
  _id: string;
  title: string;
  image: string;
  mediaType?: "image" | "video" | "youtube";
  category?: string;
  published: boolean;
}

export function GalleryManager({ items }: { items: GalleryItemRow[] }) {
  const [open, setOpen] = useState(false);
  const [localItems, setLocalItems] = useState(items);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  useEffect(() => setLocalItems(items), [items]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GalleryItemInput>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: { published: true, displayOrder: 0 },
  });

  async function onSubmit(values: GalleryItemInput) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.set(key, value === undefined || value === null ? "" : String(value))
    );
    if (mediaFile) formData.set("media", mediaFile);
    const result = await createGalleryItemAction({}, formData);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (result.fieldErrors) {
      toast.error(Object.values(result.fieldErrors)[0]);
      return;
    }
    toast.success("Media added.");
    reset();
    setMediaFile(null);
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <p className="text-sm text-muted-foreground">Manage images and YouTube videos shown in the public gallery.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> Add Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Media</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="media">Image</Label>
                <Input id="media" type="file" accept="image/*" onChange={(event) => { setMediaFile(event.target.files?.[0] || null); if (event.target.files?.[0]) setValue("youtubeUrl", ""); }} />
                <p className="text-xs text-muted-foreground">PNG, JPEG, WebP, or GIF; maximum 5 MB.</p>
                {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube video link</Label>
                <Input id="youtubeUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." {...register("youtubeUrl", { onChange: () => setMediaFile(null) })} />
                <p className="text-xs text-muted-foreground">Paste a YouTube video or Shorts link to play it on your website.</p>
                {errors.youtubeUrl && <p className="text-sm text-destructive">{errors.youtubeUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category (optional)</Label>
                <Input id="category" placeholder="Sports, Arts, Campus..." {...register("category")} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Media"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {localItems.length === 0 ? (
        <EmptyState title="No gallery media found" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localItems.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-lg border bg-background">
              <div className="relative aspect-square w-full bg-secondary">
                {item.mediaType === "youtube" ? (
                  <iframe src={item.image} title={item.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                ) : item.mediaType === "video" ? (
                  <video src={item.image} className="h-full w-full object-cover" controls preload="metadata" />
                ) : (
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="space-y-3 p-3">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <div className="flex items-center justify-between">
                  <PublishToggle
                    id={item._id}
                    published={item.published}
                    itemLabel={item.title}
                    onToggle={toggleGalleryItemPublishedAction}
                  />
                  <DeleteConfirm itemLabel="media item" onDelete={() => deleteGalleryItemAction(item._id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

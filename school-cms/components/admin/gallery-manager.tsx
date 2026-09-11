"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  category?: string;
  published: boolean;
}

export function GalleryManager({ items }: { items: GalleryItemRow[] }) {
  const [open, setOpen] = useState(false);
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => setLocalItems(items), [items]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GalleryItemInput>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: { published: false, displayOrder: 0 },
  });

  async function onSubmit(values: GalleryItemInput) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.set(key, value === undefined || value === null ? "" : String(value))
    );
    const result = await createGalleryItemAction({}, formData);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (result.fieldErrors) {
      toast.error(Object.values(result.fieldErrors)[0]);
      return;
    }
    toast.success("Photo added.");
    reset();
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <p className="text-sm text-muted-foreground">Manage photos shown in the public gallery.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Photo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="https://..." {...register("image")} />
                {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category (optional)</Label>
                <Input id="category" placeholder="Sports, Arts, Campus..." {...register("category")} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Photo"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {localItems.length === 0 ? (
        <EmptyState title="No gallery photos found" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localItems.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-lg border bg-background">
              <div className="relative aspect-square w-full bg-secondary">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
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
                  <DeleteConfirm itemLabel="photo" onDelete={() => deleteGalleryItemAction(item._id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

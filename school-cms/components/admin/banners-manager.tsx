"use client";

import { createBannerAction, deleteBannerAction, toggleBannerPublishedAction } from "@/actions/banners";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { EmptyState } from "@/components/admin/empty-state";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bannerSchema, type BannerInput } from "@/lib/validations/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BannerRow {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  buttonLabel?: string;
  buttonHref?: string;
  displayOrder: number;
  published: boolean;
}

export function BannersManager({ banners }: { banners: BannerRow[] }) {
  const [open, setOpen] = useState(false);
  const [localBanners, setLocalBanners] = useState(banners);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => setLocalBanners(banners), [banners]);

  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<BannerInput>({
    resolver: zodResolver(bannerSchema),
    defaultValues: { published: true, displayOrder: 0 },
  });

  async function onSubmit(values: BannerInput) {
    if (!imageFile) {
      setError("image", { type: "required", message: "Please upload a banner image." });
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.set(key, value === undefined || value === null ? "" : String(value)));
    if (imageFile) formData.set("image", imageFile);
    const result = await createBannerAction({}, formData);
    if (result.error) return toast.error(result.error);
    if (result.fieldErrors) return toast.error(Object.values(result.fieldErrors)[0]);
    toast.success("Banner added.");
    reset();
    setImageFile(null);
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Homepage Banners</h1>
          <p className="text-sm text-muted-foreground">Add rotating image banners and text for the public homepage.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Banner</Button>
      </div>

      {localBanners.length === 0 ? <EmptyState title="No homepage banners found" /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {localBanners.map((banner) => (
            <div key={banner._id} className="overflow-hidden rounded-lg border bg-background">
              <div className="relative aspect-[16/8] bg-secondary"><img src={banner.image} alt={banner.title} className="h-full w-full object-cover" /></div>
              <div className="space-y-3 p-4">
                <div><p className="font-semibold">{banner.title}</p>{banner.subtitle ? <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{banner.subtitle}</p> : null}</div>
                <div className="flex items-center justify-between">
                  <PublishToggle id={banner._id} published={banner.published} itemLabel={banner.title} onToggle={toggleBannerPublishedAction} />
                  <DeleteConfirm itemLabel="banner" onDelete={() => deleteBannerAction(banner._id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add Homepage Banner</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="title">Heading</Label><Input id="title" placeholder="Learning begins with belonging" {...register("title")} />{errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="subtitle">Text</Label><Textarea id="subtitle" rows={3} placeholder="A short message shown over the banner image." {...register("subtitle")} /></div>
            <div className="space-y-2"><Label htmlFor="image">Banner image</Label><Input id="image" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0] || null; setImageFile(file); if (file) clearErrors("image"); }} /><p className="text-xs text-muted-foreground">Any image format is accepted. Maximum 50 MB.</p>{errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}</div>
            <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="buttonLabel">Button label (optional)</Label><Input id="buttonLabel" placeholder="Explore our school" {...register("buttonLabel")} /></div><div className="space-y-2"><Label htmlFor="buttonHref">Button link (optional)</Label><Input id="buttonHref" placeholder="/about" {...register("buttonHref")} /></div></div>
            <div className="space-y-2"><Label htmlFor="displayOrder">Display order</Label><Input id="displayOrder" type="number" min="0" {...register("displayOrder")} /></div>
            <DialogFooter><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Uploading..." : "Add Banner"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

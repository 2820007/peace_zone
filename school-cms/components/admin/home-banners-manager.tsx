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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { EmptyState } from "@/components/admin/empty-state";
import { homeBannerSchema, type HomeBannerInput } from "@/lib/validations/content";
import { createHomeBannerAction, deleteHomeBannerAction, toggleHomeBannerPublishedAction } from "@/actions/home-banners";

interface HomeBannerRow {
  _id: string;
  title: string;
  image: string;
  published: boolean;
}

export function HomeBannersManager({ banners }: { banners: HomeBannerRow[] }) {
  const [open, setOpen] = useState(false);
  const [localBanners, setLocalBanners] = useState(banners);
  const [imageFile, setImageFile] = useState<File | null>(null);
  useEffect(() => setLocalBanners(banners), [banners]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<HomeBannerInput>({
    resolver: zodResolver(homeBannerSchema),
    defaultValues: { published: true, displayOrder: 0 },
  });

  async function onSubmit(values: HomeBannerInput) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.set(key, value == null ? "" : String(value)));
    if (imageFile) formData.set("image", imageFile);
    const result = await createHomeBannerAction({}, formData);
    if (result.error) return void toast.error(result.error);
    if (result.fieldErrors) return void toast.error(Object.values(result.fieldErrors)[0]);
    toast.success("Banner uploaded.");
    reset();
    setImageFile(null);
    setOpen(false);
  }

  return <div className="space-y-6">
    <div className="flex items-center justify-between gap-4"><div><h1 className="text-2xl font-semibold">Home Banners</h1><p className="text-sm text-muted-foreground">Upload and publish the images used in the homepage hero slideshow.</p></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button><Plus className="h-4 w-4" /> Add Banner</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add Home Banner</DialogTitle></DialogHeader><form onSubmit={handleSubmit(onSubmit)} className="space-y-4"><div className="space-y-2"><Label htmlFor="title">Banner title</Label><Input id="title" placeholder="Campus life" {...register("title")} />{errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}</div><div className="space-y-2"><Label htmlFor="image">Image</Label><Input id="image" type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} /><p className="text-xs text-muted-foreground">PNG, JPEG, WebP, or GIF; maximum 5 MB.</p>{errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}</div><div className="space-y-2"><Label htmlFor="displayOrder">Display order</Label><Input id="displayOrder" type="number" {...register("displayOrder")} /></div><DialogFooter><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Uploading..." : "Upload Banner"}</Button></DialogFooter></form></DialogContent></Dialog></div>
    {localBanners.length === 0 ? <EmptyState title="No home banners found" /> : <div className="grid gap-5 sm:grid-cols-2"><>{localBanners.map((banner) => <div key={banner._id} className="overflow-hidden rounded-lg border bg-background"><div className="relative aspect-video bg-secondary"><Image src={banner.image} alt={banner.title} fill className="object-cover" /></div><div className="space-y-3 p-4"><p className="truncate text-sm font-medium">{banner.title}</p><div className="flex items-center justify-between"><PublishToggle id={banner._id} published={banner.published} itemLabel={banner.title} onToggle={toggleHomeBannerPublishedAction} /><DeleteConfirm itemLabel="banner" onDelete={() => deleteHomeBannerAction(banner._id)} /></div></div></div>)}</></div>}
  </div>;
}

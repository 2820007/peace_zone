import { GalleryManager } from "@/components/admin/gallery-manager";
import { getAllGalleryItems } from "@/lib/queries";

export const metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  const items = await getAllGalleryItems();
  return <GalleryManager items={items as any} />;
}

import { BannersManager } from "@/components/admin/banners-manager";
import { getAllBanners } from "@/lib/queries";

export const metadata = { title: "Banners" };

export default async function AdminBannersPage() {
  const banners = await getAllBanners();
  return <BannersManager banners={banners as any} />;
}

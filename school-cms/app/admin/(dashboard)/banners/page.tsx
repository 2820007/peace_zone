import { BannersManager } from "@/components/admin/banners-manager";
import { getAllBanners } from "@/lib/queries";

export const metadata = { title: "Home Banners" };

export default async function AdminHomeBannersPage() {
  const banners = await getAllBanners();
  return <BannersManager banners={banners as any} />;
}

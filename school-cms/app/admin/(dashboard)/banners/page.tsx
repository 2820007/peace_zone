import { HomeBannersManager } from "@/components/admin/home-banners-manager";
import { getAllHomeBanners } from "@/lib/queries";

export const metadata = { title: "Home Banners" };

export default async function AdminHomeBannersPage() {
  const banners = await getAllHomeBanners();
  return <HomeBannersManager banners={banners as any} />;
}

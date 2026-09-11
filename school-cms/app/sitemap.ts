import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedTeachers } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/teachers",
    "/testimonials",
    "/gallery",
    "/events",
    "/notices",
    "/contact",
  ].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
  }));

  let teacherRoutes: MetadataRoute.Sitemap = [];
  try {
    const teachers = await getPublishedTeachers();
    teacherRoutes = teachers.map((t: any) => ({
      url: `${SITE_CONFIG.url}/teachers/${t.slug}`,
      lastModified: new Date(t.updatedAt),
    }));
  } catch {
    // DB unavailable at build time — fall back to static routes only.
  }

  return [...staticRoutes, ...teacherRoutes];
}

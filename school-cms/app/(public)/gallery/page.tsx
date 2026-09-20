import { GalleryMediaFilter } from "@/components/public/gallery-media-filter";
import { SectionHeading } from "@/components/public/shared";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedGalleryItems } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos and videos from campus life at ${SITE_CONFIG.name}.`,
};

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <section className="container py-16">
      <SectionHeading eyebrow="Gallery" title={<>Life at <span className="text-accent">Our School</span></>} description="A visual look at academics, events, and everyday moments on campus." />

      <GalleryMediaFilter items={items as any} />
    </section>
  );
}

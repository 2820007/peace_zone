import { SectionHeading } from "@/components/public/shared";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedGalleryItems } from "@/lib/queries";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from campus life at ${SITE_CONFIG.name}.`,
};

function isVideoUrl(value: string) {
  return /(?:youtube(?:-nocookie)?\.com|youtu\.be)/i.test(value);
}

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();
  const imageItems = items.filter((item: any) => !isVideoUrl(item.image));

  return (
    <section className="container py-16">
      <SectionHeading eyebrow="Gallery" title="Life at Our School" description="A visual look at academics, events, and everyday moments on campus." />

      {imageItems.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">Gallery photos coming soon.</p>
      ) : (
        <div className="mt-12 columns-2 gap-4 sm:columns-3">
          {imageItems.map((item: any) => (
            <div key={item._id} className="mb-4 break-inside-avoid overflow-hidden rounded-lg">
              <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

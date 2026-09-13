import { PageHero, SectionHeading } from "@/components/public/shared";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import { getPublishedGalleryItems } from "@/lib/queries";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from campus life at ${SITE_CONFIG.name}.`,
};

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <>
      <PageHero eyebrow="A window into school life" title="Moments that make our community" description="Explore the classrooms, celebrations, friendships, and everyday discoveries that bring our campus to life." image={SCHOOL_IMAGES.galleryHero} />
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Campus moments" title="See learning in motion" description="A visual look at academics, events, and the small moments that make school feel like home." />

        {items.length === 0 ? <p className="mt-12 text-center text-muted-foreground">Gallery photos coming soon.</p> : <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">{items.map((item: any) => <div key={item._id} className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-secondary"><div className="relative aspect-[4/3] w-full overflow-hidden"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-12"><p className="font-medium text-white">{item.title}</p>{item.category ? <p className="mt-1 text-xs text-white/70">{item.category}</p> : null}</div></div></div>)}</div>}
      </section>
    </>
  );
}

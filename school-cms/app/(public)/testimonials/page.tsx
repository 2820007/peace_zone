import { PageHero, SectionHeading, TestimonialCard } from "@/components/public/shared";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import { getPublishedTestimonials } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Hear what families and students say about ${SITE_CONFIG.name}.`,
};

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <PageHero eyebrow="A community that stays connected" title="What our families say" description="Real stories from the families and students who make our school a place of belonging, growth, and possibility." image={SCHOOL_IMAGES.testimonialsHero} />
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Voices of our community" title="The difference is felt every day" description="From a child's first day to their final year, families see the impact of care, challenge, and connection." />

        {testimonials.length === 0 ? <p className="mt-12 text-center text-muted-foreground">Testimonials will be published here soon.</p> : <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{testimonials.map((t: any) => <TestimonialCard key={t._id} testimonial={t} />)}</div>}
      </section>
    </>
  );
}

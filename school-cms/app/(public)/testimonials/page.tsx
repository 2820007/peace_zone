import { SectionHeading, TestimonialCard } from "@/components/public/shared";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedTestimonials } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Hear what families and students say about ${SITE_CONFIG.name}.`,
};

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Community Says"
        description="Real stories from the families and students who make up our school."
      />

      {testimonials.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Testimonials will be published here soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t: any) => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>
      )}
    </section>
  );
}

import AboutSection from "@/components/Home/AboutSection";
import BeyoundAcademies from "@/components/Home/BeyoundAcademies";
import BrighterFuture from "@/components/Home/BrighterFuture";
import GalleryCard from "@/components/Home/GalleryCard";
import MyTeachers from "@/components/Home/MyTeachers";
import OurPrograme from "@/components/Home/OurProgram";
import StudentJourney from "@/components/Home/StudentJourney";
import { SectionHeading, TestimonialCard } from "@/components/public/shared";
import { StatsCounter } from "@/components/public/stats-counter";
import { Button } from "@/components/ui/button";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import {
  getFeaturedTestimonials,
  getPublishedGalleryItems,
  getUpcomingEvents,
} from "@/lib/queries";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  // Keep the existing public data flow intact.
  const [testimonials, _events, galleryItems] = await Promise.all([
    getFeaturedTestimonials(3),
    getUpcomingEvents(3),
    getPublishedGalleryItems(),
  ]);

  const gallery = galleryItems.slice(0, 6);

  return (
    <>
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative isolate overflow-hidden bg-primary pb-1 pt-14 shadow-[0_18px_50px_rgba(0,0,0,0.42)] sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
        {/* Single static hero background image */}
        <div className="pointer-events-none absolute -inset-[5%] -z-20 overflow-hidden">
          <Image
            src={SCHOOL_IMAGES.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_50%,rgba(0,0,0,0.38)_100%)]" />

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 to-transparent" />

        <div className="container relative">
          <div className="max-w-3xl rounded-[2rem] border border-white/20 bg-black/20 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:p-9 lg:p-11">
            {/* Eyebrow */}
            <div className="home-hero-reveal home-hero-reveal-1 mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">
              <span className="h-[2px] w-10 bg-accent" />
              Peace Zone Academy
            </div>

            {/* Main heading */}
            <h1 className="home-hero-reveal home-hero-reveal-2 mt-5 max-w-2xl font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Where curiosity grows,{" "}
              <span className="text-accent">confidence leads.</span>
            </h1>

            {/* Description */}
            <p className="home-hero-reveal home-hero-reveal-3 mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              At {SITE_CONFIG.name}, students build knowledge, confidence, and
              purpose through NEB-affiliated +2 programmes in Science,
              Management, and Law.
            </p>

            {/* Buttons */}
            <div className="home-hero-reveal home-hero-reveal-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group rounded-full px-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-primary hover:shadow-xl"
              >
                <Link href="/contact">
                  Enquire about admissions{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group rounded-full border-white/40 bg-white/10 px-7 text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-white/15 hover:text-white hover:shadow-lg"
              >
                <Link href="/contact">
                  Contact the academy{" "}
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Programme strip */}
          <div className="home-hero-reveal home-hero-reveal-5 mt-8 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-black/35 text-white shadow-[0_15px_40px_rgba(0,0,0,0.32)] backdrop-blur-md sm:grid-cols-4">
            {[
              ["NEB", "affiliated"],
              ["Science", "+2 stream"],
              ["Management", "+2 stream"],
              ["Law", "+2 stream"],
            ].map(([top, bottom], index) => (
              <div
                key={top}
                className="group relative cursor-default px-4 py-4 text-center transition-all duration-300 hover:bg-white/10 sm:py-5"
              >
                <p className="font-serif text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">
                  {top}
                </p>

                <p className="mt-1 text-xs font-medium text-white/65 transition-colors duration-300 group-hover:text-white">
                  {bottom}
                </p>

                <span className="absolute inset-x-5 bottom-0 h-[2px] origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

                {index < 3 && (
                  <span className="absolute right-0 top-1/4 hidden h-1/2 w-px bg-white/15 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          OTHER HOMEPAGE SECTIONS
      ========================================================= */}

      <StatsCounter />

      <OurPrograme />

      <AboutSection />

      <BeyoundAcademies />

      <StudentJourney />

      <GalleryCard gallery={gallery as any} />

      <BrighterFuture />

      {/* =========================================================
          TEACHERS SECTION
      ========================================================= */}

      <MyTeachers />

      {/* =========================================================
          TESTIMONIALS SECTION
      ========================================================= */}

      {testimonials.length > 0 && (
        <section className="relative mt-2 overflow-hidden bg-white py-10 sm:mt-3 sm:py-12 lg:mt-4 lg:py-16">
          <div className="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full bg-sky-100/80 blur-3xl" />

          <div className="pointer-events-none absolute bottom-16 left-[8%] h-4 w-4 rounded-full border-2 border-sky-300/60" />

          <div className="container relative">
            <SectionHeading
              eyebrow="Trusted by families"
              title={
                <>
                  A community families feel{" "}
                  <span className="text-accent">good about</span>
                </>
              }
              description="Hear from the families who are part of our learning community."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14">
              {testimonials.map((testimonial: any) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    <section className="border-b border-white/15 bg-white">
  <div className="container pt-5 pb-10 sm:pt-6 sm:pb-12">
    <div className="flex flex-col gap-7 border-y border-white/15 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-9 bg-accent" />
          Begin with a conversation
        </p>

        <h2 className="mt-4 font-serif text-primary text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Give your child a place to{" "}
          <span className="text-accent">grow.</span>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-black/65 sm:text-base">
          Visit {SITE_CONFIG.name} and discover a learning community built around
          curiosity, confidence, and character.
        </p>
      </div>

      <Link
        href="/contact"
        className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-black"
      >
        Plan a visit
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  </div>
</section>

      {/* =========================================================
          HERO TEXT ANIMATION ONLY
          Background slideshow animation removed.
      ========================================================= */}

      <style>{`
        @keyframes home-hero-reveal {
          from {
            opacity: 0;
            transform: translate3d(0, -24px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .home-hero-reveal {
          animation: home-hero-reveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .home-hero-reveal-1 {
          animation-delay: 0.1s;
        }

        .home-hero-reveal-2 {
          animation-delay: 0.2s;
        }

        .home-hero-reveal-3 {
          animation-delay: 0.3s;
        }

        .home-hero-reveal-4 {
          animation-delay: 0.4s;
        }

        .home-hero-reveal-5 {
          animation-delay: 0.5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-hero-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
import AboutSection from "@/components/Home/AboutSection";
import BeyoundAcademies from "@/components/Home/BeyoundAcademies";
import BrighterFuture from "@/components/Home/BrighterFuture";
import GalleryCard from "@/components/Home/GalleryCard";
import OurPrograme from "@/components/Home/OurProgram";
import StudentJourney from "@/components/Home/StudentJourney";
import { SectionHeading, TeacherCard, TestimonialCard } from "@/components/public/shared";
import { StatsCounter } from "@/components/public/stats-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import { getFeaturedTeachers, getFeaturedTestimonials, getPublishedGalleryItems, getUpcomingEvents } from "@/lib/queries";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  // Keep the existing public data flow intact; the redesign only changes presentation.
  const [teachers, testimonials, _events, galleryItems] = await Promise.all([
    getFeaturedTeachers(4),
    getFeaturedTestimonials(3),
    getUpcomingEvents(3),
    getPublishedGalleryItems(),
  ]);
  const gallery = galleryItems.slice(0, 6);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary pb-1 pt-14 shadow-[0_18px_50px_rgba(0,0,0,0.42)] sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
        <div className="pointer-events-none absolute -inset-[7%] -z-20 overflow-hidden">
          {[SCHOOL_IMAGES.hero, SCHOOL_IMAGES.campus, SCHOOL_IMAGES.classroom].map((image, index) => (
            <Image
              key={image}
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className={`home-hero-slide home-hero-slide-${index + 1} object-cover`}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_50%,rgba(0,0,0,0.38)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-black/30 blur-3xl" />

        <div className="container relative">
          <div className="max-w-3xl rounded-[2rem] border border-white/20 bg-black/20 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:p-9 lg:p-11">
            {/* <Badge className="home-hero-reveal border border-white/25 bg-white/10 px-3 py-1 text-white hover:bg-white/15">NEB affiliated</Badge> */}
            <div className="home-hero-reveal home-hero-reveal-1 mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-accent"><span className="h-[2px] w-10 bg-accent" />Peace Zone Academy</div>
            <h1 className="home-hero-reveal home-hero-reveal-2 mt-5 max-w-2xl font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">A place to <span className="text-accent">grow,</span> discover, and lead.</h1>
            <p className="home-hero-reveal home-hero-reveal-3 mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">At {SITE_CONFIG.name}, students build knowledge, confidence, and purpose through NEB-affiliated +2 programmes in Science, Management, and Law.</p>
            <div className="home-hero-reveal home-hero-reveal-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group rounded-full px-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-primary hover:shadow-xl"><Link href="/contact">Enquire about admissions <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="group rounded-full border-white/40 bg-white/10 px-7 text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-white/15 hover:text-white hover:shadow-lg"><Link href="/contact">Contact the academy <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" /></Link></Button>
            </div>
          </div>

          <div className="home-hero-reveal home-hero-reveal-5 mt-8 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-black/35 text-white shadow-[0_15px_40px_rgba(0,0,0,0.32)] backdrop-blur-md sm:grid-cols-4">
            {[["NEB", "affiliated"], ["Science", "+2 stream"], ["Management", "+2 stream"], ["Law", "+2 stream"]].map(([top, bottom], index) => <div key={top} className="group relative cursor-default px-4 py-4 text-center transition-all duration-300 hover:bg-white/10 sm:py-5"><p className="font-serif text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">{top}</p><p className="mt-1 text-xs font-medium text-white/65 transition-colors duration-300 group-hover:text-white">{bottom}</p><span className="absolute inset-x-5 bottom-0 h-[2px] origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />{index < 3 && <span className="absolute right-0 top-1/4 hidden h-1/2 w-px bg-white/15 sm:block" />}</div>)}
          </div>
        </div>
      </section>

      <StatsCounter />
      <OurPrograme />
      <AboutSection />
      <BeyoundAcademies />
      <StudentJourney />
      <GalleryCard gallery={gallery as any} />
      <BrighterFuture/>

      {teachers.length > 0 && (
        <section className="relative mt-8 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0f9ff_100%)] py-20 sm:mt-10 sm:py-24 lg:mt-12 lg:py-28">
          <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
          <div className="pointer-events-none absolute right-[10%] top-28 h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_0_7px_rgba(125,211,252,0.2)]" />
          <div className="pointer-events-none absolute bottom-20 right-[7%] h-36 w-36 rounded-full border-[18px] border-sky-100/70" />
          <div className="container relative"><SectionHeading eyebrow="Meet our educators" title="Mentors who make learning personal" description="Our teachers bring expertise, empathy, and a deep belief in what every learner can achieve." />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">{teachers.map((teacher: any) => <TeacherCard key={teacher._id} teacher={teacher} />)}</div>
            <div className="mt-12 flex justify-center"><Button asChild size="lg" className="group rounded-full bg-primary px-7 text-white shadow-[0_10px_28px_rgba(14,165,233,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-[0_16px_35px_rgba(14,165,233,0.26)]"><Link href="/teachers">Meet the full faculty <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link></Button></div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="relative mt-8 overflow-hidden bg-white py-20 sm:mt-10 sm:py-24 lg:mt-12 lg:py-28">
          <div className="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full bg-sky-100/80 blur-3xl" />
          <div className="pointer-events-none absolute bottom-16 left-[8%] h-4 w-4 rounded-full border-2 border-sky-300/60" />
          <div className="container relative"><SectionHeading eyebrow="Trusted by families" title="A community families feel good about" description="Hear from the families who are part of our learning community." />
            <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14">{testimonials.map((testimonial: any) => <TestimonialCard key={testimonial._id} testimonial={testimonial} />)}</div>
          </div>
        </section>
      )}


     

      <style>{`
        @keyframes home-hero-reveal {
          from { opacity: 0; transform: translate3d(0, -24px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .home-hero-reveal { animation: home-hero-reveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .home-hero-reveal-1 { animation-delay: 0.1s; }
        .home-hero-reveal-2 { animation-delay: 0.2s; }
        .home-hero-reveal-3 { animation-delay: 0.3s; }
        .home-hero-reveal-4 { animation-delay: 0.4s; }
        .home-hero-reveal-5 { animation-delay: 0.5s; }
        @keyframes home-hero-slideshow {
          0% { opacity: 1; transform: scale(1.08) translate3d(-2.5%, 0, 0); }
          28% { opacity: 1; transform: scale(1.14) translate3d(2.5%, 0, 0); }
          39%, 100% { opacity: 0; transform: scale(1.1) translate3d(1%, 0, 0); }
        }
        .home-hero-slide { opacity: 0; animation: home-hero-slideshow 18s ease-in-out infinite; will-change: opacity, transform; }
        .home-hero-slide-1 { animation-delay: 0s; }
        .home-hero-slide-2 { animation-delay: 6s; }
        .home-hero-slide-3 { animation-delay: 12s; }
        @media (prefers-reduced-motion: reduce) { .home-hero-slide, .home-hero-reveal { animation: none; transform: scale(1.08); } .home-hero-slide-1, .home-hero-reveal { opacity: 1; } .home-hero-reveal { transform: none; } }
      `}</style>
    </>
  );
}

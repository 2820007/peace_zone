import {
  SectionHeading,
  TeacherCard,
  TestimonialCard,
} from "@/components/public/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import {
  getFeaturedTeachers,
  getFeaturedTestimonials,
  getPublishedGalleryItems,
  getUpcomingEvents,
} from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  GraduationCap,
  MapPin,
  Microscope,
  Music2,
  Palette,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "Early Years",
    detail: "A joyful start built on play, discovery, and belonging.",
    icon: Sparkles,
  },
  {
    title: "Primary School",
    detail: "Strong foundations that turn curiosity into confident learning.",
    icon: BookOpen,
  },
  {
    title: "Middle School",
    detail: "Engaging learning experiences that grow independence and purpose.",
    icon: Microscope,
  },
  {
    title: "Senior School",
    detail: "Future-ready pathways for academic success and personal growth.",
    icon: Rocket,
  },
];
const activities = [
  { title: "Creative arts", icon: Palette },
  { title: "Sports & wellbeing", icon: Dumbbell },
  { title: "Music & performance", icon: Music2 },
  { title: "Leadership & clubs", icon: Users },
];
const journey = [
  [
    "A warm beginning",
    "Every learner is welcomed into a community where they feel known, safe, and ready to belong.",
  ],
  [
    "Learn and explore",
    "Active classrooms help students ask questions, build skills, and make meaningful connections.",
  ],
  [
    "Discover potential",
    "Guidance, feedback, and opportunity help every child uncover their strengths and interests.",
  ],
  [
    "Lead and achieve",
    "Students grow into capable, compassionate young people ready to shape their next chapter.",
  ],
];

export default async function HomePage() {
  const [teachers, testimonials, events, galleryItems] = await Promise.all([
    getFeaturedTeachers(4),
    getFeaturedTestimonials(3),
    getUpcomingEvents(3),
    getPublishedGalleryItems(),
  ]);
  const gallery = galleryItems.slice(0, 6);
  return (
    <>
      {/* Hero section: admissions introduction and primary actions */}
      

      {/* Academic programs section */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Our academic programs"
            title="A learning journey for every stage"
            description="Purposeful learning, age-appropriate care, and high expectations from the first day of school to graduation."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Card
                key={program.title}
                className="group border-border/70 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <program.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {program.detail}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Explore program <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About section: school values and background */}
      <section className="overflow-hidden bg-secondary/40 py-20 sm:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-primary">
            <Image
              src={SCHOOL_IMAGES.campus}
              alt="Life at our school"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 px-5 py-4 shadow-lg">
              <p className="text-2xl font-semibold text-primary">
                {new Date().getFullYear() - SITE_CONFIG.foundedYear}+
              </p>
              <p className="text-sm text-muted-foreground">
                years of nurturing potential
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
              About {SITE_CONFIG.shortName}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              A place to grow, discover, and thrive.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We combine strong academics with joyful discovery, meaningful
              relationships, and a supportive environment where every child is
              seen as an individual.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "Learning that encourages curiosity and creativity",
                "A caring community where every child belongs",
                "Experiences that build character and confidence",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </p>
              ))}
            </div>
            <Button asChild className="mt-8">
              <Link href="/about">
                Discover our story <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Activities section: learning beyond academics */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                Beyond academics
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                More ways to become who you are meant to be.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Learning goes well beyond the classroom. Students develop
                confidence, teamwork, imagination, and resilience through
                experiences that matter.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link href="/gallery">
                  See school life <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-secondary/30"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <activity.icon className="h-5 w-5" />
                  </span>
                  <p className="font-semibold">{activity.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student journey section */}
      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Student journey"
            title="Growing with purpose at every step"
            description="From a warm welcome to a lifelong connection, we help students become ready for the world ahead."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {journey.map(([title, description], index) => (
              <div
                key={title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6"
              >
                <span className="font-serif text-4xl font-semibold text-accent">
                  0{index + 1}
                </span>
                <h3 className="mt-8 font-serif text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educators section */}
      {teachers.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container">
            <SectionHeading
              eyebrow="Meet our educators"
              title="Mentors who make learning personal"
              description="Our teachers bring expertise, empathy, and a deep belief in what every learner can achieve."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((teacher: any) => (
                <TeacherCard key={teacher._id} teacher={teacher} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/teachers">
                  Meet the full faculty <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      {/* Testimonials section */}
      {testimonials.length > 0 && (
        <section className="bg-secondary/40 py-20 sm:py-24">
          <div className="container">
            <SectionHeading
              eyebrow="Trusted by families"
              title="A community families feel good about"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
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
      {/* Events and gallery section */}
      {(events.length > 0 || gallery.length > 0) && (
        <section className="py-20 sm:py-24">
          <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              {events.length > 0 && (
                <>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                    Stay updated
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Latest events and news
                  </h2>
                  <div className="mt-7 divide-y border-y">
                    {events.map((event: any) => (
                      <Link
                        href="/events"
                        key={event._id}
                        className="group block py-5"
                      >
                        <div className="flex gap-4">
                          <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary text-primary">
                            <span className="text-xs font-semibold">
                              {new Date(event.startDate).toLocaleString("en", {
                                month: "short",
                              })}
                            </span>
                            <span className="text-sm font-bold leading-none">
                              {new Date(event.startDate).getDate()}
                            </span>
                          </span>
                          <div>
                            <h3 className="font-semibold transition-colors group-hover:text-primary">
                              {event.title}
                            </h3>
                            {event.location && (
                              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />{" "}
                                {event.location}
                              </p>
                            )}
                            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarDays className="h-3.5 w-3.5" />{" "}
                              {formatDate(event.startDate)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button asChild variant="link" className="mt-4 px-0">
                    <Link href="/events">
                      View all events <ArrowRight />
                    </Link>
                  </Button>
                </>
              )}
            </div>
            {gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((item: any, index: number) => (
                  <div
                    key={item._id}
                    className={`relative overflow-hidden rounded-2xl bg-secondary ${index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
                  >
                    {item.mediaType === "youtube" ? (
                      <iframe src={item.image} title={item.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    ) : item.mediaType === "video" ? (
                      <video src={item.image} controls preload="metadata" className="h-full w-full object-cover" />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {/* Final call-to-action section */}
      <section className="relative isolate overflow-hidden bg-primary py-20 text-center text-primary-foreground sm:py-24">
        <Image
          src={SCHOOL_IMAGES.ctaBackground}
          alt=""
          fill
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-primary/90" />
        <div className="container">
          <Trophy className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-semibold sm:text-5xl">
            A brighter future begins with a meaningful first step.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/80">
            Come and see a learning community designed to help your child feel
            known, capable, and inspired.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Apply for admission <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/contact">Book a school visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Trophy,
  HeartHandshake,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SectionHeading,
  TeacherCard,
  TestimonialCard,
} from "@/components/public/shared";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import { formatDate } from "@/lib/utils";
import {
  getFeaturedTeachers,
  getFeaturedTestimonials,
  getUpcomingEvents,
  getPublishedGalleryItems,
} from "@/lib/queries";

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
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={SCHOOL_IMAGES.hero}
            alt="Students on campus"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        <div className="container relative py-28 sm:py-36">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Welcome to {SITE_CONFIG.name}
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold text-white sm:text-5xl">
            {SITE_CONFIG.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-white/90">{SITE_CONFIG.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Schedule a Visit <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. School introduction */}
      <section className="py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={SCHOOL_IMAGES.campus} alt="School campus" fill className="object-cover" />
          </div>
          <div>
            <SectionHeading
              center={false}
              eyebrow="About our school"
              title={`A tradition of excellence since ${SITE_CONFIG.foundedYear}`}
              description={`For over ${new Date().getFullYear() - SITE_CONFIG.foundedYear} years, ${SITE_CONFIG.name} has combined rigorous academics with a warm, supportive community — helping every student discover what they're capable of.`}
            />
            <Button asChild className="mt-6">
              <Link href="/about">
                More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Why choose our school */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Why families choose us"
            title="Everything your child needs to thrive"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Rigorous Academics", desc: "A curriculum that challenges and inspires curiosity at every grade level." },
              { icon: Users, title: "Small Class Sizes", desc: "Low student-to-teacher ratios so every student gets individual attention." },
              { icon: Trophy, title: "Award-Winning Programs", desc: "Recognized excellence in academics, arts, and athletics." },
              { icon: HeartHandshake, title: "Caring Community", desc: "A close-knit, values-driven environment where every student belongs." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistics */}
      <section className="py-16">
        <div className="container grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            { value: "1,200+", label: "Students" },
            { value: "95", label: "Faculty & Staff" },
            { value: "98%", label: "Graduation Rate" },
            { value: `${new Date().getFullYear() - SITE_CONFIG.foundedYear}+`, label: "Years of Excellence" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl font-semibold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured teachers */}
      {teachers.length > 0 && (
        <section className="bg-secondary/40 py-20">
          <div className="container">
            <SectionHeading eyebrow="Our educators" title="Meet a few of our faculty" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((teacher: any) => (
                <TeacherCard key={teacher._id} teacher={teacher} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/teachers">
                  View All Faculty <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 6. Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="container">
            <SectionHeading eyebrow="What families say" title="Trusted by our community" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t: any) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Events / news */}
      {events.length > 0 && (
        <section className="bg-secondary/40 py-20">
          <div className="container">
            <SectionHeading eyebrow="Stay in the loop" title="Upcoming events" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event: any) => (
                <Card key={event._id}>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      <CalendarDays className="h-3 w-3" /> {formatDate(event.startDate)}
                    </Badge>
                    <h3 className="font-serif text-lg font-semibold">{event.title}</h3>
                    {event.location ? (
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {event.location}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/events">
                  View All Events <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 8. Gallery preview */}
      {gallery.length > 0 && (
        <section className="py-20">
          <div className="container">
            <SectionHeading eyebrow="Life on campus" title="A glimpse into our school" />
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((item: any) => (
                <div key={item._id} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform hover:scale-105" />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/gallery">
                  View Full Gallery <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 9. Call to action */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src={SCHOOL_IMAGES.ctaBackground} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative text-center text-white">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Ready to join the {SITE_CONFIG.shortName} community?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Schedule a campus tour or reach out with any questions — we&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* 10. Contact/footer is rendered globally via SiteFooter in the public layout */}
    </>
  );
}

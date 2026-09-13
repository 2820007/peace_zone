import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SCHOOL_IMAGES } from "@/config/site";
import { Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 sm:py-24">
      <Image src={image} alt="" fill priority className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-primary/80" />
      <div className="container">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

export function TeacherCard({ teacher }: { teacher: any }) {
  return (
    <Card className="group overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <Image
          src={teacher.image || SCHOOL_IMAGES.defaultAvatar}
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      </div>
      <CardContent className="p-5">
        <h3 className="font-serif text-lg font-semibold">{teacher.name}</h3>
        <p className="text-sm text-primary">{teacher.designation}</p>
        {teacher.qualification ? (
          <p className="mt-1 text-sm text-muted-foreground">{teacher.qualification}</p>
        ) : null}
        <Button asChild variant="outline" size="sm" className="mt-4 w-full">
          <Link href={`/teachers/${teacher.slug}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="h-full border-border/70 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <StarRating rating={testimonial.rating} />
          <span className="font-serif text-5xl leading-[0.7] text-primary/15">&rdquo;</span>
        </div>
        <p className="mt-3 flex-1 text-base leading-relaxed text-foreground/75">
          &ldquo;{testimonial.message}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-secondary">
            <Image
              src={testimonial.image || SCHOOL_IMAGES.defaultAvatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{testimonial.name}</p>
            {testimonial.role ? (
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ContactStrip() {
  return (
    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <Phone className="h-4 w-4" /> Call us
      </span>
      <span className="flex items-center gap-2">
        <Mail className="h-4 w-4" /> Email us
      </span>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SCHOOL_IMAGES } from "@/config/site";
import { Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-secondary">
        <Image
          src={teacher.image || SCHOOL_IMAGES.defaultAvatar}
          alt={teacher.name}
          fill
          className="object-cover"
        />
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
    <Card className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <StarRating rating={testimonial.rating} />
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
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


"use client";

import { useRef, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SCHOOL_IMAGES } from "@/config/site";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={
        center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mb-5 flex items-center gap-3 ${
            center ? "justify-center" : "justify-start"
          }`}
        >
          <span className="h-px w-6 bg-accent sm:w-8" />

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>

          <span className="h-px w-6 bg-accent sm:w-8" />
        </motion.div>
      ) : null}

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.15,
        }}
        className="font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

/* =========================================================
   STAR RATING
   ========================================================= */

export function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: i * 0.06,
          }}
        >
          <Star
            className={
              i < rating
                ? "h-4 w-4 fill-accent text-accent"
                : "h-4 w-4 text-border"
            }
          />
        </motion.div>
      ))}
    </div>
  );
}

/* =========================================================
   TEACHER CARD
   ========================================================= */

export function TeacherCard({ teacher }: { teacher: any }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div className="flex h-full flex-col items-center">

        {/* =================================================
            SEPARATE TEACHER IMAGE
           ================================================= */}
        <motion.div
          whileHover={{
            scale: 1.06,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
className="relative z-10 -mb-9 h-36 w-36 overflow-hidden rounded-full border-[10px] border-sky-200 bg-secondary sm:h-40 sm:w-40">
          <Image
            src={teacher.image || SCHOOL_IMAGES.defaultAvatar}
            alt={teacher.name}
            fill
            sizes="160px"
            className="object-cover object-center"
          />
        </motion.div>

        {/* =================================================
            TEACHER DETAILS BOX
           ================================================= */}
        <Card className="w-full rounded-[1.8rem] border-2 border-primary/20 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <CardContent className="flex min-h-[205px] flex-col items-center px-5 pb-5 pt-14 text-center sm:px-6">

            {/* Name */}
            <h3 className="font-[Arial,Helvetica,sans-serif] text-xl font-bold leading-tight text-primary sm:text-2xl">
              {teacher.name}
            </h3>

            {/* Designation */}
            {teacher.designation ? (
              <p className="mt-2 text-sm font-semibold text-accent">
                {teacher.designation}
              </p>
            ) : null}

            {/* Qualification */}
            {teacher.qualification ? (
              <p className="mt-2 max-w-[280px] text-sm leading-5 text-muted-foreground">
                {teacher.qualification}
              </p>
            ) : null}

            {/* Small Divider */}
            <div className="my-3 h-[2px] w-12 bg-primary/20" />

            {/* View Profile */}
            <Link
              href={`/teachers/${teacher.slug}`}
              className="flex items-center gap-1.5 text-sm font-bold text-primary transition-transform duration-300 hover:translate-x-1"
            >
              View Profile

              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

/* =========================================================
   TESTIMONIAL CARD
   ========================================================= */

export function TestimonialCard({
  testimonial,
}: {
  testimonial: any;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="h-full min-w-0"
    >
      <Card className="group relative h-full overflow-hidden rounded-[2rem] border-2 border-border/60 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-500 hover:border-accent hover:shadow-[0_25px_60px_rgba(15,23,42,0.16)]">

        {/* Floating Decorative Circle */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative Dot */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-6 top-6 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_5px_rgba(245,158,11,0.12)]"
        />

        <CardContent className="relative flex h-full min-h-[320px] flex-col p-6 sm:p-7">

          {/* Quote */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="font-serif text-6xl font-bold leading-none text-accent/20 transition-colors duration-300 group-hover:text-accent/30"
          >
            “
          </motion.div>

          {/* Rating */}
          <div className="mt-1">
            <StarRating rating={testimonial.rating} />
          </div>

          {/* Message */}
          <p className="mt-5 flex-1 text-[15px] leading-7 text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            “{testimonial.message}”
          </p>

          {/* Person */}
          <div className="mt-5 flex items-center gap-4 border-t-2 border-border/60 pt-4 transition-colors duration-300 group-hover:border-accent/40">

            {/* Profile Image */}
            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-[3px] border-accent/20 bg-secondary shadow-md transition-all duration-300 group-hover:border-accent"
            >
              <Image
                src={
                  testimonial.image || SCHOOL_IMAGES.defaultAvatar
                }
                alt={testimonial.name}
                fill
                sizes="48px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>

            {/* Person Details */}
            <div>
              <p className="text-sm font-bold text-primary transition-colors duration-300 group-hover:text-accent">
                {testimonial.name}
              </p>

              {testimonial.role ? (
                <p className="mt-0.5 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                  {testimonial.role}
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* =========================================================
   TESTIMONIAL SLIDER
   ========================================================= */

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: any[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideNext = () => {
    if (!sliderRef.current) return;

    const firstSlide = sliderRef.current.firstElementChild as HTMLElement | null;
    const gap = 24;

    sliderRef.current.scrollBy({
      left: (firstSlide?.clientWidth || sliderRef.current.clientWidth) + gap,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-1 sm:px-2">

      {/* Testimonials */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={
              testimonial.id ||
              testimonial.slug ||
              index
            }
          className="w-full shrink-0 snap-start md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* =================================================
          RIGHT SIDE SLIDE BUTTON
         ================================================= */}
      {testimonials.length > 1 ? (
        <motion.button
          type="button"
          onClick={slideNext}
          aria-label="Next testimonial"
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="absolute -right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-primary bg-white text-primary shadow-[0_10px_30px_rgba(15,23,42,0.16)] transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white sm:-right-5 sm:h-14 sm:w-14"
        >
          <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
        </motion.button>
      ) : null}
    </div>
  );
}

/* =========================================================
   CONTACT STRIP
   ========================================================= */

export function ContactStrip() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="flex flex-wrap gap-6 text-sm text-muted-foreground"
    >
      <motion.span
        whileHover={{ y: -2 }}
        className="flex items-center gap-2 transition-colors hover:text-accent"
      >
        <Phone className="h-4 w-4 text-accent" />
        Call us
      </motion.span>

      <motion.span
        whileHover={{ y: -2 }}
        className="flex items-center gap-2 transition-colors hover:text-accent"
      >
        <Mail className="h-4 w-4 text-accent" />
        Email us
      </motion.span>
    </motion.div>
  );
}

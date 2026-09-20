
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  Palette,
  Music,
  Users,
  BookOpen,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const activities = [
  {
    title: "Sports & Athletics",
    icon: Dumbbell,
  },
  {
    title: "Arts & Creativity",
    icon: Palette,
  },
  {
    title: "Music & Performing Arts",
    icon: Music,
  },
  {
    title: "Clubs & Societies",
    icon: Users,
  },
  {
    title: "Reading & Discovery",
    icon: BookOpen,
  },
  {
    title: "Photography & Media",
    icon: Camera,
  },
];

export default function BeyoundAcademies() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-16">
      {/* =========================
          BACKGROUND DECORATION
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        />

        <div className="absolute left-[10%] top-[25%] h-2 w-2 rounded-full bg-accent/40" />

        <div className="absolute right-[15%] top-[20%] h-3 w-3 rounded-full bg-primary/20" />

        <div className="absolute bottom-[20%] left-[45%] h-2 w-2 rounded-full bg-accent/30" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
              y: 60,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Section label */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-10 bg-accent" />

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Beyond academics
              </p>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="max-w-xl font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl"
            >
              More ways to become{" "}
              <span className="text-accent">who you are</span> meant to be.
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg"
            >
              Learning goes well beyond the classroom. Students develop
              confidence, teamwork, imagination, and resilience through
              experiences that matter.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mt-8"
            >
              <Button
                asChild
                size="lg"
                className="group rounded-full px-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href="/gallery"
                  className="flex items-center gap-2"
                >
                  See school life

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* =========================
              RIGHT ACTIVITY CARDS
          ========================== */}
          <div className="grid gap-4 sm:grid-cols-2">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  key={activity.title}
                  initial={{
                    opacity: 0,
                    x: 100,
                    y: 40,
                    scale: 0.88,
                    rotate: 2,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  className="group relative"
                >
                  {/* Glow */}
                  <div className="absolute -inset-1 rounded-[1.5rem] bg-accent/10 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

                  {/* Card */}
                  <div className="relative flex min-h-[110px] items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-500 group-hover:border-accent/30 group-hover:bg-white group-hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)]">

                    {/* Decorative circle */}
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4 + index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border-[10px] border-accent/5 transition-colors duration-500 group-hover:border-accent/10"
                    />

                    {/* Icon */}
                    <motion.span
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -8, 8, -4, 0],
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:bg-accent group-hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.span>

                    {/* Title */}
                    <p className="relative pr-6 text-sm font-bold leading-relaxed text-foreground transition-colors duration-300 group-hover:text-primary">
                      {activity.title}
                    </p>

                    {/* Arrow */}
                    <span className="absolute bottom-4 right-4 translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


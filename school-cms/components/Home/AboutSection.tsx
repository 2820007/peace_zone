
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";
import aboutImageOne from "@/components/public/Untitled design.png";
import aboutImageTwo from "@/components/public/Untitled design (1).png";
import caringImage from "@/components/public/Caring.jpg";

const aboutImages = [
  { src: aboutImageOne, alt: "Students learning together" },
  { src: aboutImageTwo, alt: "Students growing through education" },
  { src: caringImage, alt: "A caring school community" },
];

export default function AboutSection() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % aboutImages.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-16">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* =========================
              LEFT IMAGE SECTION
          ========================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: -120,
              y: 70,
              scale: 0.9,
              rotate: -2,
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
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Decorative glow */}
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />

            {/* Main image container */}
            <motion.div
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              className="relative overflow-hidden rounded-[2.5rem] bg-primary shadow-[0_25px_70px_rgba(15,45,80,0.15)]"
            >
              <div className="relative min-h-[460px] sm:min-h-[540px]">
                {aboutImages.map((image, index) => (
                  <Image
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${
                      index === activeImage ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />

                {/* Top label */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                  }}
                  className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                >
                  Life at our school
                </motion.div>

                {/* Bottom information */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.65,
                  }}
                  className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4"
                >
               

                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 45,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-primary shadow-lg sm:flex"
                  >
                    ↗
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative bottom shape */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-[2rem] bg-accent/20"
            />
          </motion.div>

          {/* =========================
              RIGHT CONTENT SECTION
          ========================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 120,
              y: 70,
              scale: 0.9,
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
              duration: 1,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Section label */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-10 bg-accent" />

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                About {SITE_CONFIG.shortName}
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
                delay: 0.45,
              }}
              className="max-w-xl font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem]"
            >
              A place to{" "}
              <span className="text-accent">grow,</span> discover, and thrive.
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
                delay: 0.55,
              }}
              className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg"
            >
              We combine strong academics with joyful discovery, meaningful
              relationships, and a supportive environment where every child is
              seen as an individual.
            </motion.p>

            {/* =========================
                FEATURE LIST
            ========================== */}
            <div className="mt-8 space-y-4">
              {[
                "Learning that encourages curiosity and creativity",
                "A caring community where every child belongs",
                "Experiences that build character and confidence",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    x: 70,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.6 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-white hover:shadow-lg"
                >
                  {/* Number */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-primary">
                    0{index + 1}
                  </div>

                  {/* Text */}
                  <p className="text-sm font-semibold leading-relaxed text-foreground">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* =========================
                BUTTONS
            ========================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.95,
              }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              {/* Primary button */}
              <Button
                asChild
                size="lg"
                className="group rounded-full px-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href="/about">
                  Discover our story

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* Secondary link */}
              <Link
                href="/about"
                className="group flex items-center gap-2 text-sm font-bold text-primary"
              >
                Learn more

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

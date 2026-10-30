
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import brighterFutureImage from "@/components/public/group photos-Picsart-AiImageEnhancer.jpg";

export default function BrighterFuture() {
  return (
    <section className="relative isolate mt-2 overflow-hidden py-8 sm:mt-3 sm:py-10 lg:mt-4 lg:py-12">
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src={brighterFutureImage}
          alt="Students celebrating their achievements"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-20 bg-black/65" />

      {/* Subtle Accent Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />

      {/* Content Animation */}
      <motion.div
        initial={{
          opacity: 0,
          y: 70,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="container relative"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/15 bg-black/25 px-5 py-8 text-center shadow-2xl backdrop-blur-[2px] sm:px-8 sm:py-10 lg:px-12">
          {/* Icon */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-accent shadow-lg sm:h-14 sm:w-14"
          >
            <Trophy className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-accent sm:w-10" />

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
              Your next chapter
            </p>

            <span className="h-px w-8 bg-accent sm:w-10" />
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
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-3 max-w-3xl font-[Arial,Helvetica,sans-serif] text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            A brighter future begins with a{" "}
            <span className="text-accent">meaningful first step.</span>
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
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base"
          >
            Come and see a learning community designed to help your child feel
            known, capable, and inspired.
          </motion.p>

          {/* Buttons */}
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.55,
            }}
            className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-accent px-6 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent/90 hover:shadow-xl"
            >
              <Link href="/contact">
                Apply for admission
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

          </motion.div>

          {/* Feature Points */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.65,
            }}
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-xs text-white/75 sm:text-sm"
          >
            {[
              "Personal guidance",
              "Programme information",
              "Campus visit support",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


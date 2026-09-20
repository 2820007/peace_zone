"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Microscope,
  Palette,
} from "lucide-react";

const programs = [
  {
    number: "01",
    title: "Primary School",
    href: "/programs/primary-school",
    subtitle: "Ages 3–5",
    description:
      "A joyful beginning where children explore, discover, and develop a strong foundation for lifelong learning.",
    icon: Palette,
    tag: "Foundation",
    gradient: "from-pink-500/20 to-orange-400/20",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    number: "02",
    title: "Secondary School",
    href: "/programs/secondary-school",
    subtitle: "Grades 1–5",
    description:
      "Building confidence, curiosity, creativity, and essential academic skills through engaging learning experiences.",
    icon: BookOpen,
    tag: "Discover",
    gradient: "from-blue-500/20 to-cyan-400/20",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    number: "03",
    title: "+2 School",
    href: "/programs/plus-two-management",
    subtitle: "Grades 6–8",
    description:
      "Encouraging independent thinking, collaboration, and deeper understanding across a broad range of subjects.",
    icon: Microscope,
    tag: "Explore",
    gradient: "from-purple-500/20 to-indigo-400/20",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    number: "04",
    title: "School Polices & Guidelines",
    href: "/school-policies",
    subtitle: "Grades 9–12",
    description:
      "Preparing students for higher education and future careers through academic excellence and leadership.",
    icon: GraduationCap,
    tag: "Achieve",
    gradient: "from-emerald-500/20 to-teal-400/20",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
    rotateX: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function OurPrograme() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-[#f7f9fc] py-10 sm:py-12 lg:py-14"
    >
      {/* ================= BACKGROUND DECORATIONS ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl"
        />

        <div className="absolute left-[10%] top-[20%] h-3 w-3 rounded-full bg-blue-400/40" />
        <div className="absolute right-[15%] top-[30%] h-4 w-4 rounded-full bg-purple-400/40" />
        <div className="absolute bottom-[20%] left-[20%] h-2 w-2 rounded-full bg-pink-400/50" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* ================= SECTION HEADING ================= */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          {/* Small Label */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm"
          >
            {/* <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" /> */}

            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-accent sm:w-20" />

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Our Academic Programs
              </p>

              <span className="h-px w-12 bg-accent sm:w-20" />
            </div>
          </motion.div>

          {/* Heading */}

        <h2 className="text-4xl font-black leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
  A learning journey{" "}
  <span className="relative inline-block">
    <span className="relative z-10 text-accent">
      for every stage.
    </span>

    {/* Underline */}
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{
        delay: 0.5,
        duration: 0.8,
      }}
      className="absolute bottom-1 left-0 h-2 rounded-full bg-accent/20"
    />
  </span>
</h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Purposeful learning, age-appropriate care, and high expectations
            from the first day of school to graduation.
          </p>
        </motion.div>

        {/* ================= PROGRAM CARDS ================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <motion.div
                key={program.number}
                variants={cardVariants}
                style={{
                  transformStyle: "preserve-3d",
                }}
                whileHover={{
                  y: -14,
                  scale: 1.025,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="group relative cursor-pointer"
              >
                <Link
                  href={program.href}
                  aria-label={`Explore ${program.title}`}
                  className="block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
                >
                  {/* Glow behind card */}
                  <div
                    className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-br ${program.gradient} opacity-0 blur-xl transition duration-500 group-hover:opacity-100`}
                  />

                  {/* Card */}
                  <div className="relative flex h-full min-h-[370px] flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:border-transparent group-hover:shadow-[0_25px_60px_rgba(15,23,42,0.14)]">
                  {/* Top */}

                  <div className="flex items-start justify-between">
                    <span className="text-sm font-black tracking-widest text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
                      {program.number}
                    </span>

                    <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-all duration-300 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                      {program.tag}
                    </span>
                  </div>

                  {/* Icon */}

                  <motion.div
                    whileHover={{
                      rotate: [0, -8, 8, -4, 0],
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className={`mt-7 flex h-14 w-14 items-center justify-center rounded-2xl ${program.iconBg} ${program.iconColor} shadow-sm`}
                  >
                    <Icon size={27} strokeWidth={1.8} />
                  </motion.div>

                  {/* Content */}

                  <div className="mt-5">
                    <p className="mb-2 text-sm font-semibold text-slate-400">
                      {program.subtitle}
                    </p>

                    <h3 className="text-2xl font-extrabold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent">                      {program.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {program.description}
                    </p>
                  </div>

                  {/* Bottom */}

                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-blue-600">
                        Explore program
                      </span>

                      <motion.div
                        whileHover={{
                          rotate: 45,
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white"
                      >
                        <ArrowUpRight size={19} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating decorative circle */}

                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border-[18px] border-slate-50/80 transition-all duration-500 group-hover:border-blue-50"
                  />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ================= BOTTOM CTA ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
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
            delay: 0.2,
          }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-purple-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-blue-600"
          >
            Discover all programs
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { motion } from "framer-motion";

const journey = [
  [
    "A warm welcome",
    "Every student begins their journey in a safe, supportive, and inspiring environment.",
  ],
  [
    "Discovering strengths",
    "Students explore their interests, develop confidence, and discover their unique potential.",
  ],
  [
    "Growing with purpose",
    "Through learning, leadership, and collaboration, students develop meaningful life skills.",
  ],
  [
    "Preparing for tomorrow",
    "We help students become confident, responsible, and ready for the world ahead.",
  ],
];

export default function StudentJourney() {
  return (
    <section className="relative overflow-hidden bg-primary py-10 text-primary-foreground sm:py-12 lg:py-14">
      {/* Background Decorations */}
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
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl"
        />

        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-accent/40" />
        <div className="absolute right-[15%] top-[30%] h-3 w-3 rounded-full bg-white/20" />
        <div className="absolute bottom-[20%] left-[30%] h-2 w-2 rounded-full bg-accent/30" />
      </div>

      <div className="container relative">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-[2px] w-7 bg-accent" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Student journey
            </span>

            <span className="h-[2px] w-7 bg-accent" />
          </motion.div>

          {/* Heading */}
          <motion.h2
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
              duration: 0.6,
              delay: 0.25,
            }}
            className="mt-3 font-[Arial,Helvetica,sans-serif] text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Growing with purpose
            <br />
            <em className="font-bold text-accent">
              at every step.
            </em>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base"
          >
            From a warm welcome to a lifelong connection, we help students
            become ready for the world ahead.
          </motion.p>
        </motion.div>

        {/* Journey Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {journey.map(([title, description], index) => (
            <motion.article
              key={title}
              initial={{
                opacity: 0,
                y: 60,
                x: index % 2 === 0 ? -20 : 20,
                scale: 0.94,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.65,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
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
              <div className="relative min-h-[245px] overflow-hidden rounded-2xl border border-white/10 bg-orange-400 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-500 group-hover:border-accent/50 group-hover:bg-white/[0.1] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">

                {/* Decorative Circle */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 4, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border-[12px] border-accent/5 transition-all duration-500 group-hover:border-accent/10"
                />

                <div className="relative">

                  {/* Number */}
                  <motion.span
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="font-serif text-3xl font-semibold text-white/90 transition-colors duration-300 group-hover:text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>

                  {/* Divider */}
                  <div className="mt-5 h-px w-10 bg-accent transition-all duration-500 group-hover:w-20" />

                  {/* Title */}
                  <h3 className="mt-4 font-[Arial,Helvetica,sans-serif] text-lg font-bold tracking-tight text-white">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-white/60 transition-colors duration-300 group-hover:text-white/75">
                    {description}
                  </p>

                  {/* Bottom Indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 group-hover:text-accent/80">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-7 h-px max-w-3xl origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
      </div>
    </section>
  );
}


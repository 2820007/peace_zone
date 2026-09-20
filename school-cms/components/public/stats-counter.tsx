
"use client";

import { Award, Medal, Users, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 25,
    suffix: "+",
    label: "Years of Excellence",
    icon: Award,
  },
  {
    value: 98,
    suffix: "%",
    label: "College Acceptance",
    icon: Medal,
  },
  {
    value: 50,
    suffix: "+",
    label: "Extracurricular Activities",
    icon: Users,
  },
  {
    value: 15,
    suffix: ":1",
    label: "Student-Teacher Ratio",
    icon: UserRound,
  },
];

function Counter({
  value,
  suffix,
  started,
}: {
  value: number;
  suffix: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const startTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [started, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="School highlights"
      className="mt-2 w-full bg-white py-6 sm:mt-3 sm:py-7"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, suffix, label, icon: Icon }) => (
            <div
              key={label}
              className="
                group relative flex min-h-[125px] w-full
                items-center gap-4
                overflow-hidden
                rounded-[1.5rem]
                border-2 border-sky-100
                bg-white
                px-5 py-6
                shadow-[0_8px_30px_rgba(15,23,42,0.06)]
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:scale-[1.015]
                hover:border-sky-300
                hover:bg-sky-50/70
                hover:shadow-[0_15px_35px_rgba(14,165,233,0.12)]
                sm:px-6
                sm:py-7
              "
            >
              {/* Icon */}
              <span
                className="
                  relative z-10
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-2xl
                  border-2 border-sky-100
                  bg-sky-50
                  text-sky-600
                  transition-all duration-300
                  group-hover:scale-105
                  group-hover:border-sky-300
                  group-hover:bg-sky-100
                  group-hover:text-sky-700
                  sm:h-14 sm:w-14
                "
              >
                <Icon
                  className="
                    h-6 w-6
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                  strokeWidth={1.8}
                />
              </span>

              {/* Text */}
              <div className="relative z-10 min-w-0">
                {/* Counter */}
                <p
                  className="
                    font-[Arial,Helvetica,sans-serif]
                    text-2xl font-extrabold
                    leading-none tracking-tight
                    text-primary
                    transition-colors duration-300
                    sm:text-3xl
                  "
                >
                  <Counter
                    value={value}
                    suffix={suffix}
                    started={started}
                  />
                </p>

                {/* Label */}
                <p
                  className="
                    mt-2
                    font-[Arial,Helvetica,sans-serif]
                    text-[10px] font-bold
                    uppercase tracking-[0.12em]
                    text-muted-foreground
                    transition-colors duration-300
                    group-hover:text-sky-700
                    sm:text-xs
                  "
                >
                  {label}
                </p>
              </div>

              {/* Small decorative circle */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-20
                  w-20
                  rounded-full
                  border-[7px]
                  border-sky-100
                  opacity-60
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:border-sky-200
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


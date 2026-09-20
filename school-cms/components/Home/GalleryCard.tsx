
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface GalleryItem {
  _id: string;
  image: string;
  title: string;
}

interface GalleryCardProps {
  gallery: GalleryItem[];
}

function isVideoUrl(value: string) {
  return /(?:youtube(?:-nocookie)?\.com|youtu\.be)/i.test(value);
}

function getVideoEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const videoId = url.hostname.includes("youtu.be")
      ? url.pathname.slice(1)
      : url.searchParams.get("v") || url.pathname.split("/").pop();

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null;
  } catch {
    return null;
  }
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!gallery || gallery.length === 0) return null;

  const videos = gallery.filter((item) => isVideoUrl(item.image));
  const displayedGallery = gallery
    .filter((item) => !isVideoUrl(item.image))
    .slice(0, 4);

  return (
    <section
      ref={sectionRef}
      className="relative mt-2 overflow-hidden bg-white py-10 sm:mt-3 sm:py-12 lg:mt-4 lg:py-16"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left soft accent glow */}
        <div
          className={`absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl transition-all [transition-duration:1800ms] ${
            isVisible
              ? "translate-x-0 translate-y-0 opacity-100"
              : "-translate-x-20 -translate-y-10 opacity-0"
          }`}
        />

        {/* Right soft primary glow */}
        <div
          className={`absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl transition-all [transition-duration:1800ms] delay-200 ${
            isVisible
              ? "translate-x-0 translate-y-0 opacity-100"
              : "translate-x-20 translate-y-10 opacity-0"
          }`}
        />

        {/* Decorative dots */}
        <div
          className={`absolute left-[10%] top-[25%] h-2 w-2 rounded-full bg-accent/40 transition-all duration-1000 delay-300 ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-50 opacity-0"
          }`}
        />

        <div
          className={`absolute right-[15%] top-[20%] h-3 w-3 rounded-full bg-primary/20 transition-all duration-1000 delay-500 ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-50 opacity-0"
          }`}
        />

        <div
          className={`absolute bottom-[20%] left-[45%] h-2 w-2 rounded-full bg-accent/30 transition-all duration-1000 delay-700 ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-50 opacity-0"
          }`}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10">
        {/* ===================================================
            HEADING
        ==================================================== */}

        <div
          className={`mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ease-out ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-16 scale-95 opacity-0"
          }`}
        >
          {/* Section Label */}

          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              className={`h-[2px] bg-accent transition-all duration-700 ${
                isVisible ? "w-10" : "w-0"
              }`}
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Campus Life & Memories
            </p>

            <span
              className={`h-[2px] bg-accent transition-all duration-700 ${
                isVisible ? "w-10" : "w-0"
              }`}
            />
          </div>

          {/* Main Heading */}

          <h2 className="font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            Moments That Define{" "}
            <span className="text-accent">Our Community</span>
          </h2>

          {/* Underline */}

          <div
            className={`mx-auto mt-5 h-[2px] rounded-full bg-accent transition-all duration-1000 delay-200 ${
              isVisible
                ? "w-16 translate-y-0 opacity-100"
                : "w-0 translate-y-4 opacity-0"
            }`}
          />

          {/* Description */}

          <p
            className={`mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground transition-all duration-1000 delay-300 sm:text-lg ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Discover the experiences, achievements, celebrations, and everyday
            moments that bring our school community together.
          </p>
        </div>

        {/* ===================================================
            IMAGE / VIDEO TOGGLE
        ==================================================== */}

        <div
          className={`mt-9 flex justify-center px-6 transition-all duration-1000 delay-500 ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-10 scale-90 opacity-0"
          }`}
        >
          <div className="inline-flex rounded-full border border-border/60 bg-white p-1.5 shadow-[0_8px_25px_rgba(15,23,42,0.08)]">
            {/* Images */}

            <button
              type="button"
              onClick={() => setActiveTab("images")}
              className={`rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-9 ${
                activeTab === "images"
                  ? "bg-primary text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              Images
            </button>

            {/* Videos */}

            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={`rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-9 ${
                activeTab === "videos"
                  ? "bg-primary text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* ===================================================
            IMAGE CONTENT
        ==================================================== */}

        {activeTab === "images" && (
          <div
            className={`mx-auto mt-12 max-w-7xl px-6 transition-all duration-1000 ease-out sm:mt-14 lg:px-8 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {displayedGallery.map((item, index) => (
                <div
                  key={item._id}
                    className={`group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_25px_rgba(15,23,42,0.08)] transition-all duration-700 ease-out hover:z-10 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-16 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 120}ms`,
                  }}
                >
                  {/* Image */}

                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        25vw
                      "
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Overlay */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-80" />

                    {/* Title */}

                    <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="truncate text-sm font-bold text-white sm:text-base">
                        {item.title}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================
            VIDEO CONTENT
        ==================================================== */}

        {activeTab === "videos" && (
          <div
            className={`mx-auto mt-12 max-w-7xl px-6 transition-all duration-700 sm:mt-14 lg:px-8 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-accent/20 bg-white p-6 text-center shadow-[0_8px_25px_rgba(15,23,42,0.08)] transition-all duration-500 hover:border-accent/50 hover:shadow-[0_16px_35px_rgba(15,23,42,0.15)] sm:p-10">
              {videos.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {videos.map((item) => {
                    const embedUrl = getVideoEmbedUrl(item.image);
                    return embedUrl ? (
                      <div key={item._id} className="overflow-hidden rounded-xl border border-border/60 bg-secondary text-left">
                        <div className="aspect-video">
                          <iframe
                            src={embedUrl}
                            title={item.title}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        <p className="p-4 text-sm font-semibold text-primary">{item.title}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : null}

              {videos.length === 0 && (
                <>
              {/* Play Icon */}

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 hover:bg-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>

              <h3 className="mt-5 font-[Arial,Helvetica,sans-serif] text-2xl font-bold text-primary">
                School <span className="text-accent">Videos</span>
              </h3>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Explore videos from school events, activities, celebrations,
                and memorable moments from our school community.
              </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* ===================================================
            FIXED SEE MORE BUTTON
        ==================================================== */}

        <div
          className={`mt-10 flex justify-center px-6 transition-all duration-1000 delay-700 sm:mt-12 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_25px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_14px_30px_rgba(15,23,42,0.20)]"
          >
            See More

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}


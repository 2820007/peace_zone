"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BannerItem {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function BannerCarousel({ banners }: { banners: BannerItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // A revalidated homepage can receive fewer banners than before. Keep the
  // selected slide valid rather than attempting to render an undefined item.
  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(banners.length - 1, 0)));
  }, [banners.length]);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[activeIndex];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950" aria-label="School highlights">
      <div className="relative min-h-[31rem] sm:min-h-[38rem]">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((item, index) => (
            <div key={item._id} className="relative h-full min-w-full" aria-hidden={index !== activeIndex}>
              <Image src={item.image} alt={item.title || "School highlight"} fill priority={index === 0} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-slate-950/45" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.2)_42%,rgba(2,6,23,0.82)_100%)]" />
            </div>
          ))}
        </div>
        <div className="container relative flex min-h-[31rem] items-center justify-center py-20 text-center sm:min-h-[38rem]">
          <div className="max-w-3xl text-white" key={banner._id}>
            <p className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200 shadow-lg backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Peace Zone Academy
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance drop-shadow-lg sm:text-6xl lg:text-7xl">{banner.title}</h1>
            {banner.subtitle ? <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85 drop-shadow sm:text-lg">{banner.subtitle}</p> : null}
            {banner.buttonLabel && banner.buttonHref ? (
              <Button asChild size="lg" className="mt-8 rounded-full bg-amber-300 px-7 font-semibold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-amber-200">
                <Link href={banner.buttonHref}>{banner.buttonLabel}</Link>
              </Button>
            ) : null}
          </div>
        </div>
        {banners.length > 1 ? (
          <div className="absolute inset-x-0 bottom-7 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/25 px-3 py-2 backdrop-blur-sm" aria-label="Banner slides">
              {banners.map((item, index) => (
                <button key={item._id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show banner ${index + 1}`} className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${index === activeIndex ? "w-7 bg-amber-300" : "w-2 bg-white/60 hover:bg-white"}`} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

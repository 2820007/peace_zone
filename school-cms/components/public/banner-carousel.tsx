"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[activeIndex];
  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + banners.length) % banners.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-slate-950" aria-label="School highlights">
      <div className="relative min-h-[27rem] sm:min-h-[34rem]">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((item, index) => (
            <div key={item._id} className="relative h-full min-w-full" aria-hidden={index !== activeIndex}>
              <Image src={item.image} alt={item.title} fill priority={index === 0} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-950/10" />
            </div>
          ))}
        </div>
        <div className="container relative flex min-h-[27rem] items-end pb-16 sm:min-h-[34rem] sm:items-center sm:pb-0">
          <div className="max-w-2xl text-white" key={banner._id}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Peace Zone Academy</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-6xl">{banner.title}</h1>
            {banner.subtitle ? <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{banner.subtitle}</p> : null}
            {banner.buttonLabel && banner.buttonHref ? (
              <Button asChild className="mt-7 bg-amber-400 text-slate-950 hover:bg-amber-300">
                <Link href={banner.buttonHref}>{banner.buttonLabel}<ArrowRight /></Link>
              </Button>
            ) : null}
          </div>
        </div>
        {banners.length > 1 ? (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 sm:right-10">
            <Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous banner" className="border-white/40 bg-black/20 text-white hover:bg-white hover:text-slate-950">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1.5 px-2" aria-label="Banner slides">
              {banners.map((item, index) => (
                <button key={item._id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show banner ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-amber-300" : "w-2 bg-white/60"}`} />
              ))}
            </div>
            <Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label="Next banner" className="border-white/40 bg-black/20 text-white hover:bg-white hover:text-slate-950">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

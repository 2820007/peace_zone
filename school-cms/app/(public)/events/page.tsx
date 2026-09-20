import { CalendarDays, Clock3, MapPin, Video } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedEvents } from "@/lib/queries";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming events and news from ${SITE_CONFIG.name}.`,
};

function isYouTubeUrl(value: string) {
  return /(?:youtube(?:-nocookie)?\.com|youtu\.be)/i.test(value);
}

function getYouTubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const videoId = url.hostname.includes("youtu.be") ? url.pathname.slice(1) : url.searchParams.get("v") || url.pathname.split("/").pop();
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

function EventDate({ date }: { date: string | Date }) {
  const value = new Date(date);
  return <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-accent text-center text-primary shadow-lg"><span className="text-xl font-bold leading-none">{new Intl.DateTimeFormat("en", { day: "2-digit" }).format(value)}</span><span className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em]">{new Intl.DateTimeFormat("en", { month: "short" }).format(value)}</span></div>;
}

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary">
        <Image src={SCHOOL_IMAGES.eventsHero} alt="Students at a school event" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(8,24,53,0.96),rgba(8,24,53,0.78),rgba(8,24,53,0.38))]" />
        <div className="container flex min-h-[22rem] items-end py-14 sm:min-h-[28rem] sm:py-20">
          <div className="max-w-3xl text-white">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent"><span className="h-px w-8 bg-accent" />Campus calendar</p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-6xl">Events that bring our <span className="text-accent">community together.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">Discover the activities, celebrations, and learning experiences happening at {SITE_CONFIG.name}.</p>
          </div>
        </div>
      </section>

      <main className="bg-slate-50 py-14 sm:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">What’s happening</p><h2 className="mt-2 font-serif text-3xl font-semibold text-primary sm:text-4xl">Published events</h2></div>
            {events.length > 0 ? <p className="text-sm text-muted-foreground">{events.length} {events.length === 1 ? "event" : "events"} to explore</p> : null}
          </div>

          {events.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white px-6 py-16 text-center shadow-sm"><CalendarDays className="mx-auto h-10 w-10 text-accent" /><h2 className="mt-5 font-serif text-2xl font-semibold text-primary">New events are on the way</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Please check back soon for the latest school activities and announcements.</p></div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event: any) => {
                const youtubeEmbed = event.image && (event.mediaType === "youtube" || isYouTubeUrl(event.image)) ? getYouTubeEmbedUrl(event.image) : null;
                return <article key={event._id} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-primary/10">
                    {youtubeEmbed ? <iframe src={youtubeEmbed} title={event.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : event.image && event.mediaType === "video" ? <video src={event.image} controls preload="metadata" className="h-full w-full object-cover" /> : event.image ? <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,hsl(var(--primary)),#1e3a6d)]"><Video className="h-10 w-10 text-white/80" /></div>}
                    <div className="absolute left-5 top-5"><EventDate date={event.startDate} /></div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent"><Clock3 className="h-3.5 w-3.5" />{new Intl.DateTimeFormat("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date(event.startDate))}</div>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-primary">{event.title}</h3>
                    {event.description ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{event.description}</p> : null}
                    {event.location ? <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-medium text-primary"><MapPin className="h-4 w-4 shrink-0 text-accent" />{event.location}</div> : null}
                  </div>
                </article>;
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

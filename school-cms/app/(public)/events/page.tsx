import Image from "next/image";
import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/public/shared";
import { getPublishedEvents } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming events and news from ${SITE_CONFIG.name}.`,
};

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <>
      <div className="relative h-56 w-full">
        <Image src={SCHOOL_IMAGES.eventsHero} alt="School events" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center bg-primary/70">
          <div className="container">
            <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Events &amp; News
            </h1>
          </div>
        </div>
      </div>

      <section className="container py-16">
        {events.length === 0 ? (
          <p className="text-center text-muted-foreground">No upcoming events at this time.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => (
              <Card key={event._id} className="overflow-hidden">
                {event.image ? (
                  <div className="relative aspect-video w-full">
                    {event.mediaType === "youtube" ? (
                      <iframe src={event.image} title={event.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    ) : event.mediaType === "video" ? (
                      <video src={event.image} controls preload="metadata" className="h-full w-full object-cover" />
                    ) : (
                      <Image src={event.image} alt={event.title} fill className="object-cover" />
                    )}
                  </div>
                ) : null}
                <CardContent className="p-6">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <CalendarDays className="h-4 w-4" /> {formatDate(event.startDate)}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold">{event.title}</h3>
                  {event.location ? (
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {event.location}
                    </p>
                  ) : null}
                  {event.description ? (
                    <p className="mt-3 text-sm text-muted-foreground">{event.description}</p>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

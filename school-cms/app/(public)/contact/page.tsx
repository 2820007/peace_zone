import Image from "next/image";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/public/contact-form";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_CONFIG.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <div className="relative h-56 w-full">
        <Image src={SCHOOL_IMAGES.contactHero} alt="Contact us" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center bg-primary/70">
          <div className="container">
            <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">Contact Us</h1>
          </div>
        </div>
      </div>

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <Card>
              <CardContent className="flex gap-3 p-5">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{SITE_CONFIG.address}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-3 p-5">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{SITE_CONFIG.phone}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-3 p-5">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{SITE_CONFIG.email}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-3 p-5">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Office Hours</p>
                  <p className="text-sm text-muted-foreground">Contact the academy for office hours.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <CardContent className="p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold">Send Us a Message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We usually respond within one business day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

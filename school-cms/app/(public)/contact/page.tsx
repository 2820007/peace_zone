import Image from "next/image";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/public/contact-form";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_CONFIG.name}.`,
};

const phoneHref = `tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`;

const contactDetails = [
  { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
  { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: phoneHref },
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: Clock, label: "Office Hours", value: "Contact the academy for office hours." },
];

export default function ContactPage() {
  const mapAddress = "2V6Q+R64, Birgunj, Madhesh Province 44400";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;

  return (
    <>
      <div className="relative h-56 w-full">
        <Image src={SCHOOL_IMAGES.contactHero} alt="Contact us" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 flex items-center bg-black/50">
          <div className="container">
            <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Contact <span className="text-accent">Us</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="container py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map(({ icon: Icon, label, value, href }) => (
            <Card key={label} className="border-primary/10 shadow-sm">
              <CardContent className="flex gap-3 p-5">
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 inline-block text-sm text-muted-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="min-h-[400px] overflow-hidden rounded-2xl border border-primary/10 bg-secondary/30 shadow-sm lg:min-h-[520px]">
            <iframe
              title={`${SITE_CONFIG.name} location map`}
              src={mapUrl}
              className="h-full min-h-[400px] w-full border-0 lg:min-h-[520px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <Card className="border-primary/10 shadow-sm">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.10em] ">Get in touch</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-primary sm:text-4xl">
                Send Us a <span className="text-accent">Message</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">We usually respond within one business day.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/public/shared";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about the mission, values, and history of ${SITE_CONFIG.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="relative h-72 w-full">
          <Image src={SCHOOL_IMAGES.aboutHero} alt="About our school" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container">
          <div className="-mt-20 rounded-lg bg-background p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">About Us</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Our Story, Mission &amp; Values
            </h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Founded in {SITE_CONFIG.foundedYear}, {SITE_CONFIG.name} was built on a simple
              belief: every student deserves an education that challenges their mind and
              nurtures their character. Today we serve students from kindergarten through
              grade twelve with a curriculum that blends academic rigor, creativity, and
              community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                To inspire a lifelong love of learning while equipping students with the
                skills, values, and confidence to succeed in a changing world.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-semibold">Our Vision</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A community where curiosity is celebrated, differences are valued, and every
                student is empowered to reach their full potential.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-semibold">Our Values</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Integrity, curiosity, respect, and resilience guide everything we do — in the
                classroom and beyond it.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading center={false} eyebrow="Leadership" title="A message from our Principal" />
            <p className="mt-4 text-muted-foreground">
              &ldquo;Every child who walks through our doors brings a unique spark. Our job is
              to nurture that spark — through excellent teaching, a supportive community, and
              high expectations for every student. Thank you for considering {SITE_CONFIG.shortName}{" "}
              for your family.&rdquo;
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full sm:w-72">
            <Image src={SCHOOL_IMAGES.principal} alt="Principal" fill className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}

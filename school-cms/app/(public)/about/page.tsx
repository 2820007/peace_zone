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
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[420px] w-full sm:h-[500px]">
          <Image
            src={SCHOOL_IMAGES.aboutHero}
            alt="About our school"
            fill
            priority
            className="object-cover"
          />

          {/* Main Overlay - BLACK SHADOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

          {/* Floating Background Elements */}
          <div className="absolute left-[8%] top-[18%] h-20 w-20 rounded-full bg-white/10 blur-sm animate-float-slow" />

          <div className="absolute right-[12%] top-[20%] h-28 w-28 rounded-full bg-accent/20 blur-xl animate-float-medium" />

          <div className="absolute bottom-[15%] right-[25%] h-12 w-12 rounded-full bg-white/10 animate-float-fast" />

          {/* Hero Content */}
          <div className="container relative flex h-full items-center">
            <div className="max-w-3xl text-white">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Discover Our Story
              </div>

              {/* Heading */}
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Building Bright Futures,
                <span className="block text-accent">
                  One Student at a Time.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Discover the story, people, values, and vision behind{" "}
                {SITE_CONFIG.name} — a community committed to helping every
                student learn, grow, and thrive.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            FLOATING ABOUT CARD
        ========================================================= */}
        <div className="container relative z-10">
          <div className="relative -mt-20 overflow-hidden rounded-[2rem] border border-white/30 bg-background/95 p-7 shadow-2xl backdrop-blur-xl sm:-mt-24 sm:p-10">
            {/* Decorative Glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              {/* Text */}
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  About Us
                </p>

                <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                  Our Story, Mission &amp; Values
                </h2>

                <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                  {SITE_CONFIG.name} is affiliated with Nepal's National
                  Examinations Board and offers +2 education in Science,
                  Management, and Law. The academy is committed to helping
                  students build strong academic foundations, practical skills,
                  and confidence for the next stage of their education.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group rounded-2xl bg-primary p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <p className="text-3xl font-bold">+2</p>

                  <p className="mt-1 text-sm text-white/70">
                    Education with purpose
                  </p>
                </div>

                <div className="group rounded-2xl bg-secondary p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <p className="text-3xl font-bold text-primary">K–12</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION / VISION / VALUES
      ========================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative">
          {/* Section Heading */}
          <SectionHeading
            eyebrow="What guides us"
            title="Purpose behind every lesson"
            description="Our school community is built around a shared commitment to meaningful learning, personal growth, and a brighter future."
          />

          {/* Cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* =====================================================
                MISSION CARD
            ===================================================== */}
            <Card className="group relative overflow-hidden rounded-[1.75rem] border-0 bg-primary text-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              {/* Background Circle */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />

              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  ✦
                </div>

                {/* Number */}
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  01
                </p>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold">
                  Our Mission
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-white/75">
                  To inspire a lifelong love of learning while equipping
                  students with the skills, values, and confidence to succeed
                  in a changing world.
                </p>

                {/* Bottom Line */}
                <div className="mt-8 h-1 w-12 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
              </CardContent>
            </Card>

            {/* =====================================================
                VISION CARD
            ===================================================== */}
            <Card className="group relative overflow-hidden rounded-[1.75rem] border bg-background shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-primary/20 hover:shadow-2xl">
              {/* Background Circle */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  ◇
                </div>

                {/* Number */}
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  02
                </p>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold">
                  Our Vision
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-muted-foreground">
                  A community where curiosity is celebrated, differences are
                  valued, and every student is empowered to reach their full
                  potential.
                </p>

                {/* Bottom Line */}
                <div className="mt-8 h-1 w-12 rounded-full bg-primary transition-all duration-500 group-hover:w-24" />
              </CardContent>
            </Card>

            {/* =====================================================
                VALUES CARD
            ===================================================== */}
            <Card className="group relative overflow-hidden rounded-[1.75rem] border bg-background shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-accent/30 hover:shadow-2xl">
              {/* Background Circle */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 transition-transform duration-500 group-hover:scale-150" />

              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-2xl text-accent transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  ♢
                </div>

                {/* Number */}
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  03
                </p>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold">
                  Our Values
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-muted-foreground">
                  Integrity, curiosity, respect, and resilience guide
                  everything we do — in the classroom and beyond it.
                </p>

                {/* Bottom Line */}
                <div className="mt-8 h-1 w-12 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPAL SECTION
      ========================================================= */}
      <section className="relative overflow-hidden bg-secondary/40 py-20 sm:py-28">
        {/* Floating Background Elements */}
        <div className="absolute left-[5%] top-[15%] h-24 w-24 rounded-full bg-primary/10 blur-xl animate-float-medium" />

        <div className="absolute bottom-[10%] right-[8%] h-32 w-32 rounded-full bg-accent/10 blur-2xl animate-float-slow" />

        <div className="container relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* =====================================================
              PRINCIPAL IMAGE
          ===================================================== */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Floating Accent Shape */}
            <div className="absolute -left-5 top-12 z-10 h-20 w-20 rounded-2xl bg-accent shadow-xl animate-float-fast" />

            {/* Image Frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-background bg-primary shadow-2xl">
              <Image
                src={SCHOOL_IMAGES.principal}
                alt="Principal"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

              {/* Image Label */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/20 p-5 text-white backdrop-blur-md">
                <p className="text-sm font-medium text-white/70">
                  Leadership
                </p>

                <p className="mt-1 text-xl font-bold">
                  Inspiring the next generation
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-5 -right-5 rounded-2xl border border-border bg-background px-6 py-4 shadow-xl animate-float-slow">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Education
              </p>

              <p className="mt-1 font-serif text-lg font-bold text-primary">
                With purpose
              </p>
            </div>
          </div>

          {/* =====================================================
              PRINCIPAL MESSAGE
          ===================================================== */}
          <div>
            <SectionHeading
              center={false}
              eyebrow="Leadership"
              title="A message from our Principal"
            />

            {/* Quote */}
            <div className="relative mt-8">
              <span className="absolute -left-5 -top-8 font-serif text-7xl leading-none text-primary/10">
                “
              </span>

              <p className="relative max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                &ldquo;Every child who walks through our doors brings a unique
                spark. Our job is to nurture that spark — through excellent
                teaching, a supportive community, and high expectations for
                every student. Thank you for considering{" "}
                {SITE_CONFIG.shortName} for your family.&rdquo;
              </p>
            </div>

            {/* Principal Signature */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />

              <div>
                <p className="font-serif text-lg font-bold">
                  School Principal
                </p>

                <p className="text-sm text-muted-foreground">
                  {SITE_CONFIG.shortName}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border bg-background/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-2xl font-bold text-primary">01</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Student First
                </p>
              </div>

              <div className="rounded-2xl border bg-background/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-2xl font-bold text-primary">02</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Strong Values
                </p>
              </div>

              <div className="rounded-2xl border bg-background/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-2xl font-bold text-primary">03</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Future Ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
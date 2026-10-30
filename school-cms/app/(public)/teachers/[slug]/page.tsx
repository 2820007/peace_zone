import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPublishedTeacherBySlug } from "@/lib/queries";
import { SCHOOL_IMAGES } from "@/config/site";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teacher = await getPublishedTeacherBySlug(params.slug);
  if (!teacher) return { title: "Teacher Not Found" };

  return {
    title: teacher.name,
    description: `${teacher.name} — ${teacher.designation}${
      teacher.department ? ` in the ${teacher.department} department` : ""
    }.`,
    openGraph: {
      title: teacher.name,
      description: teacher.designation,
      images: teacher.image ? [teacher.image] : undefined,
    },
  };
}

export default async function TeacherProfilePage({ params }: Props) {
  const teacher: any = await getPublishedTeacherBySlug(params.slug);
  if (!teacher) notFound();

  return (
    <main className="bg-background pb-20">
      <section className="relative isolate overflow-hidden bg-primary">
        <Image
          src={SCHOOL_IMAGES.teachersHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="container relative py-12 sm:py-16 lg:py-20">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all teachers
          </Link>
          <div className="mt-10 max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-9 bg-accent" /> Faculty profile
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Meet {teacher.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Learn more about the educator helping Peace Zone students grow with confidence and purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="container relative -mt-8 sm:-mt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(260px,360px)_1fr] lg:gap-12">
          <aside className="h-fit rounded-2xl border border-border/70 bg-card p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
              <Image
                src={teacher.image || SCHOOL_IMAGES.defaultAvatar}
                alt={teacher.name}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
            </div>

            <div className="px-3 pb-3 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Connect</p>
              <div className="mt-4 space-y-3 text-sm">
                {teacher.email && (
                  <a href={`mailto:${teacher.email}`} className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="break-all">{teacher.email}</span>
                  </a>
                )}
                {teacher.phone && (
                  <a href={`tel:${teacher.phone}`} className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary">
                    <Phone className="h-4 w-4 shrink-0 text-accent" /> {teacher.phone}
                  </a>
                )}
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" /> Peace Zone Academy
                </p>
              </div>

              <div className="mt-5 flex gap-2 border-t border-border pt-4">
                {[
                  [teacher.socialLinks?.linkedin, Linkedin, "LinkedIn"],
                  [teacher.socialLinks?.twitter, Twitter, "Twitter"],
                  [teacher.socialLinks?.website, Globe, "Website"],
                ].map(([href, Icon, label]) => href ? (
                  <a
                    key={label as string}
                    href={href as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label as string}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null)}
              </div>
            </div>
          </aside>

          <article className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-9 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              {teacher.department ? <Badge className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground hover:bg-secondary">{teacher.department}</Badge> : null}
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Peace Zone Faculty</span>
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold text-primary sm:text-4xl">{teacher.name}</h2>
            <p className="mt-2 text-lg font-semibold text-accent">{teacher.designation}</p>
            {teacher.qualification ? <p className="mt-2 text-sm text-muted-foreground">{teacher.qualification}</p> : null}

            <div className="my-8 h-px bg-border" />
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" /> About the teacher
            </div>
            {teacher.bio ? (
              <div className="mt-5 whitespace-pre-line text-base leading-8 text-muted-foreground">{teacher.bio}</div>
            ) : (
              <p className="mt-5 text-muted-foreground">No biography has been added yet.</p>
            )}

            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-accent">
              Connect with the academy <ExternalLink className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}

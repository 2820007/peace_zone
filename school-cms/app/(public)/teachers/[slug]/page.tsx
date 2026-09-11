import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mail, Phone, Linkedin, Twitter, Globe, ArrowLeft } from "lucide-react";
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
    <section className="container py-16">
      <Link href="/teachers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to all teachers
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
            <Image
              src={teacher.image || SCHOOL_IMAGES.defaultAvatar}
              alt={teacher.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-6 space-y-2 text-sm">
            {teacher.email && (
              <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" /> {teacher.email}
              </a>
            )}
            {teacher.phone && (
              <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" /> {teacher.phone}
              </a>
            )}
            <div className="flex gap-3 pt-2">
              {teacher.socialLinks?.linkedin && (
                <a href={teacher.socialLinks.linkedin} className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {teacher.socialLinks?.twitter && (
                <a href={teacher.socialLinks.twitter} className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {teacher.socialLinks?.website && (
                <a href={teacher.socialLinks.website} className="text-muted-foreground hover:text-primary">
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {teacher.department ? <Badge variant="secondary">{teacher.department}</Badge> : null}
          <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">{teacher.name}</h1>
          <p className="mt-1 text-lg text-primary">{teacher.designation}</p>
          {teacher.qualification ? (
            <p className="mt-1 text-sm text-muted-foreground">{teacher.qualification}</p>
          ) : null}

          {teacher.bio ? (
            <div className="mt-6 whitespace-pre-line leading-relaxed text-muted-foreground">
              {teacher.bio}
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground">No biography has been added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

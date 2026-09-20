import { SectionHeading, TeacherCard } from "@/components/public/shared";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedTeachers } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Teachers",
  description: `Meet the dedicated faculty of ${SITE_CONFIG.name}.`,
};

const levelTitles: Record<string, string> = {
  secondary: "Secondary",
  higher_secondary: "Higher Secondary (+2)",
};

export default async function TeachersPage({
  searchParams,
}: {
  searchParams?: { level?: string };
}) {
  const selectedLevel = searchParams?.level;
  const validLevel = selectedLevel === "secondary" || selectedLevel === "higher_secondary"
    ? selectedLevel
    : null;
  const teachers = await getPublishedTeachers(validLevel ?? undefined);

  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Our Faculty"
        title={
          validLevel ? (
            <>{levelTitles[validLevel]} <span className="text-accent">Faculty</span></>
          ) : (
            <>Meet Our <span className="text-accent">Teachers</span></>
          )
        }
        description="Dedicated educators committed to helping every student succeed."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/teachers"
          className={`rounded-full border px-4 py-2 text-sm font-medium ${!validLevel ? "border-primary bg-primary text-white" : "border-border text-foreground"}`}
        >
          All Teachers
        </Link>
        <Link
          href="/teachers?level=secondary"
          className={`rounded-full border px-4 py-2 text-sm font-medium ${validLevel === "secondary" ? "border-primary bg-primary text-white" : "border-border text-foreground"}`}
        >
          Secondary
        </Link>
        <Link
          href="/teachers?level=higher_secondary"
          className={`rounded-full border px-4 py-2 text-sm font-medium ${validLevel === "higher_secondary" ? "border-primary bg-primary text-white" : "border-border text-foreground"}`}
        >
          Higher Secondary (+2)
        </Link>
      </div>

      {teachers.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Teacher profiles will be published here soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher: any) => (
            <TeacherCard key={teacher._id} teacher={teacher} />
          ))}
        </div>
      )}
    </section>
  );
}

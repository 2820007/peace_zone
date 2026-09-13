import { SectionHeading, TeacherCard } from "@/components/public/shared";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedTeachers } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Teachers",
  description: `Meet the dedicated faculty of ${SITE_CONFIG.name}.`,
};

export default async function TeachersPage() {
  const teachers = await getPublishedTeachers();

  return (
    <section className="container py-16">
      <SectionHeading eyebrow="Our Faculty" title="Meet Our Teachers" description="Dedicated educators committed to helping every student succeed." />

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

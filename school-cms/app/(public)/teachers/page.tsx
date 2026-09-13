import { PageHero, SectionHeading, TeacherCard } from "@/components/public/shared";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";
import { getPublishedTeachers } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Teachers",
  description: `Meet the dedicated faculty of ${SITE_CONFIG.name}.`,
};

export default async function TeachersPage() {
  const teachers = await getPublishedTeachers();

  return (
    <>
      <PageHero
        eyebrow="The people behind the progress"
        title="Meet the educators who make learning personal"
        description="Experienced, caring teachers who know their students well and create the conditions for every learner to thrive."
        image={SCHOOL_IMAGES.teachersHero}
      />
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Our faculty" title="Expertise with heart" description="Our teachers bring deep subject knowledge, joyful energy, and a shared commitment to helping every student find their strengths." />

        {teachers.length === 0 ? <p className="mt-12 text-center text-muted-foreground">Teacher profiles will be published here soon.</p> : <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{teachers.map((teacher: any) => <TeacherCard key={teacher._id} teacher={teacher} />)}</div>}
      </section>
    </>
  );
}

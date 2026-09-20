import { Button } from "@/components/ui/button";
import { SectionHeading, TeacherCard } from "@/components/public/shared";
import { getFeaturedTeachers } from "@/lib/queries";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function MyTeachers() {
  const teachers = await getFeaturedTeachers(4);

  if (!teachers.length) {
    return null;
  }

  return (
    <section className="relative mt-2 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0f9ff_100%)] py-10 sm:mt-3 sm:py-12 lg:mt-4 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-28 h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_0_7px_rgba(125,211,252,0.2)]" />
      <div className="pointer-events-none absolute bottom-20 right-[7%] h-36 w-36 rounded-full border-[18px] border-sky-100/70" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Meet our educators"
          title={
            <>
              Mentors who make learning <span className="text-accent">personal</span>
            </>
          }
          description="Our teachers bring expertise, empathy, and a deep belief in what every learner can achieve."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {teachers.map((teacher: any) => (
            <TeacherCard key={teacher._id} teacher={teacher} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group rounded-full bg-primary px-7 text-white shadow-[0_10px_28px_rgba(14,165,233,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-[0_16px_35px_rgba(14,165,233,0.26)]"
          >
            <Link href="/teachers">
              See more teachers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

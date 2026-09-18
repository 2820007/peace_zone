"use client";

import Image from "next/image";

interface TeacherCardProps {
  teacher: {
    _id: string;
    name: string;
    image?: string;
    designation?: string;
    subject?: string;
  };
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={teacher.image || "/placeholder-teacher.jpg"}
          alt={teacher.name || "Teacher"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Teacher Information */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-white/70">
            {teacher.designation || "Educator"}
          </p>

          <h3 className="text-2xl font-bold">
            {teacher.name}
          </h3>

          {teacher.subject && (
            <p className="mt-1 text-sm text-white/80">
              {teacher.subject}
            </p>
          )}
        </div>

        {/* Hover Button */}
        <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-[-10px] items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          →
        </div>
      </div>
    </div>
  );
}
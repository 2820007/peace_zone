import { notFound } from "next/navigation";
import { TeacherForm } from "@/components/admin/teacher-form";
import { updateTeacherAction } from "@/actions/teachers";
import { getTeacherById } from "@/lib/queries";

export const metadata = { title: "Edit Teacher" };

interface Props {
  params: { id: string };
}

export default async function EditTeacherPage({ params }: Props) {
  const teacher: any = await getTeacherById(params.id);
  if (!teacher) notFound();

  const boundAction = updateTeacherAction.bind(null, params.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Teacher</h1>
        <p className="text-sm text-muted-foreground">Update {teacher.name}&apos;s profile.</p>
      </div>
      <TeacherForm
        action={boundAction}
        submitLabel="Save Changes"
        defaultValues={{
          name: teacher.name,
          slug: teacher.slug,
          designation: teacher.designation,
          qualification: teacher.qualification || "",
          department: teacher.department || "",
          bio: teacher.bio || "",
          image: teacher.image || "",
          email: teacher.email || "",
          phone: teacher.phone || "",
          linkedin: teacher.socialLinks?.linkedin || "",
          twitter: teacher.socialLinks?.twitter || "",
          website: teacher.socialLinks?.website || "",
          displayOrder: teacher.displayOrder,
          published: teacher.published,
        }}
      />
    </div>
  );
}

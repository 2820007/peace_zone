import { TeacherForm } from "@/components/admin/teacher-form";
import { createTeacherAction } from "@/actions/teachers";

export const metadata = { title: "Add Teacher" };

export default function CreateTeacherPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add Teacher</h1>
        <p className="text-sm text-muted-foreground">Create a new faculty profile.</p>
      </div>
      <TeacherForm action={createTeacherAction} submitLabel="Create Teacher" />
    </div>
  );
}

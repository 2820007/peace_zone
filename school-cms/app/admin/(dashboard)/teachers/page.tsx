import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeachersTable } from "@/components/admin/teachers-table";
import { getAllTeachers } from "@/lib/queries";

export const metadata = { title: "Teachers" };

export default async function AdminTeachersPage() {
  const teachers = await getAllTeachers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Teachers</h1>
          <p className="text-sm text-muted-foreground">Manage faculty profiles shown on the public site.</p>
        </div>
        <Button asChild>
          <Link href="/admin/teachers/create">
            <Plus className="h-4 w-4" /> Add Teacher
          </Link>
        </Button>
      </div>

      <TeachersTable teachers={teachers as any} />
    </div>
  );
}

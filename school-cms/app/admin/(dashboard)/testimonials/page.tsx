import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialsTable } from "@/components/admin/testimonials-table";
import { getAllTestimonials } from "@/lib/queries";

export const metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage reviews shown on the public site.</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/create">
            <Plus className="h-4 w-4" /> Add Testimonial
          </Link>
        </Button>
      </div>

      <TestimonialsTable testimonials={testimonials as any} />
    </div>
  );
}

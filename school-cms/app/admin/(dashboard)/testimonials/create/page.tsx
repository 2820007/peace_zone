import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonialAction } from "@/actions/testimonials";

export const metadata = { title: "Add Testimonial" };

export default function CreateTestimonialPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add Testimonial</h1>
        <p className="text-sm text-muted-foreground">Create a new testimonial.</p>
      </div>
      <TestimonialForm action={createTestimonialAction} submitLabel="Create Testimonial" />
    </div>
  );
}

import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { updateTestimonialAction } from "@/actions/testimonials";
import { getTestimonialById } from "@/lib/queries";

export const metadata = { title: "Edit Testimonial" };

interface Props {
  params: { id: string };
}

export default async function EditTestimonialPage({ params }: Props) {
  const testimonial: any = await getTestimonialById(params.id);
  if (!testimonial) notFound();

  const boundAction = updateTestimonialAction.bind(null, params.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Testimonial</h1>
        <p className="text-sm text-muted-foreground">Update this testimonial.</p>
      </div>
      <TestimonialForm
        action={boundAction}
        submitLabel="Save Changes"
        defaultValues={{
          name: testimonial.name,
          role: testimonial.role || "",
          message: testimonial.message,
          image: testimonial.image || "",
          rating: testimonial.rating,
          displayOrder: testimonial.displayOrder,
          published: testimonial.published,
        }}
      />
    </div>
  );
}

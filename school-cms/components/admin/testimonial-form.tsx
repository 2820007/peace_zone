"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations/testimonial";
import type { FormActionState } from "@/actions/teachers";

interface TestimonialFormProps {
  defaultValues?: Partial<TestimonialInput>;
  action: (prevState: FormActionState, formData: FormData) => Promise<FormActionState>;
  submitLabel: string;
}

export function TestimonialForm({ defaultValues, action, submitLabel }: TestimonialFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      published: false,
      displayOrder: 0,
      rating: 5,
      ...defaultValues,
    },
  });

  const published = watch("published");
  const rating = watch("rating");

  async function onSubmit(values: TestimonialInput) {
    setServerError(undefined);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.set(key, value === undefined || value === null ? "" : String(value));
    });

    const result = await action({}, formData);

    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof TestimonialInput, { message });
      });
      return;
    }
    if (result.error) {
      setServerError(result.error);
      return;
    }
    if (result.success) {
      toast.success(`Testimonial ${defaultValues ? "updated" : "created"} successfully.`);
      router.push("/admin/testimonials");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Parent of a 5th grader" {...register("role")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Photo URL</Label>
            <Input id="image" placeholder="https://..." {...register("image")} />
            {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select value={String(rating)} onValueChange={(v) => setValue("rating", Number(v))}>
              <SelectTrigger id="rating">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} star{n > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={4} {...register("message")} />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input id="displayOrder" type="number" className="w-32" {...register("displayOrder")} />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="published" checked={published} onCheckedChange={(c) => setValue("published", c)} />
            <Label htmlFor="published" className="cursor-pointer">
              {published ? "Published" : "Draft (not visible on site)"}
            </Label>
          </div>
        </CardContent>
      </Card>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/testimonials")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

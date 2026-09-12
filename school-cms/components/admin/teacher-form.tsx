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
import { teacherSchema, type TeacherInput } from "@/lib/validations/teacher";
import { slugify } from "@/lib/utils";
import type { FormActionState } from "@/actions/teachers";

interface TeacherFormProps {
  defaultValues?: Partial<TeacherInput>;
  action: (prevState: FormActionState, formData: FormData) => Promise<FormActionState>;
  submitLabel: string;
}

export function TeacherForm({ defaultValues, action, submitLabel }: TeacherFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | undefined>();
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.slug));
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TeacherInput>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      published: true,
      displayOrder: 0,
      ...defaultValues,
    },
  });

  const published = watch("published");

  async function onSubmit(values: TeacherInput) {
    setServerError(undefined);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.set(key, value === undefined || value === null ? "" : String(value));
    });
    if (imageFile) formData.set("image", imageFile);

    const result = await action({}, formData);

    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof TeacherInput, { message });
      });
      return;
    }
    if (result.error) {
      setServerError(result.error);
      return;
    }
    if (result.success) {
      toast.success(`Teacher ${defaultValues ? "updated" : "created"} successfully.`);
      router.push("/admin/teachers");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name")}
              onChange={(e) => {
                register("name").onChange(e);
                if (!slugTouched) setValue("slug", slugify(e.target.value));
              }}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              onChange={(e) => {
                setSlugTouched(true);
                register("slug").onChange(e);
              }}
            />
            <p className="text-xs text-muted-foreground">Public URL: /teachers/{watch("slug") || "..."}</p>
            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" placeholder="Mathematics Teacher" {...register("designation")} />
            {errors.designation && <p className="text-sm text-destructive">{errors.designation.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="Mathematics" {...register("department")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input id="qualification" placeholder="M.Sc. Mathematics" {...register("qualification")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Photo</Label>
            <Input id="image" type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
            <p className="text-xs text-muted-foreground">{defaultValues?.image ? "Leave blank to keep the current photo." : "PNG, JPEG, WebP, or GIF; maximum 5 MB."}</p>
            {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea id="bio" rows={5} {...register("bio")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-5 p-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input id="linkedin" placeholder="https://linkedin.com/in/..." {...register("linkedin")} />
            {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter / X URL</Label>
            <Input id="twitter" placeholder="https://x.com/..." {...register("twitter")} />
            {errors.twitter && <p className="text-sm text-destructive">{errors.twitter.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input id="website" placeholder="https://..." {...register("website")} />
            {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input id="displayOrder" type="number" className="w-32" {...register("displayOrder")} />
            <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={(checked) => setValue("published", checked)}
            />
            <Label htmlFor="published" className="cursor-pointer">
              {published ? "Published" : "Draft (not visible on site)"}
            </Label>
          </div>
        </CardContent>
      </Card>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/teachers")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

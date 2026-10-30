"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CERTIFICATE_TEMPLATE_OPTIONS, CERTIFICATE_TYPE_OPTIONS, getDefaultCertificateIssueDate } from "@/lib/certificates";
import { toast } from "sonner";

interface CertificateFormProps {
  defaultValues?: Partial<{
    _id: string;
    studentName: string;
    studentId: string;
    certificateType: string;
    title: string;
    description: string;
    program: string;
    course: string;
    issueDate: string;
    template: string;
    principalName: string;
    principalSignature: string;
    coordinatorName: string;
    coordinatorSignature: string;
    status: string;
  }>;
  action: (prevState: any, formData: FormData) => Promise<any>;
  submitLabel: string;
}

export function CertificateForm({ defaultValues, action, submitLabel }: CertificateFormProps) {
  const router = useRouter();
  const [state, setState] = useState<{ success?: boolean; error?: string; fieldErrors?: Record<string, string> }>({ success: false });
  const [isPending, setIsPending] = useState(false);
  const [formState, setFormState] = useState({
    studentName: defaultValues?.studentName ?? "",
    studentId: defaultValues?.studentId ?? "",
    certificateType: defaultValues?.certificateType ?? "Achievement",
    title: defaultValues?.title ?? "Certificate of Achievement",
    description: defaultValues?.description ?? "This certificate is awarded in recognition of outstanding performance and dedication.",
    program: defaultValues?.program ?? "Secondary School",
    course: defaultValues?.course ?? "Academic Excellence",
    issueDate: defaultValues?.issueDate ?? getDefaultCertificateIssueDate(),
    template: defaultValues?.template ?? "classic",
    principalName: defaultValues?.principalName ?? "Principal",
    principalSignature: defaultValues?.principalSignature ?? "",
    coordinatorName: defaultValues?.coordinatorName ?? "Coordinator",
    coordinatorSignature: defaultValues?.coordinatorSignature ?? "",
    status: defaultValues?.status ?? "issued",
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(submitLabel.includes("Update") ? "Certificate updated successfully." : "Certificate created successfully.");
      router.push("/admin/certificates");
      router.refresh();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router, submitLabel]);

  const previewSignatureText = useMemo(
    () => `${formState.principalName || "Principal Name"} / ${formState.coordinatorName || "Coordinator Name"}`,
    [formState.coordinatorName, formState.principalName]
  );

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setState({ success: false });

    const formData = new FormData(event.currentTarget);
    Object.entries(formState).forEach(([key, value]) => {
      formData.set(key, value ?? "");
    });

    const result = await action({}, formData);
    setState(result);
    setIsPending(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Certificate Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input id="studentName" name="studentName" value={formState.studentName} onChange={(e) => handleChange("studentName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" name="studentId" value={formState.studentId} onChange={(e) => handleChange("studentId", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificateType">Certificate Type</Label>
              <Select name="certificateType" value={formState.certificateType} onValueChange={(value) => handleChange("certificateType", value)}>
                <SelectTrigger id="certificateType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {CERTIFICATE_TYPE_OPTIONS.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" value={formState.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Certificate Title</Label>
              <Input id="title" name="title" value={formState.title} onChange={(e) => handleChange("title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Input id="program" name="program" value={formState.program} onChange={(e) => handleChange("program", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input id="course" name="course" value={formState.course} onChange={(e) => handleChange("course", e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} value={formState.description} onChange={(e) => handleChange("description", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" name="issueDate" type="date" value={formState.issueDate} onChange={(e) => handleChange("issueDate", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select name="template" value={formState.template} onValueChange={(value) => handleChange("template", value)}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {CERTIFICATE_TEMPLATE_OPTIONS.map((type) => (
                    <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="principalName">Principal Name</Label>
              <Input id="principalName" name="principalName" value={formState.principalName} onChange={(e) => handleChange("principalName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordinatorName">Coordinator Name</Label>
              <Input id="coordinatorName" name="coordinatorName" value={formState.coordinatorName} onChange={(e) => handleChange("coordinatorName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="principalSignature">Principal Signature URL</Label>
              <Input id="principalSignature" name="principalSignature" value={formState.principalSignature} onChange={(e) => handleChange("principalSignature", e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordinatorSignature">Coordinator Signature URL</Label>
              <Input id="coordinatorSignature" name="coordinatorSignature" value={formState.coordinatorSignature} onChange={(e) => handleChange("coordinatorSignature", e.target.value)} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>

        {state?.fieldErrors && Object.keys(state.fieldErrors).length > 0 && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {Object.values(state.fieldErrors).map((message) => <p key={message}>{message}</p>)}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/certificates")}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : submitLabel}</Button>
        </div>
      </form>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border-2 border-primary/40 bg-gradient-to-br from-violet-50 to-white p-4 text-slate-800 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">PZ</div>
                <div>
                  <p className="text-lg font-bold text-primary">Peace Zone Academy</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Certificate</p>
                </div>
              </div>
              <div className="text-right text-[10px] uppercase tracking-[0.2em] text-slate-500">ID<br />{formState.studentId || "PZ-2026-000001"}</div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{formState.certificateType}</p>
              <h3 className="mt-3 text-2xl font-bold text-primary">{formState.title}</h3>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">This is to certify that</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{formState.studentName || "Student Name"}</p>
            </div>
            <p className="mt-4 text-center text-sm leading-6 text-slate-600">{formState.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="rounded-md bg-slate-50 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Program</p>
                <p className="mt-1 font-semibold">{formState.program}</p>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Course</p>
                <p className="mt-1 font-semibold">{formState.course}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border-t border-slate-300 pt-3 text-center text-xs text-slate-500">
                <p className="font-semibold text-slate-800">{formState.principalName || "Principal Name"}</p>
                <p>Principal</p>
              </div>
              <div className="border-t border-slate-300 pt-3 text-center text-xs text-slate-500">
                <p className="font-semibold text-slate-800">{formState.coordinatorName || "Coordinator Name"}</p>
                <p>Coordinator</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-dashed border-slate-300 pt-4 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span>Issued: {formState.issueDate || "2026-09-22"}</span>
              <span>{previewSignatureText}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

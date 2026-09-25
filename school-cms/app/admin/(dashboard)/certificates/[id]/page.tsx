import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificateForm } from "@/components/admin/certificate-form";
import { getCertificateById, updateCertificateAction } from "@/actions/certificates";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Certificate" };

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const certificate = await getCertificateById(id);
  if (!certificate) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Certificate</p>
          <h1 className="text-2xl font-semibold">Edit Certificate</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/certificates"><ArrowLeft className="h-4 w-4" /> Back to list</Link>
        </Button>
      </div>

      <CertificateForm defaultValues={{ ...certificate, issueDate: new Date(certificate.issueDate).toISOString().slice(0, 10) }} action={(state, formData) => updateCertificateAction(id, state, formData)} submitLabel="Update Certificate" />
    </div>
  );
}

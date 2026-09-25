import { CertificateForm } from "@/components/admin/certificate-form";
import { createCertificateAction } from "@/actions/certificates";

export const metadata = { title: "Create Certificate" };

export default function CreateCertificatePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Certificate</h1>
        <p className="text-sm text-muted-foreground">Generate a professional certificate for a student and preview it before issuing.</p>
      </div>
      <CertificateForm action={createCertificateAction} submitLabel="Create Certificate" />
    </div>
  );
}

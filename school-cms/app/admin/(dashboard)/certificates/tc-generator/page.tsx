import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificateGenerator } from "@/components/admin/certificate-generator";

export const metadata = { title: "TC Certificate Generator" };

export default function TransferCertificateGeneratorPage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/admin/certificates">
          <ArrowLeft className="h-4 w-4" /> Back to certificates
        </Link>
      </Button>
      <CertificateGenerator />
    </div>
  );
}

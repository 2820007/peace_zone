import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificatesTable } from "@/components/admin/certificate-manager";
import { connectToDatabase } from "@/lib/db/connect";
import Certificate from "@/models/Certificate";

export const metadata = { title: "Certificates" };

export default async function AdminCertificatesPage() {
  await connectToDatabase();
  const certificates = await Certificate.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Certificates</h1>
          <p className="text-sm text-muted-foreground">Create, preview, and manage student certificates.</p>
        </div>
        <Button asChild>
          <Link href="/admin/certificates/create">
            <Plus className="h-4 w-4" /> Create Certificate
          </Link>
        </Button>
      </div>

      <CertificatesTable certificates={JSON.parse(JSON.stringify(certificates))} />
    </div>
  );
}

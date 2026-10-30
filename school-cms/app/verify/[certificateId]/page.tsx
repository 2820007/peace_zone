import Link from "next/link";
import { Download, ShieldCheck, XCircle } from "lucide-react";
import { getCertificateByCertificateId } from "@/actions/certificates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/config/site";

export const metadata = { title: "Certificate Verification" };

export default async function VerifyCertificatePage({ params }: { params: { certificateId: string } }) {
  const { certificateId } = params;
  const certificate = await getCertificateByCertificateId(certificateId);

  if (!certificate) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <Card className="max-w-xl border-dashed border-destructive/30 bg-white">
          <CardContent className="p-8 text-center">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">Certificate Not Found</h1>
            <p className="mt-3 text-slate-600">This certificate ID could not be verified. Please check the code and try again.</p>
            <Button asChild className="mt-5"><Link href="/">Back to homepage</Link></Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const isValid = certificate.status !== "revoked";

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="overflow-hidden border-2 border-primary/20 bg-white">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b bg-primary/5 p-6 text-slate-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Certificate Verification</p>
                <h1 className="mt-2 text-3xl font-bold">{isValid ? "Certificate Verified" : "Certificate Revoked"}</h1>
              </div>
              <div className="rounded-full bg-white p-3 shadow-sm">
                <ShieldCheck className={`h-8 w-8 ${isValid ? "text-emerald-600" : "text-amber-600"}`} />
              </div>
            </div>
            <div className="grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <div className="rounded-lg border bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Certificate ID</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{certificate.certificateId}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Student</p>
                    <p className="mt-1 text-lg font-semibold">{certificate.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Student ID</p>
                    <p className="mt-1 text-lg font-semibold">{certificate.studentId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Certificate</p>
                    <p className="mt-1 text-lg font-semibold">{certificate.title}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Program</p>
                    <p className="mt-1 text-lg font-semibold">{certificate.program || "General Program"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Issue Date</p>
                    <p className="mt-1 text-lg font-semibold">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Issued By</p>
                    <p className="mt-1 text-lg font-semibold">{SITE_CONFIG.name}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Certificate status</p>
                  <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize ${isValid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {certificate.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={`/api/certificates/${certificate.certificateId}/pdf`} target="_blank" rel="noreferrer"> <Download className="mr-2 h-4 w-4" /> Download PDF </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">Back to homepage</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">QR Code</p>
                {certificate.qrCodeUrl ? (
                  <img src={certificate.qrCodeUrl} alt="Certificate verification QR code" className="mt-4 h-48 w-48 rounded-lg border bg-white p-3" />
                ) : (
                  <div className="mt-4 flex h-48 w-48 items-center justify-center rounded-lg border bg-white text-sm text-slate-500">QR Unavailable</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

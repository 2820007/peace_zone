"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { SITE_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";

type CertificateFields = {
  certificateNumber: string;
  schoolRegdNo: string;
  name: string;
  fatherName: string;
  motherName: string;
  address: string;
  dateOfBirth: string;
  symbolNumber: string;
  nebRegdNo: string;
  level: string;
  batch: string;
  progressReport: string;
  issueDate: string;
};

const FIELD_ROWS: { key: keyof CertificateFields; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "fatherName", label: "Father's Name" },
  { key: "motherName", label: "Mother's Name" },
  { key: "address", label: "Permanent Address" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "symbolNumber", label: "Symbol Number" },
  { key: "nebRegdNo", label: "NEB Regd. No." },
  { key: "level", label: "Level" },
  { key: "batch", label: "Batch" },
  { key: "progressReport", label: "Progress Report" },
];

const EMPTY_FIELDS: CertificateFields = {
  certificateNumber: "",
  schoolRegdNo: "",
  name: "",
  fatherName: "",
  motherName: "",
  address: "",
  dateOfBirth: "",
  symbolNumber: "",
  nebRegdNo: "",
  level: "",
  batch: "",
  progressReport: "",
  issueDate: "",
};

function formatDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function CertificateGenerator() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");

  function updateField(key: keyof CertificateFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function handlePhotoChange(file?: File) {
    setPhotoError("");
    setPhoto(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file for the student photo.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Photo must be 2 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setPhoto(reader.result);
      else setPhotoError("Could not read the selected photo.");
    };
    reader.onerror = () => setPhotoError("Could not read the selected photo.");
    reader.readAsDataURL(file);
  }

  function handlePrint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.print();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Student documents</p>
          <h1 className="mt-1 text-2xl font-semibold">TC Certificate Generator</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in the student details, review the certificate, then print it or save it as a PDF.
          </p>
        </div>
      </header>

      <form onSubmit={handlePrint} className="grid items-start gap-6 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
        <section className="space-y-5 rounded-xl border bg-white p-5 shadow-sm print:hidden">
          <div>
            <h2 className="font-semibold">Student details</h2>
            <p className="mt-1 text-sm text-muted-foreground">The certificate preview updates as you type.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certificateNumber">Certificate No.</Label>
              <Input id="certificateNumber" value={fields.certificateNumber} onChange={(event) => updateField("certificateNumber", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolRegdNo">School Regd. No.</Label>
              <Input id="schoolRegdNo" value={fields.schoolRegdNo} onChange={(event) => updateField("schoolRegdNo", event.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" value={fields.dateOfBirth} onChange={(event) => updateField("dateOfBirth", event.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Student&apos;s Name</Label>
            <Input id="name" value={fields.name} onChange={(event) => updateField("name", event.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father&apos;s Name</Label>
              <Input id="fatherName" value={fields.fatherName} onChange={(event) => updateField("fatherName", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother&apos;s Name</Label>
              <Input id="motherName" value={fields.motherName} onChange={(event) => updateField("motherName", event.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Permanent Address</Label>
            <Textarea id="address" rows={2} value={fields.address} onChange={(event) => updateField("address", event.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbolNumber">Symbol Number</Label>
              <Input id="symbolNumber" value={fields.symbolNumber} onChange={(event) => updateField("symbolNumber", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nebRegdNo">NEB Regd. No.</Label>
              <Input id="nebRegdNo" value={fields.nebRegdNo} onChange={(event) => updateField("nebRegdNo", event.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input id="level" value={fields.level} onChange={(event) => updateField("level", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Input id="batch" value={fields.batch} onChange={(event) => updateField("batch", event.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="progressReport">Progress Report</Label>
            <Input id="progressReport" value={fields.progressReport} onChange={(event) => updateField("progressReport", event.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" value={fields.issueDate} onChange={(event) => updateField("issueDate", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentPhoto">Student Photo</Label>
              <Input id="studentPhoto" type="file" accept="image/*" className="px-2 file:mr-2 file:text-xs" onChange={(event) => handlePhotoChange(event.target.files?.[0])} />
              {photoError && <p className="text-xs text-destructive">{photoError}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Student details stay in this page and are not saved to the database. Choose “Save as PDF” in the print dialog to download a copy.
          </p>
        </section>

        <section className="min-w-0 overflow-x-auto rounded-xl border bg-slate-100 p-3 sm:p-6 print:overflow-visible print:border-0 print:bg-white print:p-0">
          <article id="certificate-print-root" className="certificate-paper mx-auto min-w-[700px] max-w-[1050px] bg-white p-5 text-slate-800 shadow-md sm:p-8 print:min-w-0 print:max-w-none print:p-0 print:shadow-none">
            <div className="certificate-frame">
              <div className="certificate-inner">
                <div className="flex items-start justify-between gap-4 text-xs">
                  <p>No. <span className="certificate-top-value">{fields.certificateNumber || "\u00a0"}</span></p>
                  <p>Regd. No.: <span className="certificate-top-value">{fields.schoolRegdNo || "\u00a0"}</span></p>
                </div>

                <div className="relative mt-2 flex min-h-[92px] items-center justify-center gap-4 pr-20 text-center">
                  <Image
                    src="/images/peacezonologo-removebg-preview.png"
                    alt={`${SITE_CONFIG.name} logo`}
                    width={72}
                    height={72}
                    className="h-[68px] w-[68px] object-contain"
                  />
                  <div>
                    <h2 className="font-serif text-2xl font-bold uppercase tracking-wide sm:text-3xl">{SITE_CONFIG.name}</h2>
                    <p className="mt-1 text-sm">{SITE_CONFIG.address}</p>
                    <p className="text-xs">Phone: {SITE_CONFIG.phone}</p>
                  </div>
                  <div className="absolute right-0 top-0 flex h-[88px] w-[70px] items-center justify-center overflow-hidden border border-slate-400 text-center text-[10px] text-slate-500">
                    {photo ? (
                      <Image src={photo} alt="Student" width={70} height={88} unoptimized className="h-full w-full object-cover" />
                    ) : (
                      "PHOTO"
                    )}
                  </div>
                </div>

                <div className="mt-2 border-y border-slate-400 py-2 text-center">
                  <h1 className="inline-block rounded bg-slate-600 px-4 py-1 text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
                    School Leaving Certificate
                  </h1>
                </div>

                <div className="mt-3 space-y-1.5">
                  {FIELD_ROWS.map(({ key, label }, index) => {
                    const value = key === "dateOfBirth" ? formatDate(fields[key]) : fields[key];
                    return (
                      <div key={key} className="certificate-row">
                        <span className="w-6 shrink-0">{index + 1}.</span>
                        <span className="shrink-0">{label}:</span>
                        <span className="certificate-value">{value || "\u00a0"}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-end justify-between gap-8 text-sm">
                  <p>Date: <span className="certificate-date">{formatDate(fields.issueDate) || "\u00a0"}</span></p>
                  <div className="flex w-1/2 justify-between gap-6 text-center text-xs">
                    <p className="w-1/2 border-t border-slate-500 pt-1">Verified by</p>
                    <p className="w-1/2 border-t border-slate-500 pt-1">(Principal)</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </form>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admission", description: `Admission enquiries for ${SITE_CONFIG.name}.` };

export default function AdmissionPage() {
  return <section className="container py-16 sm:py-20"><div className="mx-auto max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Begin your journey</p><h1 className="mt-3 font-serif text-4xl font-semibold text-primary sm:text-5xl">Admission</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">We are happy to help your family understand the admission process and find the right pathway at {SITE_CONFIG.name}.</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{["Contact the academy", "Discuss your programme", "Receive admission guidance"].map((step) => <div key={step} className="rounded-2xl border border-primary/10 bg-secondary/40 p-5"><CheckCircle2 className="h-5 w-5 text-primary" /><p className="mt-3 font-medium">{step}</p></div>)}</div><Button asChild size="lg" className="mt-10"><Link href="/contact">Make an admission enquiry <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></section>;
}

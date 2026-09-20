import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = { title: "School Policies & Guidelines", description: `Policies and guidelines for ${SITE_CONFIG.name}.` };

const policyAreas = [
  { icon: ShieldCheck, title: "Safety first", text: "Clear safeguarding and wellbeing practices help every learner feel secure, respected, and ready to learn." },
  { icon: UserRoundCheck, title: "Shared responsibility", text: "Attendance, punctuality, and academic responsibility create reliable habits for school and life." },
  { icon: HeartHandshake, title: "A respectful culture", text: "We value kindness, inclusion, and constructive communication between students, families, and staff." },
];

export default function SchoolPoliciesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[390px] w-full sm:h-[470px]">
          <Image src={SCHOOL_IMAGES.aboutHero} alt="Students learning at Peace Zone Academy" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />
          <div className="container relative flex h-full items-end pb-20 sm:pb-24"><div className="text-white"><p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">For students and families</p><h1 className="font-serif text-4xl font-bold sm:text-6xl">School Policies &amp; <span className="text-accent">Guidelines</span></h1><div className="mt-5 flex gap-3 text-sm text-white/80"><Link href="/" className="transition-colors hover:text-white">Home</Link><span className="text-accent">/</span><span>Policies</span></div></div></div>
        </div>
      </section>

      <section className="container py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">A clear path forward</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">A respectful community starts with <span className="text-accent">shared expectations</span></h2>
            <div className="mt-4 h-1 w-16 bg-accent" />
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Our policies help students, families, and teachers work together in a safe, supportive, and focused learning environment.</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{policyAreas.map(({ icon: Icon, title, text }) => <div key={title} className="group border border-primary/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-primary transition-colors group-hover:bg-accent"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-serif text-xl font-bold text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>
            <div className="mt-12 grid overflow-hidden border border-primary/10 md:grid-cols-[0.85fr_1.15fr] md:items-stretch"><div className="relative min-h-[250px]"><Image src={SCHOOL_IMAGES.campus} alt="Peace Zone Academy campus" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div><div className="bg-secondary/60 p-7 sm:p-9"><p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Questions are welcome</p><h3 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl">Guidance for <span className="text-accent">every family</span></h3><p className="mt-4 leading-7 text-muted-foreground">Policies work best when they are understood. Our school office can explain the current guidelines and provide the documents relevant to your child.</p><Button asChild className="mt-6"><Link href="/contact">Contact the school <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></div>
          </div>
          <aside className="h-fit bg-primary p-7 text-white lg:sticky lg:top-24"><p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Peace Zone Academy</p><h3 className="mt-4 font-serif text-2xl font-bold">Learning with <span className="text-accent">care and purpose.</span></h3><p className="mt-4 text-sm leading-7 text-white/70">Our team is here to answer questions and help every student feel prepared for the journey ahead.</p><div className="mt-7 space-y-4 border-t border-white/15 pt-5 text-sm text-white/75"><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />Student wellbeing and safeguarding</p><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />Attendance and academic responsibility</p><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />Respectful conduct and community values</p></div></aside>
        </div>
      </section>
    </>
  );
}

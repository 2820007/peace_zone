import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCHOOL_IMAGES, SITE_CONFIG } from "@/config/site";

const programs = {
  "primary-school": {
    title: "Primary School",
    eyebrow: "Grades 1–5",
    hero: SCHOOL_IMAGES.classroom,
    alt: "Students learning together in a bright classroom",
    supportImage: SCHOOL_IMAGES.gallery[1],
    supportAlt: "Children collaborating during a creative classroom activity",
    description: "A joyful foundation where children build confidence, curiosity, and the habits that make lifelong learning possible.",
    intro: "Our primary years combine strong academic foundations with creativity, care, and plenty of room for children to discover what they can do.",
    icon: BookOpen,
    highlights: ["English, Nepali, and Mathematics", "Science through discovery", "Creative arts and physical education"],
    journey: [["01", "Discover", "Children explore language, numbers, nature, and creativity through active, welcoming lessons."], ["02", "Practise", "They build confidence by asking questions, working with friends, and trying new ideas."], ["03", "Grow", "Each new skill becomes a strong foundation for the next stage of learning."]],
    focusTitle: "Curiosity is the beginning of confidence",
    focusText: "Young learners thrive when lessons feel connected to the world around them. We create space for questions, hands-on discovery, and the small successes that make children excited to return each day.",
  },
  "secondary-school": {
    title: "Secondary School",
    eyebrow: "Grades 6–10",
    hero: SCHOOL_IMAGES.library,
    alt: "Students reading and studying in a school library",
    supportImage: SCHOOL_IMAGES.gallery[3],
    supportAlt: "Students working together on a school project",
    description: "A challenging and encouraging environment where independent learners grow into thoughtful, capable young adults.",
    intro: "Secondary school gives students the confidence to ask better questions, take ownership of their learning, and prepare for the academic choices ahead.",
    icon: Users,
    highlights: ["Core academic subjects", "Project-based learning", "Mentoring and exam preparation"],
    journey: [["01", "Question", "Students investigate ideas across core subjects and learn to think beyond a single answer."], ["02", "Collaborate", "Projects, discussion, and practical tasks turn knowledge into communication and teamwork."], ["03", "Prepare", "Focused guidance helps learners approach examinations and future choices with confidence."]],
    focusTitle: "Building independent thinkers",
    focusText: "The secondary years are a time for students to find their voice. Our classrooms balance academic challenge with collaboration, reflection, and practical experiences that prepare students for their next choice.",
  },
  "plus-two-management": {
    title: "+2 Management",
    eyebrow: "NEB affiliated",
    hero: SCHOOL_IMAGES.campus,
    alt: "Peace Zone Academy campus building",
    supportImage: SCHOOL_IMAGES.gallery[5],
    supportAlt: "Students discussing ideas together on campus",
    description: "A practical academic pathway for students preparing for business, leadership, higher education, and the world of work.",
    intro: "The Management stream connects classroom knowledge with real decisions, communication, and problem-solving skills that students can carry into university and beyond.",
    icon: GraduationCap,
    highlights: ["Accountancy, economics, and business studies", "Practical presentations and teamwork", "Guidance for higher education"],
    journey: [["01", "Understand", "Students build a clear base in accountancy, economics, business, and management."], ["02", "Apply", "Presentations and real-world tasks connect classroom concepts to decisions and organisations."], ["03", "Lead", "Learners leave with the communication and judgement needed for university and professional life."]],
    focusTitle: "Knowledge that moves with you",
    focusText: "Management education is more than a syllabus. Students practise communicating ideas, understanding organisations, and making thoughtful decisions while preparing for university and professional life.",
  },
};

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(programs).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const program = programs[params.slug as keyof typeof programs];
  return { title: program ? program.title : "Program", description: program?.description };
}

export default function ProgramPage({ params }: Props) {
  const program = programs[params.slug as keyof typeof programs];
  if (!program) notFound();
  const Icon = program.icon;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[430px] w-full sm:h-[520px]">
          <Image src={program.hero} alt={program.alt} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/15" />
          <div className="container relative flex h-full items-end pb-20 sm:pb-24">
            <div className="max-w-3xl text-white">
              <div className="mb-5 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-accent" />Academic program</div>
              <h1 className="font-serif text-5xl font-bold leading-none sm:text-6xl">{program.title}</h1>
              <div className="mt-5 flex items-center gap-3 text-sm text-white/80"><Link href="/" className="transition-colors hover:text-white">Home</Link><span className="text-accent">/</span><Link href="/programs/primary-school" className="transition-colors hover:text-white">Programs</Link><span className="text-accent">/</span><span>{program.title}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white pb-20 pt-14 sm:pt-20">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{program.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">Growing with purpose</h2>
            <div className="mt-4 h-1 w-16 bg-accent" />
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{program.intro}</p>
            <div className="mt-10 overflow-hidden rounded-[1.75rem] bg-primary p-6 text-white shadow-[0_18px_45px_rgba(15,45,80,0.16)] sm:p-8">
              <div className="flex flex-col gap-2 border-b border-white/15 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">The learning journey</p><h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">From first steps to lasting confidence</h3></div><span className="hidden text-4xl font-serif text-white/15 sm:block">{program.title}</span></div>
              <div className="mt-6 grid gap-6 md:grid-cols-3">{program.journey.map(([number, title, text]) => <div key={number} className="relative border-l border-accent/60 pl-4"><span className="text-xs font-bold tracking-[0.2em] text-accent">{number}</span><h4 className="mt-2 font-serif text-xl font-bold text-white">{title}</h4><p className="mt-2 text-sm leading-6 text-white/70">{text}</p></div>)}</div>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">{program.highlights.map((highlight) => <div key={highlight} className="border-t-2 border-primary/10 pt-4"><CheckCircle2 className="h-5 w-5 text-accent" /><p className="mt-3 text-sm font-semibold leading-6 text-primary">{highlight}</p></div>)}</div>
            <div className="mt-14 grid overflow-hidden border border-primary/10 bg-secondary/40 md:grid-cols-[0.9fr_1.1fr] md:items-stretch"><div className="relative min-h-[260px]"><Image src={program.supportImage} alt={program.supportAlt} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div><div className="p-7 sm:p-9"><p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">The Peace Zone approach</p><h3 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl">{program.focusTitle}</h3><p className="mt-4 leading-7 text-muted-foreground">{program.focusText}</p><Link href="/about" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-accent">Discover our approach <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div></div>
            <div className="mt-12 overflow-hidden border border-primary/10 bg-secondary/50 p-6 sm:p-8"><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white"><Icon className="h-6 w-6" /></span><div><h3 className="font-serif text-2xl font-bold text-primary">A place to learn, belong, and lead</h3><p className="mt-3 leading-7 text-muted-foreground">At {SITE_CONFIG.name}, learning is supported by caring teachers, a welcoming community, and experiences that connect knowledge with everyday life.</p></div></div></div>
          </article>

          <aside className="overflow-hidden border border-primary/10 bg-white shadow-xl shadow-primary/10 lg:sticky lg:top-24">
            <div className="bg-accent px-6 py-5 text-xl font-bold text-accent-foreground">Our Programs</div>
            <nav aria-label="Program pages" className="divide-y divide-primary/10">{Object.entries(programs).map(([slug, item]) => <Link key={slug} href={`/programs/${slug}`} className={`flex items-center justify-between px-6 py-4 text-sm font-medium transition-colors hover:bg-secondary ${slug === params.slug ? "bg-accent/15 text-primary" : "text-muted-foreground"}`}>{item.title}<ArrowRight className="h-4 w-4" /></Link>)}<Link href="/school-policies" className="flex items-center justify-between px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary">School Policies &amp; Guidelines <ArrowRight className="h-4 w-4" /></Link></nav>
            <div className="m-5 bg-primary p-5 text-white"><p className="text-sm font-semibold">Ready to take the next step?</p><p className="mt-2 text-sm leading-6 text-white/70">Talk with our admissions team about the right path for your child.</p><Button asChild className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90"><Link href="/admission">Start an enquiry <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </aside>
        </div>
      </section>
    </>
  );
}
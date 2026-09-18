import { NAV_LINKS, SITE_CONFIG } from "@/config/site";
import { ArrowUpRight, Facebook, GraduationCap, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const footerLinks = NAV_LINKS.slice(1).flatMap((link) =>
  link.children?.length ? link.children : [link],
);

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <section className="border-b border-white/15 bg-primary">
        <div className="container py-14 sm:py-16">
          <div className="flex flex-col gap-7 border-y border-white/15 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-9 bg-accent" />
                Begin with a conversation
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Give your child a place to <span className="text-accent">grow.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Visit {SITE_CONFIG.name} and discover a learning community built around curiosity, confidence, and character.
              </p>
            </div>
            <Link href="/contact" className="group inline-flex w-fit shrink-0 items-center gap-3 border border-accent bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-primary">
              Plan a visit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_0.9fr] lg:gap-10">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform duration-300 group-hover:scale-105">
                <GraduationCap className="h-6 w-6" />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex gap-2">
              <a href={SITE_CONFIG.socials.facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"><Facebook className="h-4 w-4" /></a>
              <a href={SITE_CONFIG.socials.instagram} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="border-l-2 border-accent pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white">Explore</h3>
            <ul className="mt-6 space-y-3">{footerLinks.map((link) => <li key={link.href + link.label}><Link href={link.href} className="group flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-accent"><span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />{link.label}</Link></li>)}</ul>
          </div>

          <div>
            <h3 className="border-l-2 border-accent pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white">Contact</h3>
            <ul className="mt-6 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{SITE_CONFIG.address}</span></li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-accent" /><span>{SITE_CONFIG.phone}</span></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span className="break-all">{SITE_CONFIG.email}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="border-l-2 border-accent pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white">Administration</h3>
            <p className="mt-6 text-sm leading-7 text-white/60">Staff and faculty can access the CMS to manage school content.</p>
            <Link href="/admin/login" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white">Open CMS login <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/45 sm:flex-row">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="flex items-center gap-2"><span>Learning.</span><span className="text-accent">Growing.</span><span>Thriving.</span></p>
        </div>
      </div>
    </footer>
  );
}
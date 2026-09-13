import { NAV_LINKS, SITE_CONFIG } from "@/config/site";
import { ArrowRight, Facebook, GraduationCap, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-secondary/40">
      <div className="bg-primary py-12 text-white sm:py-14">
        <div className="container flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Start your journey</p>
            <h2 className="mt-2 max-w-xl font-serif text-3xl font-semibold">Make this your child&apos;s place to grow.</h2>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:border-accent hover:bg-white/10">Plan a visit <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-serif text-lg font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            {SITE_CONFIG.name}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{SITE_CONFIG.description}</p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href={SITE_CONFIG.socials.facebook} aria-label="Facebook" className="hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={SITE_CONFIG.socials.instagram} aria-label="Instagram" className="hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={SITE_CONFIG.socials.youtube} aria-label="YouTube" className="hover:text-primary">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Contact</h3>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Administration</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Staff and faculty can access the CMS to manage site content.
          </p>
          
        </div>
      </div>

      <div className="border-t py-6">
        <p className="container text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Founded {SITE_CONFIG.foundedYear}.
        </p>
      </div>
    </footer>
  );
}

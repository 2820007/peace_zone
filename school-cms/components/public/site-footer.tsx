import { NAV_LINKS, SITE_CONFIG } from "@/config/site";
import { ArrowUpRight, Facebook, GraduationCap, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const footerLinks = NAV_LINKS.slice(1).flatMap((link) =>
  link.children?.length ? link.children : [link],
);

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      

     {/* Subtle Decorative Shapes */}
  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

  {/* Main Footer */}
  <div className="container relative py-10 sm:py-12 lg:py-14">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_0.9fr] lg:gap-10">
      
      {/* School Identity */}
      <div>
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-md transition-transform duration-300 group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </span>

          <span className="font-serif text-xl font-bold tracking-tight text-white">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
          {SITE_CONFIG.description}
        </p>

        {/* Social Links */}
        <div className="mt-5 flex gap-2">
          <a
            href={SITE_CONFIG.socials.facebook}
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
          </a>

          <a
            href={SITE_CONFIG.socials.instagram}
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Explore */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          <span className="h-5 w-1 rounded-full bg-white" />
          Explore
        </h3>

        <ul className="space-y-2.5">
          {footerLinks.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className="group flex w-fit items-center gap-2 text-sm text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-white"
              >
                <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          <span className="h-5 w-1 rounded-full bg-white" />
          Contact
        </h3>

        <ul className="space-y-3 text-sm text-white/80">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>{SITE_CONFIG.address}</span>
          </li>

          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-white" />
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
              className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {SITE_CONFIG.phone}
            </a>
          </li>

          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="break-all underline decoration-white/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {SITE_CONFIG.email}
            </a>
          </li>
        </ul>
      </div>

      {/* Administration */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          <span className="h-5 w-1 rounded-full bg-white" />
          Administration
        </h3>

        <p className="text-sm leading-6 text-white/80">
          Staff and faculty can access the CMS to manage school content.
        </p>

       
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-white/20 bg-black/10">
    <div className="container flex flex-col items-center justify-between gap-2 py-3 text-xs text-white/70 sm:flex-row">
      <p className="text-center sm:text-left">
        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </p>

      <div className="flex items-center gap-2">
        <span>Developed by -</span>
        <span className="font-semibold text-white">bakenedX Technology Pvt. Ltd.</span>
        {/* <span>Thriving.</span> */}
      </div>
    </div>
  </div>
    </footer>
  );
}

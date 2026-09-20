import { NAV_LINKS, SITE_CONFIG } from "@/config/site";
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const hiddenFooterLinks = new Set([
  "/programs/primary-school",
  "/programs/secondary-school",
  "/programs/plus-two-management",
  "/teachers",
  "/teachers?level=secondary",
]);

const footerLinks = NAV_LINKS.slice(1)
  .flatMap((link) => link.children?.length ? link.children : [link])
  .filter((link) => !hiddenFooterLinks.has(link.href));
const socialLinks = [
  { label: "Facebook", href: SITE_CONFIG.socials.facebook, type: "facebook" },
  { label: "Instagram", href: SITE_CONFIG.socials.instagram, type: "instagram" },
] as const;

function SocialIcon({ type }: { type: "facebook" | "instagram" }) {
 
  if (type === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H8v3.1h2.6v8h3.1Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.2 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>;
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-black/20 blur-3xl" />

      <div className="container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.75fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform duration-300 group-hover:scale-105"><Image src="/images/peacezonologo-removebg-preview.png" alt="Peace Zone Academy logo" width={48} height={58} className="h-12 w-12 object-contain" /></span>
              <span><span className="block font-serif text-2xl font-semibold tracking-tight">{SITE_CONFIG.name}</span><span className="mt-0.5 block text-xs font-medium uppercase tracking-[0.16em] text-white/60">Learn · Lead · Succeed</span></span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/75">{SITE_CONFIG.description}</p>
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, href, type }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${label}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><SocialIcon type={type} /></a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Explore</h2>
            <ul className="mt-6 grid gap-3">
              {footerLinks.map((link) => <li key={link.href + link.label}><Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"><ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-1" />{link.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Get in touch</h2>
            <ul className="mt-6 space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span className="leading-6">{SITE_CONFIG.address}</span></li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-accent" /><a href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`} className="transition hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white">{SITE_CONFIG.phone}</a></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href={`mailto:${SITE_CONFIG.email}`} className="break-all transition hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white">{SITE_CONFIG.email}</a></li>
            </ul>
            <Link href="/contact" className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-accent">Contact the academy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/10"><div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row"><p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p><p>Developed by <span className="font-semibold text-white/85">BackendX Technology Pvt. Ltd.</span></p></div></div>
    </footer>
  );
}

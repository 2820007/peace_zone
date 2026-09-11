import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-serif text-lg font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            {SITE_CONFIG.name}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{SITE_CONFIG.tagline}</p>
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
          <h3 className="text-sm font-semibold">Explore</h3>
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
          <h3 className="text-sm font-semibold">Contact</h3>
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
          <h3 className="text-sm font-semibold">Administration</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Staff and faculty can access the CMS to manage site content.
          </p>
          <Link
            href="/admin/login"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            Admin Login →
          </Link>
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

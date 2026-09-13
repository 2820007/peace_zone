"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight, GraduationCap, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="hidden bg-primary text-xs font-medium uppercase tracking-[0.14em] text-white sm:block">
        <div className="container flex h-9 items-center justify-between">
          <p className="text-white/75">A joyful place to learn, lead, and belong</p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="transition-colors hover:text-accent">Inquire</Link>
            <Link href="/contact" className="transition-colors hover:text-accent">Visit us</Link>
            <Link href="/contact" className="flex items-center gap-1 text-accent transition-colors hover:text-white">Apply today <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </div>
      <div className="container flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-serif text-xl font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary"><GraduationCap className="h-6 w-6" /></span>
          <span>{SITE_CONFIG.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === link.href && "bg-secondary text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="px-5 uppercase tracking-[0.08em]">
            <Link href="/contact">Apply now</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="font-serif">{SITE_CONFIG.shortName}</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    pathname === link.href && "bg-secondary text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-4">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

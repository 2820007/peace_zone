"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, GraduationCap, Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const teacherNavItems = [
    { label: "All Teachers", href: "/teachers" },
    { label: "Secondary", href: "/teachers?level=secondary" },
    { label: "Higher Secondary (+2)", href: "/teachers?level=higher_secondary" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/95 backdrop-blur">
      <div className="bg-primary text-[10px] font-medium text-white sm:text-xs">
        <div className="container flex h-8 items-center justify-between">
          <div className="hidden items-center gap-4 text-white/75 sm:flex">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {SITE_CONFIG.email}</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {SITE_CONFIG.phone}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">Admissions open for 2026</span>
            <Link href="/events" className="transition-colors hover:text-accent">Calendar</Link>
            <Link href="/contact" className="transition-colors hover:text-accent">Parent portal</Link>
            <Link href="/contact" className="flex items-center gap-1 bg-accent px-3 py-2 font-semibold text-accent-foreground transition-colors hover:bg-white">Learn more <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </div>
      <div className="container flex h-[4.75rem] items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-serif text-lg font-semibold tracking-tight text-primary sm:text-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary"><GraduationCap className="h-6 w-6" /></span>
          <span className="max-w-[10rem] leading-tight sm:max-w-none">{SITE_CONFIG.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            if (link.href === "/teachers") {
              const isActive = pathname === "/teachers" || pathname.startsWith("/teachers?") || pathname.startsWith("/teachers/");
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 border-b-2 border-transparent px-2.5 py-7 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-primary lg:px-3",
                        isActive && "border-accent text-primary"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {teacherNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="flex w-full justify-between"
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b-2 border-transparent px-2.5 py-7 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-primary lg:px-3",
                  pathname === link.href && "border-accent text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full bg-primary px-5 uppercase tracking-[0.08em] hover:bg-primary/90">
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
              {NAV_LINKS.map((link) => {
                if (link.href === "/teachers") {
                  return (
                    <div key={link.href} className="space-y-1">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                          pathname === link.href && "bg-secondary text-primary"
                        )}
                      >
                        Teachers
                      </Link>
                      <div className="ml-3 space-y-1">
                        {teacherNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
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
                );
              })}
              <Button asChild size="sm" className="mt-4 rounded-full">
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

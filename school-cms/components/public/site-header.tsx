"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG, type NavigationLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, GraduationCap, Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";

function isChildActive(href: string, pathname: string, searchParams: URLSearchParams) {
  const [childPath, query = ""] = href.split("?");
  if (childPath !== pathname) return false;

  if (childPath !== "/teachers") return true;
  return new URLSearchParams(query).get("level") === searchParams.get("level");
}

function isActive(link: NavigationLink, pathname: string, searchParams: URLSearchParams) {
  return link.href.split("?")[0] === pathname || Boolean(
    link.children?.some((child) => isChildActive(child.href, pathname, searchParams))
  );
}

function SiteHeaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isHome = pathname === "/";
  const navClass = (active: boolean) => cn(
    "group relative rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300",
    isHome ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:bg-secondary hover:text-primary",
    active && (isHome ? "bg-white/15 text-white" : "bg-secondary text-primary"),
  );

  return (
    <header className={cn("z-40 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75", isHome && "absolute inset-x-0 top-0 border-transparent bg-transparent text-white backdrop-blur-0 supports-[backdrop-filter]:bg-transparent")}>
     
      <div className={cn("hidden h-1 w-full sm:block", isHome ? "bg-gradient-to-r from-transparent via-white/30 to-transparent" : "bg-gradient-to-r from-primary/0 via-primary to-primary/0")} />
      <div className="container flex h-[4.5rem] items-center justify-between gap-3">
        <Link href="/" className="group relative flex shrink-0 items-center gap-3 font-serif text-xl font-semibold tracking-tight">
          <span className={cn("relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg", isHome && "bg-white/90 text-primary shadow-white/10")}>
            <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <GraduationCap className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:-rotate-6" />
          </span>
          <span className="relative">{SITE_CONFIG.shortName}<span className={cn("absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full", isHome && "bg-white")} /></span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = isActive(link, pathname, searchParams);
            const underline = <span className={cn("absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300", isHome ? "bg-white" : "bg-primary", active ? "w-4/5" : "w-0 group-hover:w-2/5")} />;
            if (!link.children) return <Link key={link.href} href={link.href} className={navClass(active)}><span className="relative">{link.label}</span>{underline}</Link>;
            const openDesktopMenu = () => {
              if (closeTimer.current) clearTimeout(closeTimer.current);
              setDesktopOpen(link.label);
            };
            const closeDesktopMenu = () => {
              closeTimer.current = setTimeout(() => setDesktopOpen(null), 120);
            };
            return <DropdownMenu key={link.label} modal={false} open={desktopOpen === link.label} onOpenChange={(isOpen) => setDesktopOpen(isOpen ? link.label : null)}>
              <DropdownMenuTrigger asChild>
                <button type="button" onMouseEnter={openDesktopMenu} onMouseLeave={closeDesktopMenu} className={navClass(active)} aria-label={`${link.label} menu`}><span className="relative flex items-center gap-1.5">{link.label}<ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" /></span>{underline}</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent onMouseEnter={openDesktopMenu} onMouseLeave={closeDesktopMenu} align="start" className="min-w-56 rounded-xl border-primary/10 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl">
                {link.children.map((child) => <DropdownMenuItem key={child.href + child.label} asChild>
                  <Link href={child.href} className={cn("flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium", isChildActive(child.href, pathname, searchParams) && "bg-secondary text-primary")}>{child.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-50" /></Link>
                </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>;
          })}
        </nav>

        <div className="hidden lg:block"><Button asChild size="sm" className={cn("group relative overflow-hidden rounded-full px-5 uppercase tracking-[0.08em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg", isHome && "bg-violet-900 text-white hover:bg-white hover:text-violet-900")}><Link href="/admission"><span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" /><span className="relative flex items-center gap-2">Apply now<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></Link></Button></div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button variant="outline" size="icon" className={cn("group rounded-xl transition-all duration-300 hover:scale-105 lg:hidden", isHome && "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white")} aria-label="Open menu"><Menu className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" /></Button></SheetTrigger>
          <SheetContent side="right" className="w-[85%] max-w-sm overflow-y-auto border-l border-primary/10 bg-background/95 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary shadow-sm"><GraduationCap className="h-6 w-6" /></span><SheetTitle className="font-serif text-xl">{SITE_CONFIG.shortName}</SheetTitle></div>
            <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link, pathname, searchParams); const isExpanded = expanded === link.label;
                if (!link.children) return <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={cn("group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300", active ? "bg-secondary text-primary shadow-sm" : "text-muted-foreground hover:translate-x-1 hover:bg-secondary hover:text-primary")}><span>{link.label}</span><ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" /></Link>;
                return <div key={link.label} className="rounded-xl"><button type="button" onClick={() => setExpanded(isExpanded ? null : link.label)} className={cn("flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-300", active || isExpanded ? "bg-secondary text-primary shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-primary")} aria-expanded={isExpanded}>{link.label}<ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-180")} /></button>
                  {isExpanded && <div className="mt-1 space-y-1 border-l border-primary/15 py-1 pl-3">{link.children.map((child) => <Link key={child.href + child.label} href={child.href} onClick={() => setOpen(false)} className={cn("flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-primary", isChildActive(child.href, pathname, searchParams) ? "bg-secondary text-primary" : "text-muted-foreground")}>{child.label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}</div>}
                </div>;
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteHeader() {
  return (
    <Suspense fallback={null}>
      <SiteHeaderContent />
    </Suspense>
  );
}

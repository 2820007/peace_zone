"use client";

import { SidebarNav } from "@/components/admin/sidebar-nav";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, GraduationCap, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1); // drop "admin"
  return segments.map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1)).join(" / ") || "Dashboard";
}

export function AdminShell({
  children,
  adminName,
  adminEmail,
}: {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const breadcrumb = useBreadcrumb();

  return (
    <div className="admin-theme flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden h-screen shrink-0 border-r border-slate-800 bg-slate-950 transition-all duration-200 md:sticky md:top-0 md:flex md:flex-col",
          collapsed ? "md:w-[68px]" : "md:w-64"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden font-serif font-semibold text-white">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </span>
            {!collapsed && <span className="truncate">{SITE_CONFIG.shortName}<span className="block font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">Admin workspace</span></span>}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {collapsed ? (
            <CollapsedNav />
          ) : (
            <SidebarNav />
          )}
        </div>
        {!collapsed && (
          <div className="mx-3 mb-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold text-white">Keep your site fresh</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">Publish new stories, events, and gallery moments for families.</p>
            <Link href="/admin/notices" className="mt-3 inline-flex text-xs font-semibold text-primary hover:text-white">Create an update</Link>
          </div>
        )}
        <div className="border-t border-white/10 p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center text-slate-400 hover:bg-white/10 hover:text-white"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-slate-800 bg-slate-950 p-0 text-white">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4 font-serif font-semibold">
                  <GraduationCap className="h-6 w-6 text-primary" /> {SITE_CONFIG.shortName} CMS
                </div>
                <div className="py-2">
                  <SidebarNav onNavigate={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">School CMS</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">Home <span className="px-1 text-muted-foreground">/</span> {breadcrumb}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{adminName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="font-medium">{adminName}</p>
                <p className="text-xs font-normal text-muted-foreground">{adminEmail}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank">View public site</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                <Link href="/admin/logout"><LogOut className="h-4 w-4" /> Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 sm:p-7">{children}</main>
      </div>
    </div>
  );
}

function CollapsedNav() {
  return (
    <div className="px-2">
      <SidebarNav collapsed />
    </div>
  );
}

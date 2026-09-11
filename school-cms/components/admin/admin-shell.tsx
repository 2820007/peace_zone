"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import { SITE_CONFIG } from "@/config/site";

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
    <div className="flex min-h-screen bg-secondary/20">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 border-r bg-background transition-all duration-200 md:flex md:flex-col",
          collapsed ? "md:w-[68px]" : "md:w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 overflow-hidden font-serif font-semibold">
            <GraduationCap className="h-6 w-6 shrink-0 text-primary" />
            {!collapsed && <span className="truncate">{SITE_CONFIG.shortName} CMS</span>}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {collapsed ? (
            <CollapsedNav />
          ) : (
            <SidebarNav />
          )}
        </div>
        <div className="border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-16 items-center gap-2 border-b px-4 font-serif font-semibold">
                  <GraduationCap className="h-6 w-6 text-primary" /> {SITE_CONFIG.shortName} CMS
                </div>
                <div className="py-2">
                  <SidebarNav onNavigate={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden text-sm text-muted-foreground sm:block">
              <span className="text-foreground">Admin</span> / {breadcrumb}
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
                <Link href="/" target="_blank">
                  View public site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  logoutAction();
                }}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

function CollapsedNav() {
  return (
    <div className="px-2">
      <SidebarNav />
    </div>
  );
}

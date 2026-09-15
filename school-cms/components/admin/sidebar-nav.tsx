"use client";

import { cn } from "@/lib/utils";
import {
    Bell,
    CalendarDays,
    GraduationCap,
    Image as ImageIcon,
    ImagePlus,
    LayoutDashboard,
    Mail,
    Megaphone,
    MessageSquareQuote,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  GraduationCap,
  MessageSquareQuote,
  Image: ImageIcon,
  ImagePlus,
  CalendarDays,
  Megaphone,
  Mail,
  Bell,
  Settings,
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/teachers", label: "Teachers", icon: "GraduationCap" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "MessageSquareQuote" },
  { href: "/admin/gallery", label: "Gallery", icon: "Image" },
  { href: "/admin/banners", label: "Homepage Banners", icon: "ImagePlus" },
  { href: "/admin/events", label: "Events", icon: "CalendarDays" },
  { href: "/admin/notices", label: "Notices", icon: "Megaphone" },
  { href: "/admin/messages", label: "Messages", icon: "Mail" },
  { href: "/admin/notifications", label: "Notifications", icon: "Bell" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;

export function SidebarNav({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {!collapsed && <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</p>}
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white",
              collapsed && "justify-center px-2",
              active && "bg-primary text-white shadow-sm hover:bg-primary hover:text-white"
            )}
          >
            <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-105", active && "text-primary-foreground")} />
            {!collapsed && item.label}
          </Link>
        );
      })}
    </nav>
  );
}

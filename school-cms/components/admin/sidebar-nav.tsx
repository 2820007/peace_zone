"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquareQuote,
  Image as ImageIcon,
  CalendarDays,
  Megaphone,
  Mail,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  GraduationCap,
  MessageSquareQuote,
  Image: ImageIcon,
  CalendarDays,
  Megaphone,
  Mail,
  Settings,
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/teachers", label: "Teachers", icon: "GraduationCap" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "MessageSquareQuote" },
  { href: "/admin/gallery", label: "Gallery", icon: "Image" },
  { href: "/admin/events", label: "Events", icon: "CalendarDays" },
  { href: "/admin/notices", label: "Notices", icon: "Megaphone" },
  { href: "/admin/messages", label: "Messages", icon: "Mail" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              active && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

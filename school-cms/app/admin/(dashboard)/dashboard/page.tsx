import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  GalleryHorizontalEnd,
  GraduationCap,
  Mail,
  Megaphone,
  MessageSquareQuote,
  PenLine,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/queries";
import { cn, formatDate } from "@/lib/utils";

export const metadata = { title: "Analytics" };

type IconType = React.ComponentType<{ className?: string }>;

function MetricCard({ label, value, detail, icon: Icon, tone = "forest" }: { label: string; value: number | string; detail: string; icon: IconType; tone?: "forest" | "amber" | "green" | "rose" }) {
  const styles = { forest: "bg-emerald-100 text-emerald-700", amber: "bg-lime-100 text-lime-700", green: "bg-green-100 text-green-700", rose: "bg-rose-100 text-rose-700" };
  return <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-md"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p></div><div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", styles[tone])}><Icon className="h-5 w-5" /></div></div><p className="mt-4 text-xs text-muted-foreground">{detail}</p></CardContent></Card>;
}

function ContentRow({ label, total, published, icon: Icon, href }: { label: string; total: number; published: number; icon: IconType; href: string }) {
  const rate = total ? Math.round((published / total) * 100) : 0;
  return <Link href={href} className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-emerald-50"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="text-sm font-medium">{label}</p><span className="text-xs text-muted-foreground">{published}/{total} live</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100"><div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${rate}%` }} /></div></div><ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" /></Link>;
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const contentTotal = stats.totalTeachers + stats.totalTestimonials + stats.totalEvents + stats.totalNotices + stats.totalGalleryItems;
  const liveTotal = stats.publishedTeachers + stats.publishedTestimonials + stats.publishedEvents + stats.publishedNotices + stats.publishedGalleryItems;
  const publishRate = contentTotal ? Math.round((liveTotal / contentTotal) * 100) : 0;
  const drafts = contentTotal - liveTotal;

  return <div className="dashboard-blue mx-auto max-w-7xl space-y-6 pb-6">
    <section className="flex flex-col justify-between gap-4 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-card to-card p-5 shadow-sm sm:flex-row sm:items-center sm:p-6"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700"><TrendingUp className="h-3.5 w-3.5" /> Content analytics</div><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Your school at a glance</h1><p className="mt-1 text-sm text-muted-foreground">Monitor your website content, publishing progress, and community requests.</p></div><Button asChild className="shrink-0 bg-emerald-700 hover:bg-emerald-800"><Link href="/admin/teachers/create"><Plus /> Add teacher</Link></Button></section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Content published" value={`${publishRate}%`} detail={`${liveTotal} of ${contentTotal} entries are live`} icon={CheckCircle2} tone="green" /><MetricCard label="Drafts to review" value={drafts} detail={drafts ? "Complete and publish pending content" : "Everything is currently published"} icon={PenLine} tone="amber" /><MetricCard label="Inbox attention" value={stats.unreadMessages} detail={`${stats.totalMessages} total messages received`} icon={Mail} tone={stats.unreadMessages ? "rose" : "forest"} /><MetricCard label="Upcoming events" value={stats.upcomingEvents} detail={`${stats.publishedEvents} live events currently managed`} icon={CalendarDays} tone="forest" /></section>

    <section className="grid gap-6 xl:grid-cols-5"><Card className="xl:col-span-3 shadow-sm"><div className="flex items-center justify-between border-b px-5 py-4 sm:px-6"><div><h2 className="font-semibold">Content performance</h2><p className="mt-0.5 text-sm text-muted-foreground">Live content across your site sections</p></div><Badge variant="outline" className="hidden sm:inline-flex">{publishRate}% published</Badge></div><CardContent className="divide-y p-2 sm:p-3"><ContentRow label="Faculty profiles" total={stats.totalTeachers} published={stats.publishedTeachers} icon={GraduationCap} href="/admin/teachers" /><ContentRow label="Testimonials" total={stats.totalTestimonials} published={stats.publishedTestimonials} icon={MessageSquareQuote} href="/admin/testimonials" /><ContentRow label="Events" total={stats.totalEvents} published={stats.publishedEvents} icon={CalendarDays} href="/admin/events" /><ContentRow label="Notices" total={stats.totalNotices} published={stats.publishedNotices} icon={Megaphone} href="/admin/notices" /><ContentRow label="Gallery items" total={stats.totalGalleryItems} published={stats.publishedGalleryItems} icon={GalleryHorizontalEnd} href="/admin/gallery" /></CardContent></Card>
      <Card className="xl:col-span-2 shadow-sm"><div className="border-b px-5 py-4 sm:px-6"><h2 className="font-semibold">Recent inbox activity</h2><p className="mt-0.5 text-sm text-muted-foreground">Latest messages from your contact form</p></div><CardContent className="p-2 sm:p-3">{stats.recentMessages.length === 0 ? <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center"><Mail className="mb-3 h-8 w-8 text-muted-foreground/50" /><p className="text-sm font-medium">No messages yet</p><p className="mt-1 text-xs text-muted-foreground">New enquiries will appear here.</p></div> : <div className="divide-y">{stats.recentMessages.map((message: any) => <Link key={message._id} href="/admin/messages" className="group block rounded-md px-3 py-3 transition-colors hover:bg-emerald-50"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-medium">{message.name}</p><span className="shrink-0 text-xs text-muted-foreground">{formatDate(message.createdAt)}</span></div><p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{message.message}</p></Link>)}</div>}<Button asChild variant="ghost" className="mt-2 w-full justify-between text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"><Link href="/admin/messages">Open inbox <ArrowRight /></Link></Button></CardContent></Card></section>

    <section className="grid gap-4 md:grid-cols-3"><Link href="/admin/teachers/create" className="group rounded-xl border border-emerald-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"><GraduationCap className="h-5 w-5 text-emerald-700" /><h2 className="mt-4 font-semibold">Add a faculty profile</h2><p className="mt-1 text-sm text-muted-foreground">Keep the teachers page current and complete.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">Create profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link><Link href="/admin/notices" className="group rounded-xl border border-emerald-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"><Megaphone className="h-5 w-5 text-emerald-700" /><h2 className="mt-4 font-semibold">Publish an update</h2><p className="mt-1 text-sm text-muted-foreground">Share timely news and announcements.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">Manage notices <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link><Link href="/admin/events" className="group rounded-xl border border-emerald-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"><ClipboardList className="h-5 w-5 text-emerald-700" /><h2 className="mt-4 font-semibold">Plan an event</h2><p className="mt-1 text-sm text-muted-foreground">Make upcoming school events visible to families.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">Manage events <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link></section>
  </div>;
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/queries";
import { cn, formatDate } from "@/lib/utils";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Mail,
  Megaphone,
  PenLine,
  Plus,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Analytics" };

type IconType = React.ComponentType<{ className?: string }>;

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: number | string;
  detail: string;
  icon: IconType;
  tone?: "blue" | "sky" | "indigo" | "rose";
}) {
  const styles = {
    blue: "bg-blue-100 text-blue-700",
    sky: "bg-sky-100 text-sky-700",
    indigo: "bg-indigo-100 text-indigo-700",
    rose: "bg-rose-100 text-rose-700",
  };
  return (
    <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {value}
            </p>
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              styles[tone],
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

type ContentMetric = {
  label: string;
  total: number;
  published: number;
  href: string;
};

function ContentAnalyticsChart({ metrics }: { metrics: ContentMetric[] }) {
  const max = Math.max(...metrics.map((metric) => metric.total), 1);

  return (
    <div className="space-y-5 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> Published
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" /> Draft
        </span>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => {
          const publishedWidth = (metric.published / max) * 100;
          const draftWidth = ((metric.total - metric.published) / max) * 100;
          return (
            <Link
              key={metric.label}
              href={metric.href}
              className="group block rounded-md p-1 transition-colors hover:bg-blue-50"
            >
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-medium group-hover:text-blue-800">
                  {metric.label}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {metric.published} published / {metric.total} total
                </span>
              </div>
              <div
                className="flex h-8 overflow-hidden rounded-md bg-slate-100"
                aria-label={`${metric.label}: ${metric.published} published out of ${metric.total}`}
              >
                <div
                  className="bg-blue-500 transition-all"
                  style={{ width: `${publishedWidth}%` }}
                />
                <div
                  className="bg-slate-300 transition-all"
                  style={{ width: `${draftWidth}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-between pl-0 text-xs text-muted-foreground">
        <span>0</span>
        <span>{max} items</span>
      </div>
    </div>
  );
}

function PublishingDonut({
  published,
  total,
}: {
  published: number;
  total: number;
}) {
  const rate = total ? Math.round((published / total) * 100) : 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = (rate / 100) * circumference;

  return (
    <div className="flex flex-col items-center px-6 py-7 text-center">
      <div className="relative h-44 w-44">
        <svg
          viewBox="0 0 140 140"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label={`${rate}% of content is published`}
        >
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            className="text-slate-100"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            className="text-blue-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tracking-tight">{rate}%</span>
          <span className="mt-1 text-xs text-muted-foreground">published</span>
        </div>
      </div>
      <div className="mt-5 grid w-full grid-cols-2 gap-3 text-left">
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-xs text-blue-700">Published</p>
          <p className="mt-1 text-xl font-semibold text-blue-800">
            {published}
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 p-3">
          <p className="text-xs text-slate-600">Drafts</p>
          <p className="mt-1 text-xl font-semibold text-slate-800">
            {total - published}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const contentTotal =
    stats.totalTeachers +
    stats.totalTestimonials +
    stats.totalEvents +
    stats.totalNotices +
    stats.totalGalleryItems;
  const liveTotal =
    stats.publishedTeachers +
    stats.publishedTestimonials +
    stats.publishedEvents +
    stats.publishedNotices +
    stats.publishedGalleryItems;
  const publishRate = contentTotal
    ? Math.round((liveTotal / contentTotal) * 100)
    : 0;
  const drafts = contentTotal - liveTotal;
  const contentMetrics: ContentMetric[] = [
    {
      label: "Faculty profiles",
      total: stats.totalTeachers,
      published: stats.publishedTeachers,
      href: "/admin/teachers",
    },
    {
      label: "Testimonials",
      total: stats.totalTestimonials,
      published: stats.publishedTestimonials,
      href: "/admin/testimonials",
    },
    {
      label: "Events",
      total: stats.totalEvents,
      published: stats.publishedEvents,
      href: "/admin/events",
    },
    {
      label: "Notices",
      total: stats.totalNotices,
      published: stats.publishedNotices,
      href: "/admin/notices",
    },
    {
      label: "Gallery items",
      total: stats.totalGalleryItems,
      published: stats.publishedGalleryItems,
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <section className="relative isolate overflow-hidden rounded-xl border border-sky-300/70 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 p-6 text-white shadow-lg shadow-blue-200/60 sm:p-7">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[28px] border-white/20" />
        <div className="absolute -bottom-24 left-[38%] h-44 w-44 rounded-full bg-sky-100/30 blur-2xl" />
        <div className="absolute right-24 top-8 h-2 w-2 rounded-full bg-white/70 shadow-[0_0_24px_8px_rgba(255,255,255,0.25)]" />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <TrendingUp className="h-3.5 w-3.5" />
              </span>{" "}
              Content analytics
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your school at a glance
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-sky-50/95">
              Monitor your website content, publishing progress, and community
              requests from one calm workspace.
            </p>
          </div>
          <Button
            asChild
            className="relative shrink-0 bg-white text-blue-800 shadow-sm hover:bg-blue-50 hover:text-blue-900"
          >
           
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Content published"
          value={`${publishRate}%`}
          detail={`${liveTotal} of ${contentTotal} entries are live`}
          icon={CheckCircle2}
          tone="blue"
        />
        <MetricCard
          label="Drafts to review"
          value={drafts}
          detail={
            drafts
              ? "Complete and publish pending content"
              : "Everything is currently published"
          }
          icon={PenLine}
          tone="sky"
        />
        <MetricCard
          label="Inbox attention"
          value={stats.unreadMessages}
          detail={`${stats.totalMessages} total messages received`}
          icon={Mail}
          tone={stats.unreadMessages ? "rose" : "indigo"}
        />
        <MetricCard
          label="Upcoming events"
          value={stats.upcomingEvents}
          detail={`${stats.publishedEvents} live events currently managed`}
          icon={CalendarDays}
          tone="indigo"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-lg shadow-sm xl:col-span-3">
          <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold">Content performance</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Published and draft content by section
              </p>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex">
              {contentTotal} items
            </Badge>
          </div>
          <ContentAnalyticsChart metrics={contentMetrics} />
        </Card>
        <Card className="rounded-lg shadow-sm xl:col-span-2">
          <div className="border-b px-5 py-4 sm:px-6">
            <h2 className="font-semibold">Publishing progress</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              How much of your content is visible to families
            </p>
          </div>
          <PublishingDonut published={liveTotal} total={contentTotal} />
        </Card>
      </section>

      <section>
        <Card className="rounded-lg shadow-sm">
          <div className="border-b px-5 py-4 sm:px-6">
            <h2 className="font-semibold">Recent inbox activity</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Latest messages from your contact form
            </p>
          </div>
          <CardContent className="p-2 sm:p-3">
            {stats.recentMessages.length === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
                <Mail className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium">No messages yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  New enquiries will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {stats.recentMessages.map((message: any) => (
                  <Link
                    key={message._id}
                    href="/admin/messages"
                    className="group block rounded-md px-3 py-3 transition-colors hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium">
                        {message.name}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {message.message}
                    </p>
                  </Link>
                ))}
              </div>
            )}
            <Button
              asChild
              variant="ghost"
              className="mt-2 w-full justify-between text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            >
              <Link href="/admin/messages">
                Open inbox <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Link
          href="/admin/teachers/create"
          className="group rounded-xl border border-blue-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <GraduationCap className="h-5 w-5 text-blue-700" />
          <h2 className="mt-4 font-semibold">Add a faculty profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep the teachers page current and complete.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
            Create profile{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          href="/admin/notices"
          className="group rounded-xl border border-blue-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <Megaphone className="h-5 w-5 text-blue-700" />
          <h2 className="mt-4 font-semibold">Publish an update</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Share timely news and announcements.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
            Manage notices{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          href="/admin/events"
          className="group rounded-xl border border-blue-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <ClipboardList className="h-5 w-5 text-blue-700" />
          <h2 className="mt-4 font-semibold">Plan an event</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Make upcoming school events visible to families.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
            Manage events{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          href="/admin/notifications"
          className="group rounded-xl border border-blue-100 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <Bell className="h-5 w-5 text-blue-700" />
          <h2 className="mt-4 font-semibold">Notify staff</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Send one update to all staff email addresses.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
            Open notifications{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>
    </div>
  );
}

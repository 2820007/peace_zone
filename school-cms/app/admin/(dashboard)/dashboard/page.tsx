import Link from "next/link";
import {
  GraduationCap,
  MessageSquareQuote,
  CheckCircle2,
  FileEdit,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-semibold leading-none">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">An overview of your school website content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={GraduationCap} label="Total Teachers" value={stats.totalTeachers} />
        <StatCard icon={CheckCircle2} label="Published Teachers" value={stats.publishedTeachers} />
        <StatCard icon={FileEdit} label="Draft Teachers" value={stats.draftTeachers} />
        <StatCard icon={MessageSquareQuote} label="Total Testimonials" value={stats.totalTestimonials} />
        <StatCard icon={CheckCircle2} label="Published Testimonials" value={stats.publishedTestimonials} />
        <StatCard icon={FileEdit} label="Draft Testimonials" value={stats.draftTestimonials} />
        <StatCard icon={Mail} label="Total Messages" value={stats.totalMessages} />
        <StatCard icon={Mail} label="Unread Messages" value={stats.unreadMessages} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Teachers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.recentTeachers.length === 0 && (
              <p className="text-sm text-muted-foreground">No teachers added yet.</p>
            )}
            {stats.recentTeachers.map((t: any) => (
              <div key={t._id} className="flex items-center justify-between text-sm">
                <div>
                  <Link href={`/admin/teachers/${t._id}/edit`} className="font-medium hover:underline">
                    {t.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{t.designation}</p>
                </div>
                <Badge variant={t.published ? "success" : "outline"}>
                  {t.published ? "Published" : "Draft"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Testimonials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.recentTestimonials.length === 0 && (
              <p className="text-sm text-muted-foreground">No testimonials added yet.</p>
            )}
            {stats.recentTestimonials.map((t: any) => (
              <div key={t._id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{t.message}</p>
                </div>
                <Badge variant={t.published ? "success" : "outline"}>
                  {t.published ? "Published" : "Draft"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.recentMessages.length === 0 && (
              <p className="text-sm text-muted-foreground">No messages received yet.</p>
            )}
            {stats.recentMessages.map((m: any) => (
              <div key={m._id} className="text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{m.name}</p>
                  <span className="text-xs text-muted-foreground">{formatDate(m.createdAt)}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{m.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Megaphone, Paperclip } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/public/shared";
import { getPublishedNotices } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Notices",
  description: `Official announcements and notices from ${SITE_CONFIG.name}.`,
};

export default async function NoticesPage() {
  const notices = await getPublishedNotices();

  return (
    <section className="container py-16">
      <SectionHeading eyebrow="Announcements" title="Notices" description="Official announcements from the school administration." />

      {notices.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">No notices have been posted yet.</p>
      ) : (
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {notices.map((notice: any) => (
            <Card key={notice._id}>
              <CardContent className="flex gap-4 p-6">
                <Megaphone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{formatDate(notice.createdAt)}</p>
                  <h3 className="mt-1 font-serif text-lg font-semibold">{notice.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                    {notice.content}
                  </p>
                  {notice.attachmentUrl ? (
                    <a
                      href={notice.attachmentUrl}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <Paperclip className="h-3.5 w-3.5" /> View attachment
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

import { connectToDatabase } from "@/lib/db/connect";
import Banner from "@/models/Banner";
import ContactMessage from "@/models/ContactMessage";
import Event from "@/models/Event";
import GalleryItem from "@/models/GalleryItem";
import HomeBanner from "@/models/HomeBanner";
import Notice from "@/models/Notice";
import PageView from "@/models/PageView";
import Teacher from "@/models/Teacher";
import Testimonial from "@/models/Testimonial";
import { unstable_cache } from "next/cache";
import "server-only";

/** Deep-clones and strips Mongo internals so data is safe to pass to Client Components. */
function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

function withPublicCache<TArgs extends unknown[], TResult>(
  key: string,
  callback: (...args: TArgs) => Promise<TResult>,
  revalidateSeconds = 300,
) {
  return (...args: TArgs) =>
    unstable_cache(
      async () => callback(...args),
      [`${key}:${JSON.stringify(args)}`],
      { revalidate: revalidateSeconds },
    )();
}

// ---------- PUBLIC (published === true only, enforced server-side) ----------

export const getPublishedTeachers = withPublicCache(
  "published-teachers",
  async (level?: "secondary" | "higher_secondary") => {
    await connectToDatabase();
    const teachers = await Teacher.find({
      published: true,
      ...(level ? { level } : {}),
    })
      .sort({ displayOrder: 1, name: 1 })
      .lean();
    return serialize(teachers);
  },
);

export const getPublishedTeacherBySlug = withPublicCache(
  "published-teacher-by-slug",
  async (slug: string) => {
    await connectToDatabase();
    const teacher = await Teacher.findOne({ slug, published: true }).lean();
    return teacher ? serialize(teacher) : null;
  },
);

export const getFeaturedTeachers = withPublicCache(
  "featured-teachers",
  async (limit: number = 4) => {
    await connectToDatabase();
    const teachers = await Teacher.find({ published: true })
      .sort({ displayOrder: 1 })
      .limit(limit)
      .lean();
    return serialize(teachers);
  },
);

export const getPublishedTestimonials = withPublicCache(
  "published-testimonials",
  async () => {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    return serialize(testimonials);
  },
);

export const getFeaturedTestimonials = withPublicCache(
  "featured-testimonials",
  async (limit: number = 3) => {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ published: true })
      .sort({ displayOrder: 1 })
      .limit(limit)
      .lean();
    return serialize(testimonials);
  },
);

export const getPublishedEvents = withPublicCache("published-events", async () => {
  await connectToDatabase();
  const events = await Event.find({ published: true }).sort({ startDate: 1 }).lean();
  return serialize(events);
});

export const getUpcomingEvents = withPublicCache("upcoming-events", async (limit: number = 3) => {
  await connectToDatabase();
  const events = await Event.find({ published: true, startDate: { $gte: new Date() } })
    .sort({ startDate: 1 })
    .limit(limit)
    .lean();
  return serialize(events);
});

export const getPublishedNotices = withPublicCache("published-notices", async () => {
  await connectToDatabase();
  const notices = await Notice.find({ published: true }).sort({ createdAt: -1 }).lean();
  return serialize(notices);
});

export const getPublishedGalleryItems = withPublicCache(
  "published-gallery-items",
  async () => {
    await connectToDatabase();
    const items = await GalleryItem.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    return serialize(items);
  },
);

export const getPublishedBanners = withPublicCache("published-banners", async () => {
  await connectToDatabase();
  const banners = await Banner.find({ published: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();
  return serialize(banners);
});

export const getPublishedHomeBanners = withPublicCache(
  "published-home-banners",
  async () => {
    await connectToDatabase();
    const banners = await HomeBanner.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    return serialize(banners);
  },
);

// ---------- ADMIN (all records, auth enforced by middleware + layout) ----------

export async function getAllTeachers() {
  await connectToDatabase();
  const teachers = await Teacher.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return serialize(teachers);
}

export async function getTeacherById(id: string) {
  await connectToDatabase();
  const teacher = await Teacher.findById(id).lean();
  return teacher ? serialize(teacher) : null;
}

export async function getAllTestimonials() {
  await connectToDatabase();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
  return serialize(testimonials);
}

export async function getTestimonialById(id: string) {
  await connectToDatabase();
  const testimonial = await Testimonial.findById(id).lean();
  return testimonial ? serialize(testimonial) : null;
}

export async function getAllEvents() {
  await connectToDatabase();
  const events = await Event.find({}).sort({ startDate: -1 }).lean();
  return serialize(events);
}

export async function getEventById(id: string) {
  await connectToDatabase();
  const event = await Event.findById(id).lean();
  return event ? serialize(event) : null;
}

export async function getAllNotices() {
  await connectToDatabase();
  const notices = await Notice.find({}).sort({ createdAt: -1 }).lean();
  return serialize(notices);
}

export async function getNoticeById(id: string) {
  await connectToDatabase();
  const notice = await Notice.findById(id).lean();
  return notice ? serialize(notice) : null;
}

export async function getAllGalleryItems() {
  await connectToDatabase();
  const items = await GalleryItem.find({}).sort({ createdAt: -1 }).lean();
  return serialize(items);
}

export async function getAllHomeBanners() {
  await connectToDatabase();
  const banners = await HomeBanner.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return serialize(banners);
}

export async function getAllBanners() {
  await connectToDatabase();
  const banners = await Banner.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return serialize(banners);
}

export async function getAllMessages() {
  await connectToDatabase();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
  return serialize(messages);
}

export async function getDashboardStats() {
  await connectToDatabase();
  const [
    totalTeachers,
    publishedTeachers,
    totalTestimonials,
    publishedTestimonials,
    totalMessages,
    unreadMessages,
    totalEvents,
    publishedEvents,
    upcomingEvents,
    totalNotices,
    publishedNotices,
    totalGalleryItems,
    publishedGalleryItems,
    recentTeachers,
    recentTestimonials,
    recentMessages,
  ] = await Promise.all([
    Teacher.countDocuments({}),
    Teacher.countDocuments({ published: true }),
    Testimonial.countDocuments({}),
    Testimonial.countDocuments({ published: true }),
    ContactMessage.countDocuments({}),
    ContactMessage.countDocuments({ read: false }),
    Event.countDocuments({}),
    Event.countDocuments({ published: true }),
    Event.countDocuments({ published: true, startDate: { $gte: new Date() } }),
    Notice.countDocuments({}),
    Notice.countDocuments({ published: true }),
    GalleryItem.countDocuments({}),
    GalleryItem.countDocuments({ published: true }),
    Teacher.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    Testimonial.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ContactMessage.find({}).sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return serialize({
    totalTeachers,
    publishedTeachers,
    draftTeachers: totalTeachers - publishedTeachers,
    totalTestimonials,
    publishedTestimonials,
    draftTestimonials: totalTestimonials - publishedTestimonials,
    totalMessages,
    unreadMessages,
    totalEvents,
    publishedEvents,
    upcomingEvents,
    draftEvents: totalEvents - publishedEvents,
    totalNotices,
    publishedNotices,
    draftNotices: totalNotices - publishedNotices,
    totalGalleryItems,
    publishedGalleryItems,
    draftGalleryItems: totalGalleryItems - publishedGalleryItems,
    recentTeachers,
    recentTestimonials,
    recentMessages,
  });
}

export async function getVisitorAnalytics() {
  await connectToDatabase();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const filter = { createdAt: { $gte: since } };
  const [pageViews, topPages] = await Promise.all([
    PageView.countDocuments(filter),
    PageView.aggregate([
      { $match: filter },
      { $group: { _id: "$path", views: { $sum: 1 } } },
      { $sort: { views: -1, _id: 1 } },
      { $limit: 5 },
      { $project: { _id: 0, path: "$_id", views: 1 } },
    ]),
  ]);

  return { pageViews, topPages };
}

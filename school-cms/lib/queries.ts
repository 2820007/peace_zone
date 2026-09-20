import { connectToDatabase } from "@/lib/db/connect";
import Banner from "@/models/Banner";
import ContactMessage from "@/models/ContactMessage";
import Event from "@/models/Event";
import GalleryItem from "@/models/GalleryItem";
import HomeBanner from "@/models/HomeBanner";
import Notice from "@/models/Notice";
import Teacher from "@/models/Teacher";
import Testimonial from "@/models/Testimonial";
import "server-only";

/** Deep-clones and strips Mongo internals so data is safe to pass to Client Components. */
function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

// ---------- PUBLIC (published === true only, enforced server-side) ----------

export async function getPublishedTeachers(level?: "secondary" | "higher_secondary") {
  await connectToDatabase();
  const teachers = await Teacher.find({
    published: true,
    ...(level ? { level } : {}),
  })
    .sort({ displayOrder: 1, name: 1 })
    .lean();
  return serialize(teachers);
}

export async function getPublishedTeacherBySlug(slug: string) {
  await connectToDatabase();
  const teacher = await Teacher.findOne({ slug, published: true }).lean();
  return teacher ? serialize(teacher) : null;
}

export async function getFeaturedTeachers(limit = 4) {
  await connectToDatabase();
  const teachers = await Teacher.find({ published: true })
    .sort({ displayOrder: 1 })
    .limit(limit)
    .lean();
  return serialize(teachers);
}

export async function getPublishedTestimonials() {
  await connectToDatabase();
  const testimonials = await Testimonial.find({ published: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();
  return serialize(testimonials);
}

export async function getFeaturedTestimonials(limit = 3) {
  await connectToDatabase();
  const testimonials = await Testimonial.find({ published: true })
    .sort({ displayOrder: 1 })
    .limit(limit)
    .lean();
  return serialize(testimonials);
}

export async function getPublishedEvents() {
  await connectToDatabase();
  const events = await Event.find({ published: true }).sort({ startDate: 1 }).lean();
  return serialize(events);
}

export async function getUpcomingEvents(limit = 3) {
  await connectToDatabase();
  const events = await Event.find({ published: true, startDate: { $gte: new Date() } })
    .sort({ startDate: 1 })
    .limit(limit)
    .lean();
  return serialize(events);
}

export async function getPublishedNotices() {
  await connectToDatabase();
  const notices = await Notice.find({ published: true }).sort({ createdAt: -1 }).lean();
  return serialize(notices);
}

export async function getPublishedGalleryItems() {
  await connectToDatabase();
  const items = await GalleryItem.find({ published: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();
  return serialize(items);
}

export async function getPublishedBanners() {
  await connectToDatabase();
  const banners = await Banner.find({ published: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();
  return serialize(banners);
}

export async function getPublishedHomeBanners() {
  await connectToDatabase();
  const banners = await HomeBanner.find({ published: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();
  return serialize(banners);
}

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

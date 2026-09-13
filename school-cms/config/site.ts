/**
 * Central place for placeholder content. Replace SCHOOL_IMAGES with real
 * photography, and SITE_CONFIG with your school's actual details, when ready.
 * Nothing else in the codebase should hard-code an image URL or school name.
 */

export const SITE_CONFIG = {
  name: "PeaceZone Academy",
  shortName: "peaceZone",
  tagline: "Curious minds. Confident futures.",
  description:
    "PeaceZone Academy is a K-12 school dedicated to academic excellence, character, and community — preparing every student for a confident future.",
  address: "482 Maple Grove Road, Springfield, IL 62704",
  phone: "+1 (217) 555-0142",
  email: "info@northfieldacademy.example.edu",
  socials: {
    facebook: "https://facebook.com/northfieldacademy",
    instagram: "https://instagram.com/northfieldacademy",
    youtube: "https://youtube.com/@northfieldacademy",
  },
  foundedYear: 1994,
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const SCHOOL_IMAGES = {
  hero: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80",
  campus: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
  classroom: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80",
  principal: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  aboutHero: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80",
  ctaBackground: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80",
  contactHero: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80",
  eventsHero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80",
  noticesHero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
  galleryHero: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80",
  teachersHero: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1600&q=80",
  testimonialsHero: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
  defaultAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  ],
};



export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/teachers", label: "Teachers" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];

export const ADMIN_NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/teachers", label: "Teachers", icon: "GraduationCap" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "MessageSquareQuote" },
  { href: "/admin/gallery", label: "Gallery", icon: "Image" },
  { href: "/admin/events", label: "Events", icon: "CalendarDays" },
  { href: "/admin/notices", label: "Notices", icon: "Megaphone" },
  { href: "/admin/messages", label: "Messages", icon: "Mail" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;

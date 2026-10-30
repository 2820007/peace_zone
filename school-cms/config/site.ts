/**
 * Central place for placeholder content. Replace SCHOOL_IMAGES with real
 * photography, and SITE_CONFIG with your school's actual details, when ready.
 * Nothing else in the codebase should hard-code an image URL or school name.
 */

export const SITE_CONFIG = {
  name: "Peace ",
  nextName: "Zone Academy",
  shortName: "Peace ",
  halfName:"Zone Academy",
  tagline: "Affiliated to NEB Nepal. Building futures through education.",
  description:
    "Peace Zone Academy is an NEB-affiliated college in Vishwa-15, Birgunj, offering Science, Management, and Law streams at the +2 level.",
  address: "Vishwa-15, Birgunj, Nepal",
  phone: "+977 985-5033388",
  whatsapp: "+977 9704374211",
  email: "peacezoneacademy9@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/peacezonecollege/",
    instagram: "https://www.instagram.com/peacezoneacademy9",
    website: "http://www.peacezoneacademy.edu.np/",
  },
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
  brighterFuture: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  ],
};



export type NavigationLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV_LINKS: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/programs/primary-school",
    label: "Program",
    children: [
      { href: "/programs/primary-school", label: "Primary School" },
      { href: "/programs/secondary-school", label: "Secondary School" },
      { href: "/programs/plus-two-management", label: "+2 Management" },
      { href: "/school-policies", label: "School Policies & Guidelines" },
    ],
  },
  {
    href: "/teachers",
    label: "Teacher",
    children: [
      { href: "/teachers", label: "All Teachers" },
      { href: "/teachers?level=secondary", label: "Secondary" },
      { href: "/teachers?level=higher_secondary", label: "Higher Secondary (+2)" },
    ],
  },
 {
  href: "/updates",
  label: "Updates",
  children: [
    {
      href: "/notices",
      label: "Notices",
    },
    {
      href: "/events",
      label: "Events",
    },
  ],
},
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

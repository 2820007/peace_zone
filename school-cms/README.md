# School CMS

A single Next.js (App Router) application containing both the public school
website and the admin CMS dashboard, backed by MongoDB/Mongoose.

## Stack

Next.js 14 (App Router) · TypeScript · MongoDB + Mongoose · Tailwind CSS ·
shadcn/ui (hand-vendored) + Radix UI · TanStack Table · React Hook Form + Zod ·
JWT sessions (jose) + bcrypt.

## Getting started

Do the following on your own machine:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# .env.local already ships with the demo admin credentials you requested:
#   SEED_ADMIN_EMAIL=admin@gmail.com
#   SEED_ADMIN_PASSWORD=adminpassword
# Change SESSION_SECRET to a long random string before deploying anywhere real:
#   openssl rand -base64 48
# Set these from your Cloudinary dashboard to enable admin image uploads:
#   CLOUDINARY_CLOUD_NAME
#   CLOUDINARY_API_KEY
#   CLOUDINARY_API_SECRET
# Set these Resend values to email contact form submissions to the office:
#   RESEND_API_KEY
#   CONTACT_EMAIL_TO
#   CONTACT_EMAIL_FROM (a sender address from a domain verified in Resend)

# 3. Make sure MongoDB is running locally (or point MONGODB_URI at Atlas)
#    e.g. via Docker:
docker run -d -p 27017:27017 --name school-cms-mongo mongo:7

# 4. Seed the demo admin account (reads from .env.local, hashes the password)
npm run seed

# 5. Run the dev server
npm run dev
```

Visit http://localhost:3000 for the public site and
http://localhost:3000/admin/login to sign in to the CMS with the seeded
credentials.

## Media uploads

Gallery and event fields accept local images or a YouTube video link. Images up
to 5 MB are uploaded server-side to Cloudinary; YouTube links are converted to
an in-page player URL and play directly in the browser. Existing media remains
unchanged when editing unless a replacement image or YouTube link is selected.

## Anonymous visitor analytics

The public website asks visitors before recording optional analytics. Visitors
can accept or reject, and can reopen **Cookie settings** at any time. If accepted,
the app stores only the page path and visit time in MongoDB; it does not store an
IP address, device details, referrer, or visitor ID. The admin dashboard shows
consented page views (not unique visitors) and the most-viewed pages for the
last seven days. Records expire after 12 months. This uses the existing
`MONGODB_URI`; no analytics provider or additional environment variable is
required.

## Project structure

```
app/
  (public)/        Public website routes (home, about, teachers, ...)
  admin/
    (auth)/login/  Public login route (outside the protected layout)
    (dashboard)/   Protected admin routes (dashboard, teachers, ...)
components/
  ui/              Hand-vendored shadcn/ui primitives
  public/          Public site presentational components
  admin/           Admin dashboard components (tables, forms, shell)
lib/
  db/              Mongoose connection helper
  auth/            Password hashing, JWT sessions, edge-safe verification
  validations/     Zod schemas
  queries.ts       Server-only data-fetching helpers (published filtering)
  utils.ts         cn(), slugify(), formatDate(), initials()
models/            Mongoose models (Admin, Teacher, Testimonial, Event,
                   Notice, GalleryItem, ContactMessage)
actions/           Server Actions for all CRUD operations
config/site.ts     Single source of truth for placeholder images & site text
scripts/seed-admin.ts   Seeds/updates the demo admin from env vars
middleware.ts      Protects all /admin/* routes except /admin/login
```

## Replacing placeholder content

- **Images**: everything lives in `config/site.ts` under `SCHOOL_IMAGES`.
  Replace the Unsplash URLs with your own hosted images (or Next.js
  `public/images/` assets) in one place.
- **School name, address, contact info, socials**: `SITE_CONFIG` in the same
  file.
- **Admin credentials**: change `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in
  `.env.local` and re-run `npm run seed`, or use the "Update Password" form
  under `/admin/settings` once logged in.
- **Database**: swap `MONGODB_URI` in `.env.local` for your MongoDB Atlas
  connection string when you're ready to go to production.

## Notes on what to verify after installing

Since this was hand-written without the ability to run `npm install` or a
build in the authoring environment, please run through this checklist once
dependencies are installed:

1. `npm run build` — check for any TypeScript/type errors.
2. `npm run seed` — confirm it connects to MongoDB and creates the admin user.
3. Log in at `/admin/login`, create a teacher and a testimonial, toggle
   publish/unpublish, and confirm they appear/disappear on the public
   `/teachers` and `/testimonials` pages.
4. Submit the public contact form and confirm it shows up under
   `/admin/messages`.

## Production deployment

Set the following values in your hosting provider (do not commit them):

```bash
MONGODB_URI="mongodb+srv://..."
SESSION_SECRET="a-long-random-secret-at-least-32-characters"
NEXT_PUBLIC_SITE_URL="https://www.your-school-domain.example"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
RESEND_API_KEY="re_..."
CONTACT_EMAIL_TO="office@your-school-domain.example"
CONTACT_EMAIL_FROM="Peace Zone Academy <notifications@your-school-domain.example>"
```

Before going live, change the seeded admin password, verify the Resend sender
domain, and configure MongoDB Atlas network access for the deployment host.
The app renders CMS-backed public pages dynamically, so the deployment build
does not need access to MongoDB. For faster production image optimization,
install the optional `sharp` package in the project before deploying.

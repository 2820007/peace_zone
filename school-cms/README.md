# School CMS

A single Next.js (App Router) application containing both the public school
website and the admin CMS dashboard, backed by MongoDB/Mongoose.

## Stack

Next.js 14 (App Router) · TypeScript · MongoDB + Mongoose · Tailwind CSS ·
shadcn/ui (hand-vendored) + Radix UI · TanStack Table · React Hook Form + Zod ·
JWT sessions (jose) + bcrypt.

## Getting started

This project was written entirely by hand in an environment without network
access, so dependencies have **not** been installed and the app has **not**
been run or type-checked yet. Do the following on your own machine:

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

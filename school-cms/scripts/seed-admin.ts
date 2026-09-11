/**
 * Seeds (or updates) the demo admin account from environment variables.
 * Run with: npm run seed
 *
 * Reads SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD / SEED_ADMIN_NAME from
 * .env.local. Credentials are never hard-coded here and never printed
 * except for a confirmation of which email was seeded.
 */
import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || "Site Administrator";
  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error("MONGODB_URI is not set in .env.local");
  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env.local"
    );
  }
  if (password.length < 8) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 8 characters.");
  }

  await mongoose.connect(uri);

  const passwordHash = await hashPassword(password);

  const admin = await Admin.findOneAndUpdate(
    { email: email.toLowerCase() },
    { name, email: email.toLowerCase(), passwordHash, role: "admin" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Seeded admin account for: ${admin.email}`);
  console.log("You can now log in at /admin/login with the credentials from .env.local.");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

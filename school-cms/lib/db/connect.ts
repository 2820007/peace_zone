import mongoose from "mongoose";
import { logServerError } from "@/lib/errors";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not set. Add it to your .env.local file (see .env.example)."
  );
}

/**
 * In development, Next.js hot-reloads modules, which would otherwise create a
 * new connection on every change. We cache the connection on the global
 * object so it survives module reloads.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };

if (!global._mongooseCache) {
  global._mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
      // Fail predictably instead of leaving requests or deployments waiting on
      // an unreachable database server.
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    logServerError("database connection failed", err);
    throw err;
  }

  return cached.conn;
}

export default connectToDatabase;

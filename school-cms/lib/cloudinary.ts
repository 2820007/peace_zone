import "server-only";

import { createHash } from "crypto";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_FOLDER = "school-cms";

/** Uploads an image to Cloudinary and returns its permanent HTTPS URL. */
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured. Add the Cloudinary variables to .env.local.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`folder=${IMAGE_FOLDER}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const body = new FormData();
  body.append("file", file, file.name);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("folder", IMAGE_FOLDER);
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { secure_url?: string; error?: { message?: string } };
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Cloudinary could not upload the image.");
  }
  return result.secure_url;
}

/** Keeps an existing URL when no replacement image was selected. */
export async function imageValueFromForm(formData: FormData): Promise<string> {
  const image = formData.get("image");
  if (image instanceof File) return image.size > 0 ? uploadImage(image) : "";
  return typeof image === "string" ? image : "";
}

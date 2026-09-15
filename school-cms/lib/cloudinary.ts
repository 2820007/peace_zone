import "server-only";

import { createHash } from "crypto";

const MAX_IMAGE_SIZE = 50 * 1024 * 1024;
const MEDIA_FOLDER = "school-cms";

export type MediaType = "image" | "video";

/** Uploads an image to Cloudinary and returns its permanent HTTPS URL. */
export async function uploadMedia(file: File): Promise<{ url: string; type: MediaType }> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be 50 MB or smaller.");
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured. Add the Cloudinary variables to .env.local.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`folder=${MEDIA_FOLDER}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const body = new FormData();
  body.append("file", file, file.name);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("folder", MEDIA_FOLDER);
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { secure_url?: string; error?: { message?: string } };
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Cloudinary could not upload the media file.");
  }
  return { url: result.secure_url, type: "image" };
}

/** Backward-compatible image-only upload used by non-media CMS sections. */
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  return (await uploadMedia(file)).url;
}

/** Keeps an existing URL when no replacement media file was selected. */
export async function mediaValueFromForm(formData: FormData): Promise<{ url: string; type?: MediaType }> {
  const media = formData.get("media");
  if (media instanceof File) return media.size > 0 ? uploadMedia(media) : { url: "" };
  return { url: typeof media === "string" ? media : "" };
}

/** Backward-compatible form helper for image-only CMS sections. */
export async function imageValueFromForm(formData: FormData): Promise<string> {
  const image = formData.get("image");
  if (image instanceof File) return image.size > 0 ? uploadImage(image) : "";
  return typeof image === "string" ? image : "";
}

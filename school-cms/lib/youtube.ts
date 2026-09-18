/** Converts common YouTube links into a privacy-enhanced embed URL. */
export function getYouTubeEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let id = "";

    if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    if (host === "youtube.com" || host === "m.youtube.com") {
      id = url.searchParams.get("v") || "";
      if (!id && (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/"))) {
        id = url.pathname.split("/")[2] || "";
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

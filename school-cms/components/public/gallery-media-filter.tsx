"use client";

import { ImageIcon, Play, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
  mediaType?: "image" | "video" | "youtube";
};

function isYouTubeUrl(value: string) {
  return /(?:youtube(?:-nocookie)?\.com|youtu\.be)/i.test(value);
}

function isVideo(item: GalleryItem) {
  return item.mediaType === "video" || item.mediaType === "youtube" || isYouTubeUrl(item.image);
}

function getYouTubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const videoId = url.hostname.includes("youtu.be")
      ? url.pathname.slice(1)
      : url.searchParams.get("v") || url.pathname.split("/").pop();

    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function GalleryMediaFilter({ items }: { items: GalleryItem[] }) {
  const [activeType, setActiveType] = useState<"image" | "video">("image");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const visibleItems = useMemo(
    () => items.filter((item) => (activeType === "video" ? isVideo(item) : !isVideo(item))),
    [activeType, items]
  );

  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-white p-1.5 shadow-sm" role="tablist" aria-label="Gallery media type">
          <button
            type="button"
            role="tab"
            aria-selected={activeType === "image"}
            onClick={() => setActiveType("image")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-7 ${activeType === "image" ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}`}
          >
            <ImageIcon className="h-4 w-4" /> Images
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeType === "video"}
            onClick={() => setActiveType("video")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-7 ${activeType === "video" ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}`}
          >
            <Play className="h-4 w-4" /> Videos
          </button>
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">No {activeType === "image" ? "images" : "videos"} available yet.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => {
            const embedUrl = item.mediaType === "youtube" || isYouTubeUrl(item.image) ? getYouTubeEmbedUrl(item.image) : null;

            return (
              <article key={item._id} className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative aspect-video bg-secondary">
                  {embedUrl ? (
                    <iframe src={embedUrl} title={item.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  ) : activeType === "video" ? (
                    <video src={item.image} controls preload="metadata" className="h-full w-full object-cover" />
                  ) : (
                    <button type="button" onClick={() => setSelectedImage(item)} className="group absolute inset-0 block w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label={`View ${item.title} in full size`}>
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/20" />
                      <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary opacity-0 shadow transition group-hover:opacity-100">View photo</span>
                    </button>
                  )}
                </div>
                <p className="p-4 text-sm font-semibold text-primary">{item.title}</p>
              </article>
            );
          })}
        </div>
      )}

      {selectedImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={`Full-size image: ${selectedImage.title}`} onClick={() => setSelectedImage(null)}>
          <div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={selectedImage.image} alt={selectedImage.title} width={1600} height={1200} sizes="(max-width: 1280px) 100vw, 1200px" className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl" />
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute -right-2 -top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Close image viewer">
              <X className="h-5 w-5" />
            </button>
            <p className="mt-3 text-center text-sm font-medium text-white">{selectedImage.title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

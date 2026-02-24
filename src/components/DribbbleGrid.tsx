"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect, useCallback } from "react";

const DRIBBBLE_BASE = "/images/dribbble";

/** Image-only Dribbble items for use in galleries that don't support video */
export const DRIBBBLE_IMAGES: { src: string; alt: string }[] = [
  { src: `${DRIBBBLE_BASE}/14.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/15.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/16.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/17.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/18.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/19.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/20.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/21.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/22.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/23.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/24.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/25.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/26.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/27.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/28.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/30.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/31.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/32.webp`, alt: "Dribbble shot" },
  { src: `${DRIBBBLE_BASE}/33.webp`, alt: "Dribbble shot" },
];

const DRIBBBLE_ITEMS: { src: string; type: "image" | "video" }[] = [
  { src: `${DRIBBBLE_BASE}/05.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/06.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/07.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/08.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/09.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/10.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/11.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/12.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/13.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/14.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/15.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/16.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/17.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/18.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/19.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/20.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/21.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/22.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/23.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/24.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/25.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/26.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/27.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/28.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/29.mp4`, type: "video" },
  { src: `${DRIBBBLE_BASE}/30.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/31.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/32.webp`, type: "image" },
  { src: `${DRIBBBLE_BASE}/33.webp`, type: "image" },
];

/** All Dribbble items (images + videos) for use in MovingImageGallery */
export const DRIBBBLE_GALLERY_ITEMS: { src: string; alt: string; type: "image" | "video" }[] =
  DRIBBBLE_ITEMS.map((item) => ({ ...item, alt: "Dribbble shot" }));

export function DribbbleGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);
  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    const t = setTimeout(() => {
      setLightboxIndex(null);
      setIsClosing(false);
      setIsAnimatingIn(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const id = requestAnimationFrame(() => setIsAnimatingIn(true));
    return () => cancelAnimationFrame(id);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? DRIBBBLE_ITEMS.length - 1 : lightboxIndex - 1
    );
  }, [lightboxIndex]);
  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === DRIBBBLE_ITEMS.length - 1 ? 0 : lightboxIndex + 1
    );
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const active = lightboxIndex !== null ? DRIBBBLE_ITEMS[lightboxIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2">
        {DRIBBBLE_ITEMS.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => openLightbox(index)}
            className="group border-border bg-surface relative aspect-4/3 w-full
              cursor-zoom-in overflow-hidden"
            aria-label={`View Dribbble shot ${index + 1}`}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                className="absolute inset-0 h-full w-full object-cover
                  transition-opacity group-hover:opacity-95"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            ) : (
              <ExportedImage
                src={item.src}
                alt={`Dribbble shot ${index + 1}`}
                fill
                className="object-cover transition-opacity
                  group-hover:opacity-95"
                sizes="(max-width: 640px) 50vw, 260px"
              />
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox"
          className={`fixed inset-0 z-50 flex cursor-zoom-out items-center
          justify-center bg-black/50 p-4 backdrop-blur-md transition-opacity
          duration-200 ease-out ${
            isAnimatingIn && !isClosing ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLightbox}
        >
          <div
            className={`relative flex max-h-[92vh] max-w-[92vw] items-center
            justify-center transition-transform duration-200 ease-out ${
              isAnimatingIn && !isClosing ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {DRIBBBLE_ITEMS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="text-button absolute left-2 top-1/2 z-10 -translate-y-1/2
                    rounded-full border border-border bg-surface/90 p-2 text-foreground
                    opacity-80 backdrop-blur-sm transition hover:opacity-100
                    focus:outline-none focus-visible:ring-1 focus-visible:ring-border-strong
                    focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="text-button absolute right-2 top-1/2 z-10 -translate-y-1/2
                    rounded-full border border-border bg-surface/90 p-2 text-foreground
                    opacity-80 backdrop-blur-sm transition hover:opacity-100
                    focus:outline-none focus-visible:ring-1 focus-visible:ring-border-strong
                    focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
            <div
              className="bg-background relative h-[92vh] w-[92vw] max-h-[92vh]
                max-w-[92vw] overflow-hidden rounded-sm shadow-lg"
            >
              {active.type === "video" ? (
                <video
                  src={active.src}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <ExportedImage
                  src={active.src}
                  alt="Dribbble shot"
                  fill
                  className="object-contain"
                  sizes="92vw"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

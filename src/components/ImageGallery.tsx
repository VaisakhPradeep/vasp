"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

function VideoSequencePlayer({
  videos,
  className,
  aspectRatio = "3/2",
  objectFit = "cover",
  muted = true,
  autoPlay = true,
  controls = false,
}: {
  videos: string[];
  className?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  muted?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = useCallback(() => {
    setIndex((i) => (i + 1) % videos.length);
  }, [videos.length]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    // Delay play slightly so the video is visible (helps with lightbox mounting)
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => v.play().catch(() => {}));
    });
    return () => cancelAnimationFrame(id);
  }, [index, videos]);

  if (videos.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        src={videos[index]}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit }}
        muted={muted}
        loop={false}
        playsInline
        autoPlay={autoPlay}
        controls={controls}
        onEnded={handleEnded}
        preload="auto"
      />
    </div>
  );
}

export type GalleryImage =
  | { src: string; alt: string; width?: number; height?: number }
  | { videos: string[]; alt: string };

function isVideo(src: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(src);
}

function isVideoSequence(
  item: GalleryImage
): item is { videos: string[]; alt: string } {
  return "videos" in item && Array.isArray(item.videos) && item.videos.length > 0;
}

type ImageGalleryProps = {
  images: GalleryImage[];
  /** Main image dimensions */
  mainWidth?: number;
  mainHeight?: number;
  /** Image quality (use higher for UI screenshots) */
  quality?: number;
};

export function ImageGallery({
  images,
  mainWidth = 1200,
  mainHeight = 800,
  quality = 100,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    const t = setTimeout(() => {
      setLightboxOpen(false);
      setIsClosing(false);
      setIsAnimatingIn(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const id = requestAnimationFrame(() => setIsAnimatingIn(true));
    return () => cancelAnimationFrame(id);
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (images.length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [lightboxOpen, closeLightbox, images.length]);

  if (images.length === 0) return null;

  const activeMedia = images[activeIndex];
  const activeIsVideo =
    "src" in activeMedia && isVideo(activeMedia.src);
  const activeIsVideoSequence = isVideoSequence(activeMedia);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={openLightbox}
        className="group focus-visible:ring-border-strong
          focus-visible:ring-offset-background relative block w-full
          cursor-zoom-in overflow-hidden"
        aria-label={`Zoom into ${activeMedia.alt}`}
      >
        {activeIsVideoSequence ? (
          <VideoSequencePlayer
            videos={activeMedia.videos}
            aspectRatio={`${mainWidth}/${mainHeight}`}
            className="transition-opacity group-hover:opacity-95"
          />
        ) : activeIsVideo ? (
          <div
            className="w-full overflow-hidden"
            style={{ aspectRatio: `${mainWidth}/${mainHeight}` }}
          >
            <video
              src={activeMedia.src}
              className="h-full w-full object-cover transition-opacity
                group-hover:opacity-95"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
            />
          </div>
        ) : (
          <Image
            src={activeMedia.src}
            alt={activeMedia.alt}
            width={mainWidth}
            height={mainHeight}
            className="h-auto w-full object-cover transition-opacity
              group-hover:opacity-95"
            sizes="(max-width: 520px) 100vw, 520px"
            quality={quality}
            priority
          />
        )}
      </button>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${activeMedia.alt}`}
          className={`fixed inset-0 z-50 flex cursor-zoom-out items-center
          justify-center bg-black/50 p-4 backdrop-blur-md transition-opacity
          duration-200 ease-out ${
            isAnimatingIn && !isClosing ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLightbox}
        >
          <div
            className={`relative flex max-h-[90vh] max-w-[90vw] items-center
            justify-center transition-transform duration-200 ease-out ${
              isAnimatingIn && !isClosing ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
              style={{
                width: `min(90vw, 90vh * ${mainWidth / mainHeight})`,
                aspectRatio: `${mainWidth}/${mainHeight}`,
              }}
            >
              {activeIsVideoSequence ? (
                <VideoSequencePlayer
                  key="lightbox-video-sequence"
                  videos={activeMedia.videos}
                  aspectRatio={`${mainWidth}/${mainHeight}`}
                  className="absolute inset-0 h-full w-full"
                  objectFit="contain"
                  muted
                  controls
                />
              ) : activeIsVideo ? (
                <video
                  src={activeMedia.src}
                  className="absolute inset-0 h-full w-full object-contain"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={quality}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => {
            const isVideoSeq = isVideoSequence(img);
            const isVideoItem =
              !isVideoSeq && "src" in img && isVideo(img.src);
            const thumbSrc = isVideoSeq
              ? img.videos[0]
              : "src" in img
                ? img.src
                : "";
            return (
              <button
                key={`${thumbSrc}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`border-border focus-visible:ring-border-strong
                focus-visible:ring-offset-background relative aspect-video w-full
                overflow-hidden border transition-opacity focus:outline-none
                focus-visible:ring-1 focus-visible:ring-offset-0
                focus-visible:ring-inset ${
                  i === activeIndex
                    ? `opacity-100
                      shadow-[inset_0_0_0_2px_var(--neutral-overlay-3)]`
                    : "opacity-40 hover:opacity-90"
                }`}
                aria-label={`View ${img.alt}`}
                aria-pressed={i === activeIndex}
              >
                {isVideoItem || isVideoSeq ? (
                  <video
                    src={thumbSrc}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={"src" in img ? img.src : ""}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 520px) 25vw, 124px"
                    quality={quality}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

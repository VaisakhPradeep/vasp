"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState, useCallback } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

type MovingImageGalleryProps = {
  images: GalleryImage[];
  /** Height of each row in pixels (fixed). Width per item follows natural aspect ratio. */
  imageHeight?: number;
  /** Fallback aspect ratio (width/height) before natural dimensions load. Default 1.5 (3:2). */
  aspectRatio?: number;
  /** Gap between items in pixels */
  gap?: number;
  /** Duration for one full loop in seconds (lower = faster). Takes precedence over speed when both set. */
  duration?: number;
  /** Speed multiplier. 1 = default, 2 = twice as fast, 0.5 = half speed. Ignored if duration is set. */
  speed?: number;
};

const DEFAULT_DURATION_SEC = 20;
const DEFAULT_ASPECT_RATIO = 1.5;

function GalleryCell({
  item,
  sourceIndex,
  imageHeight,
  defaultWidth,
  measuredWidth,
  onMeasured,
}: {
  item: GalleryImage;
  sourceIndex: number;
  imageHeight: number;
  defaultWidth: number;
  measuredWidth: number | null;
  onMeasured: (index: number, width: number) => void;
}) {
  const width = measuredWidth ?? defaultWidth;
  const isVideo = item.type === "video";

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const el = e.currentTarget;
      const naturalWidth = el.naturalWidth;
      const naturalHeight = el.naturalHeight;
      if (naturalHeight > 0) {
        onMeasured(sourceIndex, imageHeight * (naturalWidth / naturalHeight));
      }
    },
    [sourceIndex, imageHeight, onMeasured]
  );

  const handleVideoLoadedMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const el = e.currentTarget;
      const w = el.videoWidth;
      const h = el.videoHeight;
      if (h > 0) {
        onMeasured(sourceIndex, imageHeight * (w / h));
      }
    },
    [sourceIndex, imageHeight, onMeasured]
  );

  return (
    <div
      className="border-border relative shrink-0 overflow-hidden border"
      style={{ width, height: imageHeight }}
    >
      {isVideo ? (
        <video
          src={item.src}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedMetadata={handleVideoLoadedMetadata}
          aria-label={item.alt}
        />
      ) : (
        <ExportedImage
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 520px) 200px, 300px"
          loading="eager"
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
}

export function MovingImageGallery({
  images,
  imageHeight = 200,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  gap = 16,
  duration,
  speed = 1,
}: MovingImageGalleryProps) {
  const defaultWidth = imageHeight * aspectRatio;
  const [widths, setWidths] = useState<(number | null)[]>(() =>
    images.map(() => null)
  );

  const handleMeasured = useCallback((index: number, width: number) => {
    setWidths((prev) => {
      const next = [...prev];
      next[index] = width;
      return next;
    });
  }, []);

  if (images.length === 0) return null;

  const durationSec =
    duration ?? (speed > 0 ? DEFAULT_DURATION_SEC / speed : DEFAULT_DURATION_SEC);

  // Triple the set for seamless loop
  const infiniteImages = [...images, ...images, ...images];

  return (
    <div
      className="group -mx-[max(0px,calc((100vw-var(--container-max))/2))]
        overflow-hidden"
    >
      <div
        className="animate-marquee flex flex-nowrap
          group-hover:[animation-play-state:paused]"
        style={{
          gap: `${gap}px`,
          width: "max-content",
          willChange: "transform",
          "--marquee-duration": durationSec,
        } as React.CSSProperties}
      >
        {infiniteImages.map((img, i) => {
          const sourceIndex = i % images.length;
          return (
            <GalleryCell
              key={`${img.src}-${i}`}
              item={img}
              sourceIndex={sourceIndex}
              imageHeight={imageHeight}
              defaultWidth={defaultWidth}
              measuredWidth={widths[sourceIndex]}
              onMeasured={handleMeasured}
            />
          );
        })}
      </div>
    </div>
  );
}

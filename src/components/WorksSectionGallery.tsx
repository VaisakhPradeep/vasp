"use client";

import { useMemo } from "react";
import {
  MovingImageGallery,
  type GalleryImage,
} from "@/components/MovingImageGallery";
import { DRIBBBLE_GALLERY_ITEMS } from "@/components/DribbbleGrid";

const PROJECT_IMAGES: GalleryImage[] = [
  { src: "/images/jora_web_app/jora1.png", alt: "Jora web app", type: "image" },
  { src: "/images/jora_web_app/jora3.png", alt: "Jora web app", type: "image" },
  { src: "/images/jora_web_app/jora4.png", alt: "Jora web app", type: "image" },
  {
    src: "/images/jora_website/jora_web1.png",
    alt: "Jora website",
    type: "image",
  },
  { src: "/images/ra_web_app/ra3.png", alt: "RA web app", type: "image" },
  { src: "/images/ra_web_app/ra4.png", alt: "RA web app", type: "image" },
  { src: "/images/askcal/ask_cal1.png", alt: "Ask Cal", type: "image" },
];

function shuffle<T>(array: T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function WorksSectionGallery() {
  const items = useMemo(
    () => shuffle([...PROJECT_IMAGES, ...DRIBBBLE_GALLERY_ITEMS]),
    []
  );

  return (
    <MovingImageGallery
      images={items}
      imageHeight={216}
      aspectRatio={520 / 326}
      gap={12}
      duration={80}
    />
  );
}

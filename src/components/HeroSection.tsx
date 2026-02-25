"use client";

import { useState } from "react";
import { HeroHoverContext } from "./HeroIntro";

export function HeroSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeroHoverContext.Provider value={isHovered}>
        {children}
      </HeroHoverContext.Provider>
    </section>
  );
}

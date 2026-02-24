"use client";

import Link from "next/link";

const NAV_LINK_CLASS = "text-section-label text-foreground hover:opacity-80";

const NAV_LINKS = [
  { label: "WORK", href: "/works" },
  { label: "ABOUT", href: "/about" },
  { label: "GARAGE", href: "/garage" },
  { label: "CONTACT", href: "mailto:vaspdesigns@gmail.com" },
] as const;

export function Navbar() {
  return (
    <header
      className="border-border bg-background/95 sticky top-0 z-10 border-b
        backdrop-blur"
    >
      <div
        className="max-w-page border-border mx-auto border-r border-l px-5 py-4"
      >
        <nav className="flex items-center justify-between gap-6">
          <Link href="/" className={NAV_LINK_CLASS}>
            VASP
          </Link>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className={NAV_LINK_CLASS}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}

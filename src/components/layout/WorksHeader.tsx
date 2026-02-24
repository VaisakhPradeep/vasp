"use client";

import { useEffect, useState } from "react";

export function WorksHeader({
  title = "PROFESSIONAL",
  showProjectNav = true,
  projectCount = 3,
  sectionId,
}: {
  title?: string;
  showProjectNav?: boolean;
  projectCount?: number;
  sectionId?: string;
}) {
  const projects = Array.from({ length: projectCount }, (_, i) =>
    String(i + 1)
  );
  const [activeProject, setActiveProject] = useState<string>(
    projects[0] ?? "1"
  );

  const SCROLL_OFFSET = 100;
  const SCROLL_SPY_TRIGGER = 120;

  useEffect(() => {
    if (!sectionId) return;

    const updateActiveFromScroll = () => {
      let active = "1";
      for (let i = 0; i < projectCount; i++) {
        const el = document.getElementById(`${sectionId}-${i + 1}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= SCROLL_SPY_TRIGGER) {
            active = String(i + 1);
          }
        }
      }
      setActiveProject(active);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveFromScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionId, projectCount]);

  const handleProjectClick = (project: string) => {
    setActiveProject(project);
    if (sectionId) {
      const el = document.getElementById(`${sectionId}-${project}`);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className="border-border bg-background/95 sticky top-12 z-9
        overflow-hidden border-b backdrop-blur"
    >
      {/* Line pattern overlay – original pattern with transparent gaps so blur shows through */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(to right, color-mix(in srgb, var(--color-border) 50%, transparent) 0, color-mix(in srgb, var(--color-border) 50%, transparent) 1px, transparent 1px, transparent 6px)`,
          backgroundSize: "calc(100% - 12px) 100%",
        }}
      />
      <div
        className="max-w-page relative mx-auto flex items-center justify-between
          px-5 py-4"
      >
        <div className="flex items-center gap-2">
          <span className="text-section-label text-muted!">{title}</span>
        </div>
        {showProjectNav && (
          <div className="flex items-center">
            {projects.map((project) => (
              <button
                key={project}
                type="button"
                onClick={() => handleProjectClick(project)}
                className={`text-label cursor-pointer px-3 py-1
                transition-colors ${
                  activeProject === project
                    ? "text-subtle!"
                    : "text-muted-alpha! hover:bg-surface/50 hover:text-muted!"
                }`}
              >
                {project}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

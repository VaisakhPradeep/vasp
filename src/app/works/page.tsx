import { RiArrowRightUpLine } from "@remixicon/react";
import { DottedLink } from "@/components/ui/DottedLink";
import { WorksHeader } from "@/components/layout/WorksHeader";
import { ImageGallery } from "@/components/ImageGallery";

type WorkMetadata = Record<string, string>;

type WorkItem = {
  label: string;
  url?: string;
  meta: string;
  title: string;
  description: string;
  images: Array<
    { src: string; alt: string } | { videos: string[]; alt: string }
  >;
  metadata?: WorkMetadata;
  mainWidth?: number;
  mainHeight?: number;
};

function WorkSection({ work, id }: { work: WorkItem; id?: string }) {
  return (
    <section id={id}>
      <div className="section-pad">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-section-label">
            {work.url ? (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-subtle inline-flex
                  items-start gap-1 transition-colors"
              >
                {work.label}
                <RiArrowRightUpLine
                  size={12}
                  className="text-foreground relative top-0.75 shrink-0
                    self-start"
                />
              </a>
            ) : (
              work.label
            )}
          </p>
          <p className="text-section-label text-muted-alpha! pt-1">
            {work.meta}
          </p>
        </div>
        <h1 className="text-display text-accent mb-4">{work.title}</h1>
        {"metadata" in work && work.metadata ? (
          <div
            className="border-border mb-6 border-t border-b border-dashed py-3"
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {Object.entries(work.metadata as WorkMetadata).map(
                ([key, value]) => (
                  <div key={key}>
                    <p className="text-section-label text-muted! mb-0.5">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="text-body text-subtle">{value}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          {work.description
            .split(/\n+/)
            .filter(Boolean)
            .map((paragraph, i) => {
              const text = paragraph.trim();
              const isFuticons =
                work.url === "https://futicons.com" &&
                text.includes("Futicons");
              const isImageHues =
                work.url === "https://imagehues.com" &&
                text.includes("ImageHues");
              if (isFuticons) {
                const [before, after] = text.split("Futicons", 2);
                return (
                  <p key={i} className="text-body text-subtle">
                    {before}
                    <DottedLink
                      href="https://futicons.com"
                      openInNewTab
                      className="text-subtle hover:text-muted"
                    >
                      Futicons
                    </DottedLink>
                    {after}
                  </p>
                );
              }
              if (isImageHues) {
                const [before, after] = text.split("ImageHues", 2);
                return (
                  <p key={i} className="text-body text-subtle">
                    {before}
                    <DottedLink
                      href="https://imagehues.com"
                      openInNewTab
                      className="text-subtle hover:text-muted"
                    >
                      ImageHues
                    </DottedLink>
                    {after}
                  </p>
                );
              }
              return (
                <p key={i} className="text-body text-subtle">
                  {text}
                </p>
              );
            })}
        </div>
      </div>
      <div className="mb-6">
        <ImageGallery
          images={work.images}
          mainWidth={"mainWidth" in work ? work.mainWidth : undefined}
          mainHeight={"mainHeight" in work ? work.mainHeight : undefined}
        />
      </div>
    </section>
  );
}

const PROFESSIONAL_WORKS = [
  {
    label: "Jora web app",
    url: "https://joralaw.app",
    meta: "2023 → Present",
    metadata: {
      role: "Founding Product Designer",
      type: "Legal-tech SaaS",
      scope: "0→1, AI-native workflow system",
      status: "Live, multi-firm adoption",
    } satisfies WorkMetadata,
    title:
      "Designing a complex legal workflow system used by real estate lawyers.",
    description: `Jora is a legal-tech SaaS platform built for real estate law firms to manage property transactions from start to finish. It brings together task tracking, document generation, client and lender coordination, financial workflows, and AI-assisted automation into a single structured system. The platform is now used by multiple firms across Canadian provinces.
I designed Jora from 0 to 1 as the sole product designer over three years, working in close collaboration with the CEO, CTO, and Head of Product. Together with lawyers, paralegals, and engineers, we defined the core workflow architecture, established the design system from scratch, and shaped AI-native experiences that integrate automation directly into everyday legal tasks. The product evolved through continuous iteration based on real user feedback. I also partnered closely with engineering during implementation, contributing production pull requests for UI and style improvements while aligning product direction with practical user needs.`,
    images: [
      { src: "/images/jora_web_app/jora1.png", alt: "Jora – main view" },
      { src: "/images/jora_web_app/jora2.png", alt: "Jora – My Stages" },
      { src: "/images/jora_web_app/jora3.png", alt: "Jora – My Work Areas" },
      { src: "/images/jora_web_app/jora4.png", alt: "Jora – My Watchlist" },
    ],
  },
  {
    label: "Jora website",
    url: "https://jora.ai",
    meta: "December 2024",
    metadata: {
      role: "Product Designer and Frontend Developer",
      type: "Marketing Website",
      scope: "Design, motion, animation, development",
      status: "Live",
    } satisfies WorkMetadata,
    title:
      "Designing and building the marketing website for a legal-tech SaaS platform.",
    description: `The Jora website is the public-facing marketing platform for the legal-tech SaaS product. It communicates product value, workflow clarity, and AI-native positioning to real estate law firms, translating a complex system into a clear and compelling narrative.
I led the project end to end, owning design, visual direction, motion graphics, animation, and frontend development. Working closely with the COO on positioning, messaging, and content strategy, I shaped the brand expression and interaction language to reflect product maturity while keeping the experience fast, minimal, and conversion focused.`,
    mainWidth: 2160,
    mainHeight: 1350,
    images: [
      { src: "/images/jora_website/jora_web1.png", alt: "Project – view 1" },
      {
        videos: [
          "/images/jora_website/videos/Automation.mp4",
          "/images/jora_website/videos/Collaboration.mp4",
          "/images/jora_website/videos/Communication.mp4",
          "/images/jora_website/videos/Guidance.mp4",
          "/images/jora_website/videos/Production.mp4",
        ],
        alt: "Jora website – features",
      },
      { src: "/images/jora_website/jora_web3.png", alt: "Project – view 3" },
      { src: "/images/jora_website/jora_web4.png", alt: "Project – view 4" },
    ],
  },
  {
    label: "RA Sanctuary web app",
    url: "https://sanctuary.co",
    meta: "2024",
    metadata: {
      role: "Product Designer and Frontend Developer",
      type: "Construction-tech SaaS",
      scope: "0→1 product, real-time visualization workflows",
      status: "Beta release with strong user feedback",
    } satisfies WorkMetadata,
    title:
      "Designing a custom home configuration platform for North American custom home builders.",
    description: `This platform is a custom home design and configuration system built for the North American market. It allows users to select location and plot constraints, customize exterior and interior styles room by room, view real-time pricing based on a bill of materials database, and generate high-quality visualizations and full technical documentation aligned with regional building codes.
I led the product design from 0 to 1, collaborating closely with architects, BIM specialists, visualization teams, the CEO, and sales stakeholders. I defined the configuration workflows, pricing experience, and documentation generation flows, and also contributed to frontend implementation. The product reached beta during my tenure and received strong feedback for clarity, usability, and pricing transparency.`,
    images: [
      { src: "/images/ra_web_app/ra1.png", alt: "Project – view 1" },
      { src: "/images/ra_web_app/ra2.png", alt: "Project – view 2" },
      { src: "/images/ra_web_app/ra3.png", alt: "Project – view 3" },
      { src: "/images/ra_web_app/ra4.png", alt: "Project – view 4" },
    ],
  },
];

const PERSONAL_WORKS = [
  {
    label: "Ask Cal",
    meta: "2026 → Present",
    metadata: {
      role: "Product design, AI-assisted frontend and backend development",
      type: "Side project / AI knowledge interface",
      scope:
        "Transcript pipeline, embeddings, semantic retrieval, chat UI, citation system",
      status: "In progress",
    } satisfies WorkMetadata,
    title: "Building a personal AI mentor over 300 hours of podcast content.",
    description: `I have been listening to Cal Newport's Deep Questions podcast for the past three years. Many of his ideas resonate deeply with me, but with nearly 300 hour-long episodes, revisiting specific concepts became difficult. Ask Cal started as a personal experiment to build a searchable AI mentor over that archive. Users can ask questions in natural language and receive grounded answers in context, with exact episode titles and timestamps that link directly to the source clip. The focus was on retrieval, attribution, and trust rather than imitation.
I designed and built the system end to end, using LLMs as collaborators for both backend and frontend development. The product is powered by a full RAG pipeline including transcript ingestion, sentence-aware chunking, Gemini embeddings, and PostgreSQL with pgvector for semantic search. The chat flow retrieves relevant transcript segments and constrains generation strictly to that context. On the front end, I designed a minimal, content-first interface with expandable citations to ensure clarity and traceability.`,
    images: [
      { src: "/images/askcal/ask_cal1.png", alt: "Ask Cal – view 1" },
      { src: "/images/askcal/ask_cal2.png", alt: "Ask Cal – view 2" },
      { src: "/images/askcal/ask_cal3.png", alt: "Ask Cal – view 3" },
      { src: "/images/askcal/ask_cal4.png", alt: "Ask Cal – view 4" },
    ],
  },
  {
    label: "Futicons",
    url: "https://futicons.com",
    meta: "2022",
    metadata: {
      role: "Icon designer, frontend developer",
      type: "Side project / Digital product",
      scope:
        "Icon system design, visual language, marketing website, Product Hunt launch",
      status: "Live, revenue generating",
    } satisfies WorkMetadata,
    title: "Designing a niche icon system for emerging technologies.",
    description: `Futicons began as a side experiment when I struggled to find cohesive icons for virtual reality, augmented reality, and early AI products. This was before the generative AI surge, and most icon libraries did not cover emerging technologies in a consistent visual style. I designed a focused icon system for future-facing products, exploring communication with minimal line work.
I created the entire icon set in Figma and built the marketing site independently. The project launched in the Top 10 on Product Hunt with over 150 upvotes. Tens of thousands of users have downloaded the free version, hundreds have purchased the full set, and it continues to receive steady organic traffic years later. What started as a niche spare-time experiment became a validated digital product with long-term traction.`,
    images: [
      { src: "/images/futicons/futicons1.png", alt: "Futicons – view 1" },
      { src: "/images/futicons/futicons2.png", alt: "Futicons – view 2" },
      { src: "/images/futicons/futicons3.png", alt: "Futicons – view 3" },
      { src: "/images/futicons/futicons4.png", alt: "Futicons – view 4" },
    ],
  },
  {
    label: "ImageHues",
    meta: "2018",
    url: "https://imagehues.com",
    metadata: {
      role: "Visual designer, frontend developer",
      type: "Side project / Design utility",
      scope:
        "Concept, UI design, color system integration, frontend development, Product Hunt launch",
      status: "Live, long-term organic usage",
    } satisfies WorkMetadata,
    title: "Building a visual color palette exploration tool for designers.",
    description: `ImageHues started as a weekend experiment after I struggled to find a better way to choose color palettes while designing interfaces and illustrations. The idea came during a cold shower: what if curated imagery could directly generate usable color combinations? I built a simple tool that paired images with auto-generated palettes, allowing designers to explore hues in a more visual and intuitive way.
I designed and developed the product over a weekend and launched it for free on Product Hunt. It was featured in multiple design blogs and gained strong initial traction, with continued long-term usage averaging around 50 visitors per day even years later. The tool used curated Unsplash images and an open source color extraction library to generate palettes. Looking back, parts of the design feel dated, but the project taught me early lessons in shipping quickly, validating ideas publicly, and building small tools that solve real creative problems.`,
    images: [
      { src: "/images/imagehues/imagehues1.png", alt: "ImageHues – view 1" },
      { src: "/images/imagehues/imagehues2.png", alt: "ImageHues – view 2" },
      { src: "/images/imagehues/imagehues3.png", alt: "ImageHues – view 3" },
      { src: "/images/imagehues/imagehues4.png", alt: "ImageHues – view 4" },
    ],
  },
];

export default function WorksPage() {
  return (
    <div className="flex flex-col pb-20">
      <WorksHeader
        projectCount={PROFESSIONAL_WORKS.length}
        sectionId="professional"
      />
      <div className="divide-border flex flex-col divide-y">
        {PROFESSIONAL_WORKS.map((work, i) => (
          <WorkSection
            key={work.label}
            work={work}
            id={`professional-${i + 1}`}
          />
        ))}
        <WorksHeader
          title="PERSONAL"
          projectCount={PERSONAL_WORKS.length}
          sectionId="personal"
        />
        {PERSONAL_WORKS.map((work, i) => (
          <WorkSection key={work.label} work={work} id={`personal-${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

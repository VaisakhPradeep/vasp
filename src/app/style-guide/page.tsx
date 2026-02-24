export const metadata = {
  title: "Style Guide — VASP Design",
  description: "Design system style guide: colors, typography, and components.",
};

/* Semantic tokens – use these in UI (Tailwind: bg-background, text-foreground, etc.) */
const semanticTokens = [
  {
    name: "Background",
    var: "var(--color-background)",
    token: "--color-background",
  },
  {
    name: "Foreground",
    var: "var(--color-foreground)",
    token: "--color-foreground",
  },
  { name: "Muted", var: "var(--color-muted)", token: "--color-muted" },
  { name: "Subtle", var: "var(--color-subtle)", token: "--color-subtle" },
  { name: "Border", var: "var(--color-border)", token: "--color-border" },
  {
    name: "Border Strong",
    var: "var(--color-border-strong)",
    token: "--color-border-strong",
  },
  { name: "Surface", var: "var(--color-surface)", token: "--color-surface" },
  {
    name: "Surface Hover",
    var: "var(--color-surface-hover)",
    token: "--color-surface-hover",
  },
  { name: "Accent", var: "var(--color-accent)", token: "--color-accent" },
  {
    name: "Muted Alpha",
    var: "var(--color-muted-alpha)",
    token: "--color-muted-alpha",
  },
];

/* Primitive tokens – raw palette (reference only, do not use in components) */
const primitiveTokens = [
  { name: "neutral-50", var: "var(--neutral-50)", token: "--neutral-50" },
  { name: "neutral-100", var: "var(--neutral-100)", token: "--neutral-100" },
  { name: "neutral-200", var: "var(--neutral-200)", token: "--neutral-200" },
  { name: "neutral-300", var: "var(--neutral-300)", token: "--neutral-300" },
  { name: "neutral-400", var: "var(--neutral-400)", token: "--neutral-400" },
  { name: "neutral-500", var: "var(--neutral-500)", token: "--neutral-500" },
  { name: "neutral-800", var: "var(--neutral-800)", token: "--neutral-800" },
  { name: "neutral-950", var: "var(--neutral-950)", token: "--neutral-950" },
  {
    name: "blue-gray-300",
    var: "var(--blue-gray-300)",
    token: "--blue-gray-300",
  },
  {
    name: "blue-gray-400",
    var: "var(--blue-gray-400)",
    token: "--blue-gray-400",
  },
  {
    name: "blue-gray-500",
    var: "var(--blue-gray-500)",
    token: "--blue-gray-500",
  },
  {
    name: "blue-gray-600",
    var: "var(--blue-gray-600)",
    token: "--blue-gray-600",
  },
  {
    name: "blue-gray-700",
    var: "var(--blue-gray-700)",
    token: "--blue-gray-700",
  },
  {
    name: "blue-gray-800",
    var: "var(--blue-gray-800)",
    token: "--blue-gray-800",
  },
];

/* Typography roles — use only these classes for text */
const typographyRoles = [
  {
    name: "Label",
    class: "text-label",
    sample: "Label",
    specs: "Neue Montreal · 12px · line-height 14px · letter-spacing 0",
  },
  {
    name: "Section Heading",
    class: "text-section-label",
    sample: "Section Heading",
    specs:
      "Departure Mono · 12px · line-height 18px · uppercase · letter-spacing 0.1em",
  },
  {
    name: "Body-md",
    class: "text-body",
    sample: "Body copy for paragraphs and general content.",
    specs: "Neue Montreal · 16px · line-height 22px · letter-spacing 0",
  },
  {
    name: "Display",
    class: "text-display",
    sample: "A software designer crafting tasteful user experiences.",
    specs:
      "Neue Montreal · 28px · medium (500) · line-height 34px · letter-spacing -0.02em",
  },
];

const typeSamples = [
  { label: "Thin (100)", className: "font-thin", weight: 100 },
  { label: "Book (300)", className: "font-light", weight: 300 },
  { label: "Regular (400)", className: "font-normal", weight: 400 },
  { label: "Medium (500)", className: "font-medium", weight: 500 },
  { label: "SemiBold (600)", className: "font-semibold", weight: 600 },
  { label: "Bold (700)", className: "font-bold", weight: 700 },
];

export default function StyleGuidePage() {
  return (
    <main className="max-w-page divide-border mx-auto divide-y">
      {/* Colors — Semantic tokens (use these in UI) */}
      <section className="px-5 py-6">
        <h2 className="text-section-label text-foreground mb-4">
          Semantic tokens
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {semanticTokens.map(({ name, var: varValue, token }) => (
            <div
              key={token}
              className="flex items-center gap-4 overflow-hidden"
            >
              <div
                className="border-border h-8 w-8 shrink-0 border"
                style={{ backgroundColor: varValue }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-button text-foreground">{name}</p>
                <p className="text-section text-muted">{token}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colors — Primitive tokens (reference only) */}
      <section className="px-5 py-6">
        <h2 className="text-section-label text-foreground mb-4">
          Primitive tokens
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {primitiveTokens.map(({ name, var: varValue, token }) => (
            <div
              key={token}
              className="flex items-center gap-4 overflow-hidden"
            >
              <div
                className="border-border h-8 w-8 shrink-0 border"
                style={{ backgroundColor: varValue }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-button text-foreground">{name}</p>
                <p className="text-section text-muted">{token}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography — Roles */}
      <section className="px-5 py-6">
        <h2 className="text-section-label text-foreground mb-4">Typography</h2>
        <div className="space-y-8">
          {typographyRoles.map(({ name, class: roleClass, sample, specs }) => (
            <div key={name} className="items-center gap-4">
              <div className="">
                <span className={`${roleClass} text-foreground`}>{sample}</span>
              </div>
              <p className="text-section text-muted">{specs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typefaces */}
      <section className="px-5 py-6">
        <h2 className="text-section-label text-foreground mb-4">Typefaces</h2>
        <div className="space-y-4">
          <div className="">
            <h3 className="text-body text-foreground mb-2">Departure Mono</h3>
            <div className="">
              <p className="text-foreground font-mono">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-muted font-mono">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </p>
            </div>
          </div>
          <div className="">
            <h3 className="text-body text-foreground mb-2">Neue Montreal</h3>
            <div className="">
              <p className="text-foreground">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-muted">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

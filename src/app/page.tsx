import ExportedImage from "next-image-export-optimizer";
import { WorksSectionGallery } from "@/components/WorksSectionGallery";
import Link from "next/link";
import { DottedButton } from "@/components/ui/DottedButton";
import { DottedLink } from "@/components/ui/DottedLink";

export default function Home() {
  return (
    <main
      className="max-w-page divide-border mx-auto flex w-full flex-col divide-y"
    >
      <section>
        <ExportedImage
          src="/images/zen_garden.png"
          alt="Serene Japanese garden with torii gate, pond, and bamboo"
          width={1200}
          height={800}
          className="w-full object-cover"
          priority
        />
        <div className="section-pad">
          <p className="text-section-label mb-2">
            HI, I&apos;M VAISAKH PRADEEP
          </p>
          <h1 className="text-display text-accent">
            A software designer crafting tasteful user experiences, and this is
            my little garden on the internet.
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <h2 className="text-section-label mb-5">Currently</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-body">
              Designing web application at{" "}
              <DottedLink openInNewTab href="https://jora.ai">
                jora.ai
              </DottedLink>
            </p>
            <p className="text-section-label text-muted-alpha! pt-1">0 → 1</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-body">
              Being obsessed with retro futuristic designs
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-body">
              Tinkering with agentic workflows to improve my life and work
            </p>
            {/* <p className="text-section-label text-muted-alpha! pt-1">5.3{">"}4.6</p> */}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <h2 className="text-section-label mb-5">Previously</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-body">
              Designed web and mobile applications for RA (now{" "}
              <DottedLink openInNewTab href="https://sanctuary.co">
                Sanctuary
              </DottedLink>
              ),{" "}
              <DottedLink openInNewTab href="https://athena.com">
                Athena
              </DottedLink>
              , and{" "}
              <DottedLink openInNewTab href="https://onnetsystems.net">
                Onnet Systems
              </DottedLink>
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-body">
              Freelanced for clients like{" "}
              <DottedLink openInNewTab href="https://wesmckinney.com/">
                Wes McKinney
              </DottedLink>
              ,{" "}
              <DottedLink openInNewTab href="https://x.com/swaaanson">
                Jonathan Swanson
              </DottedLink>
              ,{" "}
              <DottedLink openInNewTab href="https://jakezeller.com/about">
                Jake Zeller
              </DottedLink>
              ,{" "}
              <DottedLink openInNewTab href="https://katherinekrug.com">
                Katherine Krug
              </DottedLink>
              ,{" "}
              <DottedLink openInNewTab href="https://www.hatem-kaf.com">
                Hatem Hussain
              </DottedLink>
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad-y overflow-x-hidden">
        <div className="mb-5 flex items-center justify-between px-5">
          <h2 className="text-section-label">Works</h2>
          <Link href="/works">
            <DottedButton>View detailed works</DottedButton>
          </Link>
        </div>
        <WorksSectionGallery />
      </section>

      <section className="section-pad">
        <div className="flex justify-between">
          <h2 className="text-section-label mb-5">Side Projects</h2>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <DottedLink href="/works#personal-1">Ask Cal Newport</DottedLink>
            <p className="text-section-label text-muted-alpha! pt-1">2026</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <DottedLink href="/works#personal-2">Futicons</DottedLink>
            <p className="text-section-label text-muted-alpha! pt-1">2022</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <DottedLink href="/works#personal-3">Imagehues</DottedLink>
            <p className="text-section-label text-muted-alpha! pt-1">2019</p>
          </div>
        </div>
      </section>
    </main>
  );
}

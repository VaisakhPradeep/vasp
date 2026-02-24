import Image from "next/image";
import { DottedLink } from "@/components/ui/DottedLink";

export const metadata = {
  title: "About — VASP Design",
  description:
    "Vaisakh Pradeep — product designer who builds. 0 to 1 product design, Masters in Design (IISc Bangalore). Remote with North American teams.",
};

export default function AboutPage() {
  return (
    <main className="max-w-page mx-auto flex w-full flex-col">
      <section className="section-pad">
        <div className="flex flex-col gap-8">
          <div className="flex">
            <Image
              src="/images/profile_photo.jpeg"
              alt="Vaisakh Pradeep"
              width={280}
              height={280}
              className="aspect-square w-[200px] object-cover sm:w-[120px]"
            />
          </div>
          <div className="space-y-6">
            <p className="text-display text-subtle">
              Hi, I&apos;m Vaisakh Pradeep.
            </p>
            <p className="text-section-label text-subtle">
              I&apos;m a product designer who builds
            </p>
            <p className="text-body text-subtle">
              I&apos;ve always been a tinkerer at heart. For the past eight
              years, I&apos;ve focused on the &quot;0 to 1&quot; phase of
              product design, taking messy, complex ideas and turning them into
              clear, functional experiences.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-section-label text-subtle">
              The Journey to Design
            </h2>
            <p className="text-body text-subtle">
              My path started in Electrical Engineering. I was deep into that
              world and even placed in the top 0.3% in India (
              <DottedLink
                openInNewTab
                href="https://en.wikipedia.org/wiki/Graduate_Aptitude_Test_in_Engineering"
              >
                GATE exam
              </DottedLink>
              ), but a sketching bug caught me in my final year. I was drawing
              every single day, and I realized I wanted a career where I could
              explore that creativity. This led me to a Master&apos;s in Design
              at{" "}
              <DottedLink
                openInNewTab
                href="https://en.wikipedia.org/wiki/Indian_Institute_of_Science"
              >
                IISc Bangalore
              </DottedLink>
              , and I haven&apos;t looked back since.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-section-label text-subtle">
              A Modern Renaissance
            </h2>
            <p className="text-body text-subtle">
              I&apos;m a big believer in the Renaissance approach to creating:
              where a designer doesn&apos;t just hand off a layout, but
              understands how it actually comes to life. While I am a designer
              first, I love the &quot;realization&quot; part of the process.
              I&apos;ve been playing with code since high school, and today that
              means I&apos;m right at home in the frontend. I love the instant
              gratification of CSS, the polish of a perfectly timed Framer
              Motion transition, and making sure the final product feels as good
              as it looks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-section-label text-subtle">Current Chapter</h2>
            <p className="text-body text-subtle">
              For the last five years, I&apos;ve been working remotely with
              North American companies, solving complex problems from my home
              office. Currently, I&apos;m at{" "}
              <DottedLink openInNewTab href="https://jora.ai">
                Jora
              </DottedLink>
              , where I&apos;m fortunate to work with an incredible team.
              We&apos;re a remote group, but we meet up in Tokyo once a year to
              sync up and explore the city—which is easily one of the highlights
              of my year.
            </p>
          </div>

          <p className="text-body text-subtle">
            In a world where the gap between an idea and a working product is
            getting smaller every day, I&apos;m just happy to be building. When
            I&apos;m not in Figma, I&apos;m usually sketching, working on side
            projects, or tinkering with something new.
          </p>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import AnimatedContent from "@/components/AnimatedContent";
import { Container } from "@/components/ui";
import { Headline } from "@/components/headline";
import BlurText from "@/components/BlurText";
import { WorkIndex } from "@/components/work-index";
import { ProjectCard } from "@/components/project-card";
import { ClosingCta } from "@/components/closing-cta";
import { projects } from "@/lib/work";

export const metadata: Metadata = pageMetadata({
  title: "Selected Work",
  description:
    "Products, interfaces, and systems designed and built by Connor Love, each labelled with its project type, role, and current status.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-28">
        <Container>
          <div className="flex items-start gap-3 sm:gap-5">
            <Headline
              as="h1"
              afterIntro
              text="Selected work"
              className="text-[clamp(3.4rem,11.5vw,11.5rem)] leading-[0.9] font-medium tracking-[-0.05em]"
            />
            <span className="mt-[0.6em] text-[clamp(0.9rem,1.6vw,1.4rem)] font-medium text-ink-3 tabular-nums">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </div>
          <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-8">
            <p className="text-[13px] font-medium text-ink-2 lg:col-span-4">
              Products, interfaces, and systems
            </p>
            <BlurText
              text="A closer look at the work behind the studio. Each project is labelled with what it is, the role I played, and where it stands today."
              animateBy="words"
              delay={14}
              trigger="load"
              className="max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl lg:col-span-6 lg:col-start-7"
            />
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <WorkIndex projects={projects} />
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <AnimatedContent stagger={0.12} distance={50} className="grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                demo
                className={
                  // First card is wide; a final card left alone in its row goes wide too.
                  i === 0 || (i === projects.length - 1 && i % 2 === 1)
                    ? "aspect-[4/5] md:col-span-2 md:aspect-[16/8]"
                    : "aspect-[4/5] md:aspect-[5/4]"
                }
              />
            ))}
          </AnimatedContent>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}

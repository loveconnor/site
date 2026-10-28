import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import Image from "next/image";
import { Container, PageHero } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { ClosingCta } from "@/components/closing-cta";
import { getProject, projects, type Project } from "@/lib/work";
import { inquiryHref } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({ title: project.name, description: project.summary, path: `/work/${project.slug}` });
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const [lead, ...rest] = project.screens;
  const next = projects[(index + 1) % projects.length];
  const facts = [
    ["Project type", project.label],
    ["Role", project.role],
    ["Status", project.status],
  ];

  return (
    <>
      <PageHero eyebrow={project.name} title={project.headline} intro={project.summary}>
        <dl className={`mt-16 grid gap-6 ${project.live ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt className="text-[13px] tracking-wider text-ink-3 font-medium">{term}</dt>
              <dd className="mt-2 text-[15px] text-ink">{value}</dd>
            </div>
          ))}
          {project.live && (
            <div>
              <dt className="text-[13px] tracking-wider text-ink-3 font-medium">{project.live.label}</dt>
              <dd className="mt-2 text-[15px]">
                <a
                  href={project.live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-ink"
                >
                  <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-ink">
                    {project.live.href.replace(/^https?:\/\//, "")}
                  </span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
          )}
        </dl>
      </PageHero>

      <Container>
        <FadeContent blur duration={1}>
          <Screen project={project} screen={lead} />
        </FadeContent>
      </Container>

      {/* The write-up as editorial rows: number and title on the left, the text on the right. */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="border-b border-line">
            {project.sections.map((section, i) => (
              <AnimatedContent key={section.title} distance={30}>
                <section
                  id={slug(section.title)}
                  className="grid scroll-mt-32 gap-6 border-t border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-8"
                >
                  <div className="lg:col-span-4">
                    <p className="text-[13px] font-medium text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] font-medium tracking-[-0.024em]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="grid gap-5 lg:col-span-7 lg:col-start-6">
                    {section.body.map((paragraph, j) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className={
                          j === 0
                            ? "text-[clamp(1.2rem,1.6vw,1.45rem)] leading-[1.5] tracking-[-0.01em] text-ink"
                            : "text-[17px] leading-relaxed text-ink-2"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </AnimatedContent>
            ))}
          </div>
        </Container>
      </section>

      {rest.length > 0 && (
        <section className="pb-24 sm:pb-32">
          <Container className="grid gap-4 sm:gap-6">
            {rest.map((screen) => (
              <AnimatedContent key={screen.src} distance={40}>
                <Screen project={project} screen={screen} />
              </AnimatedContent>
            ))}
          </Container>
        </section>
      )}

      {project.closing && (
        <ClosingCta
          title={project.closing.title}
          body={project.closing.body}
          cta={project.closing.cta}
          href={inquiryHref(project.closing.engagement)}
        />
      )}

      <section className="pt-28 pb-16 sm:pb-24">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <p className="text-[13px] text-ink-2 font-medium">Next project</p>
            <Link href="/work" className="text-sm text-ink-2 hover:text-ink">
              All work
            </Link>
          </div>
          <ProjectCard project={next} index={projects.indexOf(next)} className="aspect-[4/5] md:aspect-[16/7]" />
        </Container>
      </section>
    </>
  );
}

/** A screenshot framed on the project's colour, with its caption underneath. */
function Screen({ project, screen }: { project: Project; screen: Project["screens"][number] }) {
  return (
    <figure>
      <div
        className="overflow-hidden rounded-[20px] p-3 sm:rounded-[28px] sm:p-8 lg:p-14"
        style={{ backgroundColor: project.theme.bg }}
        data-nav-theme={project.theme.tone === "light" ? "dark" : "light"}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          sizes="(min-width: 1600px) 1400px, 92vw"
          className="h-auto w-full rounded-[10px] shadow-[0_30px_60px_-30px_rgba(22,21,19,0.45)] ring-1 ring-black/5 sm:rounded-[14px]"
        />
      </div>
      <figcaption className="mt-4 text-[14px] text-ink-3">{screen.alt}</figcaption>
    </figure>
  );
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

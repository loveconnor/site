import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import AnimatedContent from "@/components/AnimatedContent";
import { MoirePlate, type PatternKind } from "@/components/moire";
import { ButtonLink, Container, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { ClosingCta } from "@/components/closing-cta";
import { inquiryHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Website design and development, web applications and tools, and ongoing design and development capacity from Moirel Studio.",
  path: "/services",
});

const services: {
  id: string;
  eyebrow: string;
  title: string;
  pattern: PatternKind;
  body: string[];
  note?: string;
  cta: { label: string; href: string };
}[] = [
  {
    id: "websites",
    eyebrow: "Websites",
    title: "Give your business a website that makes sense.",
    pattern: "rings",
    body: [
      "People arrive with questions. What do you do? Is it relevant to them? Why should they trust you? What should they do next?",
      "Moirel builds the website around those questions, with a clear structure and a visual direction that fits the business.",
      "A website project can include planning the pages, organizing supplied content, designing the interface, building the experience, and preparing it for launch. The proposal defines the pages, features, content responsibilities, and handoff.",
      "Useful for a new company website, an established business ready for a redesign, a product launch, or a focused campaign page.",
    ],
    note: "Website builds from $4,500.",
    cta: { label: "Discuss a website", href: inquiryHref("project") },
  },
  {
    id: "applications",
    eyebrow: "Applications and tools",
    title: "Build around the way people actually work.",
    pattern: "grid",
    body: [
      "Sometimes the problem is a process that is difficult to follow, information that is hard to find, or a task that takes too many steps.",
      "Moirel designs and develops web applications around those needs. That might be a customer portal, an internal dashboard, a product interface, or a new feature in an existing application.",
      "We map the important actions and information first, then agree on a useful scope to build and evaluate.",
    ],
    note: "Applications are quoted individually.",
    cta: { label: "Discuss an application", href: inquiryHref("project") },
  },
  {
    id: "ongoing",
    eyebrow: "Ongoing design and development",
    title: "Keep a useful backlog moving.",
    pattern: "lines",
    body: [
      "Studio Monthly gives you reserved capacity for a product or website that needs regular attention. Add requests as they come up, agree on priorities, and work directly with me through one active request at a time.",
      "It is a good fit for landing pages, interface improvements, existing product features, design-system work, and a continuing stream of changes.",
    ],
    cta: { label: "See Studio Monthly", href: "/pricing#studio-monthly" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Design and development around the work you need to do."
        intro="Moirel brings structure, interface design, and development together. Whether the goal is a clearer website or a tool that makes everyday work easier, we start by understanding what people need from it."
      />

      {services.map((service, i) => (
        <section key={service.id} id={service.id} className="scroll-mt-24 py-24 sm:py-32">
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* The plate stretches to the height of the text beside it. */}
            <div className={i % 2 ? "lg:order-2" : ""}>
              <MoirePlate
                kind={service.pattern}
                className="aspect-[4/3] rounded-[24px] lg:aspect-auto lg:h-full lg:min-h-[480px]"
              />
            </div>
            <div>
              <SectionHeading eyebrow={service.eyebrow} title={service.title} />
              <AnimatedContent stagger={0.08} distance={20} className="mt-8 grid gap-5">
                {service.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-[17px] leading-relaxed text-ink-2">
                    {paragraph}
                  </p>
                ))}
              </AnimatedContent>
              {service.note && <p className="mt-8 text-[17px] font-medium text-ink">{service.note}</p>}
              <div className="mt-8">
                <ButtonLink href={service.cta.href} variant="secondary">
                  {service.cta.label}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-paper-2 py-28 sm:py-36">
        <Container>
          <Eyebrow>Craft</Eyebrow>
          <div className="mt-10 max-w-3xl">
            <SectionHeading title="Details that serve the whole experience." />
            <AnimatedContent stagger={0.08} distance={20} className="mt-8 grid gap-5">
              <p className="text-[17px] leading-relaxed text-ink-2">
                Reusable components help interfaces stay consistent. Purposeful motion can explain a change or make an
                action easier to follow. Responsive layouts, accessible interactions, and thoughtful loading behavior
                shape everyday use.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-2">
                These decisions are part of the work from the beginning. Specific audit requirements, content
                production, and additional services are agreed in the project scope.
              </p>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}

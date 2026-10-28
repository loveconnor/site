import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import FadeContent from "@/components/FadeContent";
import { Hero } from "@/components/home/hero";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { WorkShowcase } from "@/components/home/work-showcase";
import { WorkspaceTour } from "@/components/workspace-tour";
import { OfferCards } from "@/components/offer-cards";
import { ServiceRows, type ServiceRow } from "@/components/service-rows";
import { Headline } from "@/components/headline";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { ClosingCta } from "@/components/closing-cta";
import { projects } from "@/lib/work";
import { homeDescription, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ description: homeDescription, path: "/" });

const services: ServiceRow[] = [
  {
    title: "A clearer website",
    body: "Introduce the business, explain the offer, and help people take the next step. Designed and built around your content, audience, and goals.",
    includes: ["Page planning", "Interface design", "Build and launch"],
    price: "From $4,500",
    href: "/services#websites",
  },
  {
    title: "A useful application",
    body: "Give customers or your team a better way to get something done. The work starts with the workflow and develops into an interface people can use.",
    includes: ["Portals", "Dashboards", "Product features"],
    price: "Quoted individually",
    href: "/services#applications",
  },
  {
    title: "Room to keep improving",
    body: "Keep moving after launch. Reserve monthly design and development capacity for an active roadmap, or arrange routine care for an existing website.",
    includes: ["Studio Monthly", "Site Care"],
    price: "From $250 / month",
    href: "/services#ongoing",
  },
];


const process = [
  {
    title: "Understand the project",
    body: "We start with what you want to accomplish, who the work is for, and the constraints that matter. I help turn that conversation into a useful brief.",
  },
  {
    title: "Agree on the work",
    body: "For a project, we define the deliverables and plan. For monthly work, we establish your priorities and the capacity available. You know what we are committing to before work begins.",
  },
  {
    title: "Design and build",
    body: "I work through the agreed priorities and share progress at useful checkpoints. You can review the direction, ask questions, and keep feedback with the work.",
  },
  {
    title: "Launch and hand over",
    body: "We review the finished experience, complete the agreed checks, and prepare the files and access you need. Ongoing work can continue through Studio Monthly or Site Care.",
  },
];

const featured = ["client-workspace", "honestui", "swipz"].map(
  (slug) => projects.find((project) => project.slug === slug)!,
);

export default function Home() {
  return (
    <>
      <Hero />

      {/* (01) Selected work */}
      <section className="py-28 sm:py-40">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Built around a real problem."
          />
          <div className="mt-16 sm:mt-24">
            <WorkShowcase
              projects={featured}
              aside={
                <FadeContent blur duration={0.9}>
                  <p className="max-w-xs text-[15px] leading-relaxed text-ink-2">
                    Each case study covers the problem, the approach, and the part I played.
                  </p>
                  <div className="mt-6">
                    <ButtonLink href="/work" variant="secondary">
                      See all work
                    </ButtonLink>
                  </div>
                </FadeContent>
              }
            />
          </div>
        </Container>
      </section>

      {/* (02) Services */}
      <section className="pb-28 sm:pb-40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  index="02"
                  eyebrow="Services"
                  size="md"
                  title="What would make your business work better online?"
                />
                <div className="mt-10">
                  <ButtonLink href="/services" variant="ghost">
                    All services
                  </ButtonLink>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ServiceRows rows={services} />
            </div>
          </div>
        </Container>
      </section>

      {/* (03) Client workspace */}
      <section className="py-28 sm:py-40">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Client workspace"
            title="Know what is happening. Know what comes next."
          />
          <FadeContent blur duration={0.9}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
              Every project has a shared workspace for requests, feedback, approvals, and files.
            </p>
          </FadeContent>
          <div className="mt-16">
            <WorkspaceTour />
          </div>
        </Container>
      </section>

      {/* (04) Process */}
      <section data-nav-theme="dark" className="mx-3 rounded-[28px] bg-ink py-28 text-paper sm:mx-4 sm:rounded-[36px] sm:py-40">
        <Container>
          <div className="flex items-center justify-between gap-6">
            <p className="flex items-baseline gap-3 text-[13px] font-medium text-paper/70">
              <span className="text-paper/40 tabular-nums">04</span>
              How we work together
            </p>
          </div>
          <Headline
            text="A clear process, with space for your input."
            className="mt-10 max-w-5xl text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] font-medium tracking-[-0.032em] text-balance"
          />
        </Container>
        <Container className="mt-20 sm:mt-28">
          <ProcessTimeline steps={process} />
        </Container>
      </section>

      {/* (05) Pricing */}
      <section className="overflow-x-clip py-28 sm:py-40">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Pricing"
            title="Choose the arrangement that fits the work."
            aside={
              <ButtonLink href="/pricing" variant="ghost">
                Full pricing
              </ButtonLink>
            }
          />
          <div className="mt-16">
            <OfferCards />
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-3">
            Third-party services and costs are separate. See{" "}
            <Link href="/pricing" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              Pricing
            </Link>{" "}
            for the scope, capacity rules, and renewal terms of each offer.
          </p>
        </Container>
      </section>

      {/* (06) Founder */}
      <section className="pb-28 sm:pb-40">
        <Container>
          <Eyebrow index="06">The studio</Eyebrow>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-9">
              <h2 className="sr-only">A direct line to the person doing the work.</h2>
              <ScrollReveal
                baseOpacity={0.12}
                enableBlur
                blurStrength={4}
                baseRotation={0}
                textClassName="text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.14] font-medium tracking-[-0.026em] text-ink"
              >
                I’m Connor, the designer and developer behind Moirel Studio. My work spans websites, interface systems, and the software behind them. I care about how something looks, how it behaves, and whether it helps the person using it.
              </ScrollReveal>
            </div>
          </div>
          <FadeContent blur duration={0.8}>
            <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-8">
              <div className="flex items-center gap-4 lg:col-span-4">
                <Image
                  src="/connor-avatar.webp"
                  alt="Connor Love"
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
                />
                <div>
                  <p className="text-[15px] font-medium">Connor Love</p>
                  <p className="text-[15px] text-ink-2">Founder · Columbus, Ohio</p>
                </div>
              </div>
              <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:col-span-8">
                <p className="max-w-md text-[17px] leading-relaxed text-ink-2">
                  A direct line to the person doing the work, from the first conversation to launch and beyond.
                </p>
                <ButtonLink href="/studio" variant="secondary">
                  Meet the studio
                </ButtonLink>
              </div>
            </div>
          </FadeContent>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}

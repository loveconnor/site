import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import FadeContent from "@/components/FadeContent";
import AnimatedContent from "@/components/AnimatedContent";
import { MoireMark, MoirePlate } from "@/components/moire";
import { LocalTime } from "@/components/local-time";
import { Principles } from "@/components/principles";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { ClosingCta } from "@/components/closing-cta";

export const metadata: Metadata = pageMetadata({
  title: "Studio",
  description:
    "Moirel Studio is the independent design and development practice of Connor Love, based in Columbus, Ohio and working with clients remotely.",
  path: "/studio",
});

const questions = [
  "What does the person need to do?",
  "What information matters now?",
  "How can the experience make the next step clearer?",
];

const principles = [
  {
    title: "Understand the purpose",
    body: "I want to know why a page, feature, or interaction needs to exist. That helps us decide what to build and what can wait.",
  },
  {
    title: "Make the decisions visible",
    body: "You should be able to review the direction and understand what is happening. I share progress and keep feedback connected to the work.",
  },
  {
    title: "Care about the details people use",
    body: "Labels, loading states, small screens, forms, and error messages are part of the experience. They deserve the same attention as the first impression.",
  },
  {
    title: "Leave a clear handoff",
    body: "The end of a project should include the agreed files, access, and guidance. If we continue working together, the next scope should be clear too.",
  },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="Independent by design. Involved from the start."
        intro="Moirel Studio is the design and development practice of Connor Love."
      />

      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <FadeContent blur duration={1} className="lg:col-span-5">
            <div
              data-nav-theme="dark"
              className="relative isolate flex h-full min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10"
            >
              <MoirePlate kind="rings" surface="" stroke="#f6f4ef" className="absolute inset-0 -z-10 opacity-[0.09]" />
              <div className="flex items-center gap-3 text-[14px] font-medium">
                <MoireMark size={22} inverted />
                Moirel Studio
              </div>
              <div>
                <p className="text-[clamp(2rem,3.2vw,2.75rem)] leading-none font-medium tracking-[-0.035em] [font-stretch:112.5%]">
                  Connor Love
                </p>
                <p className="mt-3 text-[15px] text-paper/65">Founder, designer and developer</p>
                <dl className="mt-10 grid gap-3 text-[14px]">
                  {[
                    ["Based in", "Columbus, Ohio"],
                    ["Works", "Remotely, with clients anywhere"],
                  ].map(([term, detail]) => (
                    <div key={term} className="flex justify-between gap-6 border-t border-paper/15 pt-3">
                      <dt className="text-paper/50">{term}</dt>
                      <dd className="text-right">{detail}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-6 border-t border-paper/15 pt-3">
                    <dt className="text-paper/50">Local time</dt>
                    <dd>
                      <LocalTime />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </FadeContent>
          <AnimatedContent
            stagger={0.1}
            distance={20}
            className="flex flex-col justify-between gap-10 lg:col-span-6 lg:col-start-7 lg:py-2"
          >
            <p className="text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.18] font-medium tracking-[-0.025em] text-balance text-ink">
              I build websites and software with attention to how people understand them, move through them, and use
              them in everyday work.
            </p>
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-ink-2">
                I’m based in Columbus, Ohio, and work with clients remotely. From the first conversation to the final
                handoff, you have a direct line to the person responsible for the work.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="secondary">
                  Start a conversation
                </ButtonLink>
              </div>
            </div>
          </AnimatedContent>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Approach" title="I like understanding what the code is for." />
          <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-8">
            <AnimatedContent stagger={0.08} distance={20} className="grid content-start gap-6 lg:col-span-5">
              <p className="text-xl leading-relaxed text-ink">
                My work brings design and development together. I’m interested in the visible details of an interface
                and the less visible decisions that make it dependable and maintainable. A polished screen needs a
                useful purpose behind it.
              </p>
              <p className="text-lg leading-relaxed text-ink-2">
                Alongside client work, I build products and tools of my own. Those projects give me different problems
                to solve, but the questions are connected.
              </p>
              <p className="text-lg leading-relaxed text-ink-2">
                Moirel is where I bring that approach to client work, with a defined scope, direct communication, and a
                workspace that keeps the project understandable while it develops.
              </p>
            </AnimatedContent>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[13px] font-medium text-ink-2">The questions behind every project</p>
              <AnimatedContent role="list" stagger={0.1} distance={20} className="mt-6 border-b border-line">
                {questions.map((question, i) => (
                  <div role="listitem" key={question} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-8">
                    <span className="pt-2 text-[13px] text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15] font-medium tracking-[-0.024em] text-balance">
                      {question}
                    </span>
                  </div>
                ))}
              </AnimatedContent>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Principles" title="How I work" />
          <div className="mt-14 sm:mt-16">
            <Principles items={principles} />
          </div>
        </Container>
      </section>

      <ClosingCta
        title="Have a problem worth working through?"
        body="Send me a little context about the business and what you need. We can start with the goal and work out the right shape for the project."
      />
    </>
  );
}

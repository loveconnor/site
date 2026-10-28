import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";
import Counter from "@/components/Counter";
import CountUp from "@/components/CountUp";
import AnimatedContent from "@/components/AnimatedContent";
import { ButtonLink, Container, Eyebrow, PageHero } from "@/components/ui";
import { PricingNav } from "@/components/pricing-nav";
import { Faq } from "@/components/faq";
import { CapacityTooltip } from "@/components/capacity-tooltip";
import { ClosingCta } from "@/components/closing-cta";
import { inquiryHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Fixed-scope projects from $4,500, Studio Monthly at $3,000 per month for 24 hours of reserved capacity, and Site Care at $250 per site per month.",
  path: "/pricing",
});

const monthlyIncludes = [
  "A shared request queue.",
  "One active request at a time.",
  "Agreed priorities and estimates before work begins.",
  "Progress updates and a place for feedback.",
  "Design, development, revisions, and testing within the monthly allowance.",
];

const faqs: [string, string][] = [
  [
    "How do I choose the right offer?",
    "Choose Projects when you have a defined deliverable and want an agreed price. Choose Studio Monthly when you have an ongoing backlog and want reserved capacity. Choose Site Care for routine website maintenance and minor content changes.",
  ],
  [
    "Does an unlimited backlog mean unlimited work?",
    "You can add as many requests as you need to the queue. Studio Monthly includes 24 hours per billing month and one active request at a time. The queue records your priorities; it does not expand the allowance.",
  ],
  [
    "How quickly will a request be finished?",
    "I estimate timing after reviewing the request, the remaining capacity, and any information or access needed. A small page adjustment and a substantial product feature require different amounts of work.",
  ],
  [
    "Can I request revisions?",
    "Yes. For Studio Monthly, revisions use the monthly allowance. For a fixed project, the proposal defines the review process. If feedback introduces additional scope, we agree on its effect on price and timing before proceeding.",
  ],
  [
    "Can the subscription cover a whole new website?",
    "It can, if the scope and pace fit the monthly arrangement. A complete build with a firm deadline may be easier to plan as a fixed project. I’ll make the likely capacity and duration clear before recommending an offer.",
  ],
  [
    "What happens when the monthly allowance is used?",
    "Remaining requests stay in the queue for the next billing period. We can discuss a separate piece of work if needed, subject to availability. Additional charges require your agreement.",
  ],
  [
    "Can I pause or cancel?",
    "You can pause or cancel future renewals before the next cycle. The paid period remains available through its end. Restarting later depends on studio capacity. Fixed projects follow the terms in their individual agreement.",
  ],
  [
    "Who owns the finished work?",
    "The agreement specifies the transfer of custom work that has been delivered and paid for, along with the source files and access included in the handoff. Third-party tools, fonts, libraries, and assets keep their own license terms.",
  ],
  [
    "Can you work on an existing website or application?",
    "Often, yes. I first review the platform, code, access, and condition so I can recommend a sensible scope. Some systems need an initial assessment or cleanup before ongoing development or care is practical.",
  ],
  [
    "Do I work directly with Connor?",
    "Yes. I lead the work and am your point of contact. If a project needs another specialist, we discuss the arrangement before adding it to the scope.",
  ],
];

function OfferSection({
  id,
  name,
  price,
  unit,
  lead,
  headline,
  bestFor,
  cta,
  featured = false,
  children,
}: {
  id: string;
  name: string;
  price: number;
  unit?: string;
  lead?: string;
  headline?: ReactNode;
  bestFor: string;
  cta: { label: string; href: string };
  featured?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-40 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-44 lg:self-start">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-medium tracking-[-0.025em]">{name}</h2>
            {featured && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-[12px] font-medium text-paper">
                Ongoing
              </span>
            )}
          </div>
          {lead && <p className="mt-8 text-sm text-ink-3">{lead}</p>}
          <div className={`flex items-baseline gap-2 ${lead ? "mt-1" : "mt-8"}`}>
            <Counter
              value={price}
              prefix="$"
              locale="en-US"
              fontSize="clamp(3rem, 6vw, 4.5rem)"
              fontWeight={500}
              textColor="#161513"
              tabular
              className="tracking-[-0.032em]"
            />
            {unit && <span className="text-ink-2">{unit}</span>}
          </div>
          {headline && <div className="mt-6">{headline}</div>}
          <div className="mt-8">
            <ButtonLink href={cta.href} variant={featured ? "primary" : "secondary"}>
              {cta.label}
            </ButtonLink>
          </div>
        </div>
        <AnimatedContent stagger={0.06} distance={20} className="grid content-start gap-5 text-[17px] leading-relaxed text-ink-2">
          {children}
          <p className="mt-4 rounded-2xl border border-line bg-card p-5 text-[15px]">
            <span className="font-medium text-ink">Best for: </span>
            {bestFor}
          </p>
        </AnimatedContent>
      </Container>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="A clear agreement for the work ahead."
        intro="Choose a defined project, reserve ongoing capacity, or arrange routine site care. Each offer has a different scope, so you can pay for the kind of help you need."
      >
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-3">
          Before we begin, I review the project or existing system, confirm that it is a fit, and put the details in
          writing. Prices below exclude third-party services and costs.
        </p>
      </PageHero>

      {/* The jump nav only sticks while these sections are on screen. */}
      <div>
        <PricingNav />

        <OfferSection
          id="projects"
          name="Projects"
          lead="Website builds from"
          price={4500}
          bestFor="A complete website, a focused application, a substantial redesign, or a major product feature."
          cta={{ label: "Discuss a project", href: inquiryHref("project") }}
        >
          <p>
            For a new website, a substantial redesign, or a build with a defined outcome. We agree on the deliverables,
            price, and schedule before work begins. Applications and more involved builds are scoped individually.
          </p>
          <p>
            Your proposal describes what will be designed and built, the content and access required, the review
            process, the payment milestones, and the handoff. Changes outside the agreed scope are discussed and priced
            before they are added.
          </p>
          <p>
            Projects are paid through agreed milestones. Hosting, software subscriptions, future maintenance, and ongoing
            changes are separate unless the proposal specifically includes them.
          </p>
        </OfferSection>

        <OfferSection
          id="studio-monthly"
          name="Studio Monthly"
          price={3000}
          unit="per month"
          featured
          headline={
            <p className="text-[17px] leading-relaxed text-ink">
              <CountUp to={24} duration={1.2} className="font-medium tabular-nums" /> hours of reserved capacity per
              billing month.{" "}
              <CapacityTooltip content="Other requests wait in your shared backlog. If the active one is waiting on feedback, I move to the next ready item.">
                One active request at a time.
              </CapacityTooltip>
            </p>
          }
          bestFor="Businesses and product teams with a continuing stream of improvements, features, pages, and interface work."
          cta={{ label: "Discuss ongoing work", href: inquiryHref("monthly") }}
        >
          <p>
            A monthly place in the studio for design and development work. Keep a shared backlog, choose the next
            priority, and work directly with me through the changes that matter to your business or product.
          </p>
          <p>
            Add as many items to the backlog as you need. The amount delivered depends on the size of the requests and
            the monthly capacity available.
          </p>
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="text-[15px] font-medium text-ink">The plan includes</p>
            <ul className="mt-4 grid gap-3 text-[15px]">
              {monthlyIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-3" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p>
            Planning, meetings, and project communication also count toward the 24 hours. Larger requests may be divided
            into stages or continue into another month.
          </p>
          <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] text-ink">How monthly capacity works</h3>
          <p>
            Studio Monthly is billed upfront for each billing month. The allowance belongs to that billing period and
            does not roll over.
          </p>
          <p>
            If a request is waiting for feedback or materials, I can move to the next ready item in your queue. If there
            is no ready work, the billing period still continues.
          </p>
          <p>
            Pause or cancel future renewals before the next billing cycle. Your current paid period continues through its
            end. Restarting after a pause depends on available capacity.
          </p>
          <p>
            If the studio cannot provide the capacity it committed to, the service agreement defines the appropriate
            credit, carryover, or refund. Additional work or charges require your agreement first.
          </p>
        </OfferSection>

        <OfferSection
          id="site-care"
          name="Site Care"
          price={250}
          unit="per site per month"
          headline={
            <p className="text-[17px] leading-relaxed text-ink">
              Routine care for one agreed website, with up to one hour of minor content edits each billing month.
            </p>
          }
          bestFor="A stable, supported website that needs routine attention and occasional small updates."
          cta={{ label: "Ask about site care", href: inquiryHref("care") }}
        >
          <p>
            I review the website before accepting it so the care scope matches its platform, condition, and hosting
            setup.
          </p>
          <p>
            The service includes one scheduled monthly check of the agreed pages, existing contact forms, and supported
            components for routine updates. The care agreement identifies the items covered and the updates included.
          </p>
          <p>
            Minor edits can include replacing supplied text or images and adjusting existing links. New pages, features,
            redesigns, and substantial fault investigation are estimated separately.
          </p>
          <p>
            Care is billed upfront each month. Unused editing time does not roll over. Pause or cancel future renewals
            before the next cycle; the current paid period continues.
          </p>
          <p>
            Hosting, domains, and paid services are separate. Emergency response and broader application maintenance
            require a separate agreement.
          </p>
        </OfferSection>

        <section id="faq" className="scroll-mt-40 py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-44">
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-8 text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] font-medium tracking-[-0.028em] text-balance">
                  Questions, answered.
                </h2>
                <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ink-2">
                  Something not covered here? Ask me directly.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/contact" variant="ghost">
                    Ask a question
                  </ButtonLink>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Faq items={faqs} />
            </div>
          </Container>
        </section>

      </div>

      <ClosingCta
        title="Not sure which arrangement fits?"
        body="Tell me what you need to accomplish and how often the work comes up. I’ll help you choose a scope or plan that matches it."
      />
    </>
  );
}

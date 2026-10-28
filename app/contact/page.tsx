import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { Container, PageHero, ButtonLink } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { engagements, site, type EngagementId } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Let’s Talk",
  description:
    "Tell Moirel Studio about a website, application, or ongoing design and development backlog. No finished brief required.",
  path: "/contact",
});

async function PreselectedForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { engagement } = await searchParams;
  const initial = engagements.find((item) => item.id === engagement)?.id as EngagementId | undefined;
  return <InquiryForm initialEngagement={initial} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        eyebrow="Let’s talk"
        title="What would you like to work on?"
        intro="A new website, a useful tool, or a backlog that needs attention. Share the problem, the goal, and any timing that matters. You don’t need a finished brief to start the conversation."
      />

      <section className="pb-12">
        <Container className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <Suspense fallback={<div className="min-h-[680px]" />}>
            <PreselectedForm searchParams={searchParams} />
          </Suspense>

          <aside className="grid content-start gap-8 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[24px] border border-line bg-card p-7">
              <p className="text-[15px] font-medium text-ink">Prefer a conversation?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">Book an introductory call instead.</p>
              <div className="mt-6">
                <ButtonLink href={site.bookingUrl} variant="secondary" magnetic={false}>
                  Book a call
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-3 px-1 text-[14px] leading-relaxed text-ink-3">
              <p>
                Or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {site.email}
                </a>
                .
              </p>
              <p>
                I’ll review your details and get in touch about fit and the next step. Sending this form does not begin
                a paid engagement.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

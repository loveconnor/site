import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Service Terms",
  description:
    "How engagements with Moirel Studio are agreed and documented.",
  path: "/terms",
});

// A summary only. The binding terms live in each proposal or service agreement.
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Service terms" title="Every engagement is agreed in writing." />
      <Container>
        <div className="grid max-w-2xl gap-6 pb-12 text-[17px] leading-relaxed text-ink-2">
          <p>
            Before work begins, each project, Studio Monthly plan, or Site Care arrangement is confirmed in a written
            proposal or service agreement. That document defines the scope, price, billing, schedule, handoff, and
            ownership terms for the engagement, and it takes precedence over anything on this website.
          </p>
          <p>
            The{" "}
            <Link href="/pricing" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              pricing page
            </Link>{" "}
            summarizes how each offer works, including capacity, renewals, pausing, and cancellation. Third-party
            services such as hosting, domains, and paid software are separate unless an agreement says otherwise.
          </p>
          <p>Sending an inquiry through this website does not begin a paid engagement.</p>
        </div>
      </Container>
    </>
  );
}

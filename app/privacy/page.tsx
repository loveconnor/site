import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "How Moirel Studio handles the information you share through this website.",
  path: "/privacy",
});

// Reflects the site as built: an inquiry form, no analytics, no tracking cookies.
// Update the date below whenever this changes.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="What happens to the details you share." />
      <Container>
        <div className="grid max-w-2xl gap-6 pb-12 text-[17px] leading-relaxed text-ink-2">
          <p>
            When you send an inquiry, the form collects your name, email address, and the project details you choose to
            provide. That information is used to review your request and reply to you. It is delivered to the studio
            by email and is not sold or shared for marketing.
          </p>
          <p>
            This website does not use analytics or advertising cookies. If that changes, this page will be updated
            before it does.
          </p>
          <p>
            Booking a call takes you to a separate scheduling service, which handles the details you enter under its
            own privacy policy.
          </p>
          <p>
            To ask what information the studio holds about you, or to have it deleted, email{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              {site.email}
            </a>
            .
          </p>
          <p className="text-[15px] text-ink-3">Last updated October 28, 2026.</p>
        </div>
      </Container>
    </>
  );
}

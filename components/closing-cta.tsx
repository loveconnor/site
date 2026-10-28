import Dither from "@/components/Dither";
import FadeContent from "@/components/FadeContent";
import { Headline } from "@/components/headline";
import { ButtonLink } from "@/components/ui";

export function ClosingCta({
  title = "What would you like to build?",
  body = "Tell me what you are working on, what needs to change, and what a useful result would look like. A finished brief is welcome, but a clear problem is enough to start.",
  cta = "Let’s talk",
  href = "/contact",
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="px-3 pt-16 pb-3 sm:px-4">
      <div data-nav-theme="dark" className="relative isolate overflow-hidden rounded-[28px] bg-ink px-6 py-28 text-paper sm:rounded-[36px] sm:px-16 sm:py-40">
        <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
          <Dither
            waveColor="#8f8984"
            backgroundColor="#161513"
            palette={["#161513", "#26241f", "#3d3a34", "#57534e"]}
            pixelSize={3}
            waveSpeed={0.03}
            waveFrequency={2.5}
            waveAmplitude={0.35}
            mouseRadius={0.35}
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(22,21,19,0.85),rgba(22,21,19,0.2))]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-4xl text-center">
          <Headline
            text={title}
            className="text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.036em] text-balance"
          />
          <FadeContent blur duration={0.9} delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/70">{body}</p>
            <div className="mt-12 flex justify-center">
              <ButtonLink href={href} variant="light">
                {cta}
              </ButtonLink>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}

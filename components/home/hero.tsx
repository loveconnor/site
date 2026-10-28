import BlurText from "@/components/BlurText";
import FadeContent from "@/components/FadeContent";
import Grainient from "@/components/Grainient";
import { Headline } from "@/components/headline";
import { ButtonLink } from "@/components/ui";
import { HeroFrame } from "@/components/home/hero-frame";

/*
 * The panel spans the site's 1600px column plus a small bleed, and its inner padding
 * lines the text up with the header and every section below (12px + 36px = 48px on desktop).
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-[1600px] px-3 pt-3 sm:px-4 lg:px-3">
      <HeroFrame>
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Grainient
            colors={["#161513", "#1d1512", "#4a1f10", "#d9481f", "#f2c9a8"]}
            angle={35}
            speed={0.35}
            grainAmount={0.09}
            dpr={1.5}
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(22,21,19,0.6),rgba(22,21,19,0)_50%)]"
          aria-hidden="true"
        />

        <div className="flex flex-1 flex-col px-5 pt-32 pb-8 sm:px-4 sm:pb-10 lg:px-9">
          <div className="mt-auto">
            <Headline
              as="h1"
              afterIntro
              delay={0.1}
              text={"Websites that explain your business.\nSoftware that helps run it."}
              // Sized so the longer sentence (about 17em in Mona Sans wide) fills the column
              // on desktop; phones fall back to a readable minimum and wrap.
              className="text-[length:max(2.5rem,min(calc((100vw_-_6.5rem)/17.2),5.45rem))] leading-[1.02] font-medium tracking-[-0.035em]"
            />

            <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-12 md:items-end">
              <BlurText
                text="Moirel Studio creates custom websites, product interfaces, and useful tools for businesses and product teams. Work directly with me from the first conversation through the final details."
                animateBy="words"
                delay={14}
                trigger="load"
                className="max-w-[30rem] text-[16px] leading-relaxed text-paper/75 md:col-span-5"
              />
              <FadeContent trigger="mount" delay={1.2} duration={0.8} className="md:col-span-3 md:col-start-7">
                <p className="text-[14px] leading-relaxed text-paper/55">
                  Independent design and development studio
                  <br />
                  Columbus, Ohio
                </p>
              </FadeContent>
              <FadeContent trigger="mount" delay={1.4} duration={0.8} className="md:col-span-3 md:col-start-10">
                <div className="flex md:justify-end">
                  <ButtonLink href="/contact" variant="light">
                    Start a project
                  </ButtonLink>
                </div>
              </FadeContent>
            </div>
          </div>
        </div>
      </HeroFrame>
    </section>
  );
}

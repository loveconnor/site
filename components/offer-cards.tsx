import Counter from "@/components/Counter";
import AnimatedContent from "@/components/AnimatedContent";
import { ButtonLink } from "@/components/ui";
import { inquiryHref, offers } from "@/lib/site";

export function OfferCards() {
  return (
    <AnimatedContent stagger={0.1} distance={30} className="grid gap-4 lg:grid-cols-3">
      {offers.map((offer) => {
        const featured = offer.id === "monthly";
        return (
          <div
            key={offer.id}
            className={`flex h-full flex-col rounded-[24px] p-8 ${
              featured ? "bg-ink text-paper" : "bg-card ring-1 ring-line ring-inset"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium tracking-[-0.02em]">{offer.name}</h3>
              {featured && <span className="text-[13px] text-paper/60">Ongoing</span>}
            </div>
            <div className="mt-12">
              <p className={`h-5 text-[13px] ${featured ? "text-paper/50" : "text-ink-3"}`}>{offer.priceLead}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <Counter
                  value={offer.price}
                  prefix="$"
                  locale="en-US"
                  fontSize="clamp(2.5rem, 4vw, 3.25rem)"
                  fontWeight={500}
                  textColor={featured ? "#f6f4ef" : "#161513"}
                  tabular
                  className="font-wide tracking-[-0.035em]"
                />
                {offer.priceUnit && (
                  <span className={`text-sm ${featured ? "text-paper/60" : "text-ink-2"}`}>{offer.priceUnit}</span>
                )}
              </div>
            </div>
            <p className={`mt-6 text-[15px] leading-relaxed ${featured ? "text-paper/70" : "text-ink-2"}`}>
              {offer.summary}
            </p>
            <div className="mt-auto pt-10">
              <ButtonLink href={inquiryHref(offer.id)} variant={featured ? "light" : "secondary"} magnetic={false}>
                {offer.cta}
              </ButtonLink>
            </div>
          </div>
        );
      })}
    </AnimatedContent>
  );
}

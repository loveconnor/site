export const site = {
  name: "Moirel",
  legalName: "Moirel Studio",
  url: "https://moirel.com",
  email: "connor@connorlove.com",
  signature: "Patterned by design. Engineered to ship.",
  founder: "Connor Love",
  location: "Columbus, Ohio",
  bookingUrl: "https://cal.com/loveconnor",
  portfolioUrl: "https://connorlove.com",
  githubUrl: "https://github.com/loveconnor",
  // Set NEXT_PUBLIC_CLIENT_LOGIN_URL once the client workspace has a public address.
  clientLoginUrl: process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL,
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Studio", href: "/studio" },
];

export type EngagementId = "project" | "monthly" | "care" | "unsure";

export const engagements: { id: EngagementId; label: string }[] = [
  { id: "project", label: "A defined project" },
  { id: "monthly", label: "Studio Monthly" },
  { id: "care", label: "Site Care" },
  { id: "unsure", label: "I’m not sure yet" },
];

export const offers = [
  {
    id: "project" as const,
    name: "Projects",
    price: 4500,
    priceLead: "Website builds from",
    priceUnit: "",
    summary:
      "A defined scope and an agreed price for a new website, a substantial redesign, or a custom build. Applications are scoped individually.",
    cta: "Discuss a project",
  },
  {
    id: "monthly" as const,
    name: "Studio Monthly",
    price: 3000,
    priceLead: "",
    priceUnit: "per month",
    summary:
      "24 hours of reserved design and development capacity each billing month. One active request at a time, with a shared backlog for what comes next.",
    cta: "Discuss ongoing work",
  },
  {
    id: "care" as const,
    name: "Site Care",
    price: 250,
    priceLead: "",
    priceUnit: "per site per month",
    summary:
      "Routine care for an agreed website, plus up to one hour of minor content edits each month. Larger changes are quoted separately.",
    cta: "Ask about site care",
  },
];

export function inquiryHref(engagement?: EngagementId) {
  return engagement ? `/contact?engagement=${engagement}` : "/contact";
}

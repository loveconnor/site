import type { Metadata } from "next";
import { site } from "@/lib/site";

// The card from app/opengraph-image.tsx. Only the root segment picks it up automatically,
// and a page that sets its own openGraph drops it, so each page names it here.
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Moirel Studio: websites that explain your business, software that helps run it." };

export const homeDescription =
  "Custom websites, product interfaces, and useful software by Connor Love. Explore project builds, monthly studio capacity, and site care.";

/**
 * Title, description, canonical URL and share card for one page. A page's openGraph
 * replaces the layout's rather than merging with it, so every field is set here.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path?: string }): Metadata {
  const shareTitle = title ? `${title} | ${site.legalName}` : `${site.legalName} | Web Design and Development by ${site.founder}`;
  return {
    ...(title && { title }),
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      siteName: site.legalName,
      locale: "en_US",
      ...(path && { url: path }),
      title: shareTitle,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [shareImage] },
  };
}

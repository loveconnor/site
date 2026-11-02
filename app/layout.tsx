import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Mona_Sans, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Intro } from "@/components/intro";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorLabel } from "@/components/cursor-label";
import { PageTransition } from "@/components/page-transition";
import { homeDescription, homeTitle, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import "./globals.css";

// Mona Sans: expanded width for headlines, normal width for body. Geist Mono for small labels.
const sans = Mona_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  axes: ["wdth"],
});

const mono = Geist_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: "%s | Moirel Studio",
  },
  ...pageMetadata({ description: homeDescription }),
};

// Tells search engines what the business is and where. Static values only, so no escaping is needed.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  email: site.email,
  description: homeDescription,
  image: `${site.url}/opengraph-image`,
  address: { "@type": "PostalAddress", addressLocality: "Columbus", addressRegion: "OH", addressCountry: "US" },
  founder: { "@type": "Person", name: site.founder, url: site.portfolioUrl },
  sameAs: [site.portfolioUrl, site.githubUrl],
  knowsAbout: ["Web design", "Web development", "Web applications"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        <Intro />
        <SmoothScroll />
        <div className="relative">
          <SiteHeader />
          <div className="relative z-10 rounded-b-[28px] bg-paper pb-px shadow-[0_40px_80px_-40px_rgba(22,21,19,0.35)] sm:rounded-b-[40px]">
            <main>{children}</main>
          </div>
          <SiteFooter />
        </div>
        <CursorLabel />
        <PageTransition />
        <Analytics />
      </body>
    </html>
  );
}

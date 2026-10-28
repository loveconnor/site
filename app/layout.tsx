import type { Metadata } from "next";
import { Mona_Sans, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Intro } from "@/components/intro";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorLabel } from "@/components/cursor-label";
import { PageTransition } from "@/components/page-transition";
import { homeDescription, pageMetadata } from "@/lib/metadata";
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
    default: "Moirel Studio | Web Design and Development by Connor Love",
    template: "%s | Moirel Studio",
  },
  ...pageMetadata({ description: homeDescription }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-dvh">
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
      </body>
    </html>
  );
}

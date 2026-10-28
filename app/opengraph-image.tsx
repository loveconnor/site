import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Moirel Studio: websites that explain your business, software that helps run it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori cannot read woff2 or variable fonts, so the share card uses a static Mona Sans instance.
const font = readFile(join(process.cwd(), "assets/mona-sans-semiexpanded-medium.woff"));
const mark = readFile(join(process.cwd(), "public/logo.svg"), "utf8");

export default async function OpengraphImage() {
  const logo = `data:image/svg+xml;base64,${Buffer.from((await mark).replace("currentColor", "#f6f4ef")).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f6f4ef",
          backgroundColor: "#161513",
          backgroundImage: "radial-gradient(circle at 85% 0%, #d9481f 0%, rgba(217,72,31,0.35) 38%, rgba(22,21,19,0) 70%)",
          fontFamily: "Mona Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30 }}>
          <img src={logo} width={46} height={45} alt="" />
          {site.legalName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 60, lineHeight: 1.06, letterSpacing: "-0.035em" }}>
          <span>Websites that explain your business.</span>
          <span>Software that helps run it.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(246,244,239,0.7)" }}>
          <span>Design and development by {site.founder}</span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Mona Sans", data: await font, weight: 500, style: "normal" }] },
  );
}

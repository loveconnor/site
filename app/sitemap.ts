import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/services", "/pricing", "/studio", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...projects.map((project) => ({ url: `${site.url}/work/${project.slug}` })),
  ];
}

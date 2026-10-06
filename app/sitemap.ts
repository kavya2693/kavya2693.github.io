import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CASES } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "work/", "graph/", "lab/", "about/", "resume/"].map((p) => ({ url: `${SITE.url}/${p}`, changeFrequency: "monthly" as const }));
  const cases = CASES.map((c) => ({ url: `${SITE.url}/work/${c.slug}/`, changeFrequency: "monthly" as const }));
  return [...pages, ...cases, { url: `${SITE.url}/graph.html` }, { url: `${SITE.url}/hcp-nba-architecture.html` }];
}

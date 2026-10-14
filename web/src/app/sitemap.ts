import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services/", ...SERVICES.map((s) => `/services/${s.slug}/`), "/grit/", "/about/", "/careers/", "/contact/", "/privacy/", "/terms/"];
  return paths.map((p) => ({ url: `${SITE.origin}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}

import type { MetadataRoute } from "next";
import { allRoutes, site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...allRoutes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "monthly" as const,
      priority: route.split("/").length <= 2 ? 0.8 : 0.6,
    })),
  ];
}

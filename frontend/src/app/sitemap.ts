import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";
import { vehicles } from "@/data/vehicles";
import { brands } from "@/data/brands";
import { articles } from "@/data/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["/", "/inventory", "/brands", "/compare", "/sell-your-car", "/shop", "/media", "/journal", "/about", "/contact"].map(p => ({ url: abs(p), lastModified: now, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.8 }));
  return [...fixed,
    ...vehicles.map(v => ({ url: abs(`/inventory/${v.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: v.status === "available" ? 0.9 : 0.4 })),
    ...brands.map(b => ({ url: abs(`/brands/${b.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...articles.map(a => ({ url: abs(`/journal/${a.slug}`), lastModified: new Date(a.date), changeFrequency: "monthly" as const, priority: 0.5 }))];
}

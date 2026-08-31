import type { MetadataRoute } from "next";
import { team } from "@/content/team";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://childhoodisnow.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "", priority: 1 },
    { path: "/who-we-are", priority: 0.9 },
    { path: "/what-we-do", priority: 0.9 },
    { path: "/our-work", priority: 0.8 },
    { path: "/news", priority: 0.7 },
    { path: "/get-in-touch", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const bios = team.map((member) => ({
    url: `${siteUrl}/who-we-are/${member.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...bios];
}

import type { MetadataRoute } from "next";
import { team } from "@/content/team";
import { siteUrl } from "@/lib/seo";
import client from "../../tina/__generated__/client";

// No lastModified on the static pages: every deploy would stamp them with
// the build time, and search engines learn to ignore a lastmod that's
// always "now". Published posts carry their real date.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "", priority: 1 },
    { path: "/who-we-are", priority: 0.9 },
    { path: "/what-we-do", priority: 0.9 },
    { path: "/our-work", priority: 0.8 },
    { path: "/news", priority: 0.7 },
    { path: "/get-in-touch", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const bios = team.map((member) => ({
    url: `${siteUrl}/who-we-are/${member.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // "Coming soon" placeholders are noindexed, so they stay out of the map.
  const { data } = await client.queries.postConnection({});
  const posts = (data.postConnection.edges ?? []).flatMap((edge) => {
    const post = edge?.node;
    if (!post || post.comingSoon) return [];
    return [
      {
        url: `${siteUrl}/news/${post._sys.filename}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      },
    ];
  });

  return [...routes, ...bios, ...posts];
}

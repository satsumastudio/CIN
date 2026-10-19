import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Tina CMS admin is an application surface, not content.
      disallow: ["/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

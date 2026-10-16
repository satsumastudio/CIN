import type { Metadata } from "next";
import { Band } from "@/components/page-band";
import { SectionCurve } from "@/components/section-curve";
import { NewsList } from "@/components/tina/news-list";
import { getNewsListProps } from "@/lib/tina-data";
import client from "../../../../tina/__generated__/client";
import { NewsPageBand } from "./news-page-band";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.newsPage({ relativePath: "news.json" });
  return pageMetadata({
    title: data.newsPage.pageBand?.title || "News",
    description:
      data.newsPage.seo?.description ||
      "Updates, insight and announcements from Childhood is Now.",
    path: "/news",
  });
}

export default async function NewsPage() {
  const [newsProps, band] = await Promise.all([
    getNewsListProps(),
    client.queries.newsPage({ relativePath: "news.json" }),
  ]);

  return (
    <>
      <NewsPageBand data={band.data} query={band.query} variables={band.variables} />

      <Band tone="white">
        <NewsList {...newsProps} />
      </Band>
      <SectionCurve from="white" to="navy" variant={0} straight />
    </>
  );
}

import type { Metadata } from "next";
import { Band, PageBand } from "@/components/page-band";
import { SectionCurve } from "@/components/section-curve";
import { NewsList } from "@/components/tina/news-list";
import { getNewsListProps } from "@/lib/tina-data";

export const metadata: Metadata = {
  title: "News",
  description: "Updates, insight and announcements from Childhood is Now.",
};

export default async function NewsPage() {
  const newsProps = await getNewsListProps();

  return (
    <>
      <PageBand
        title="News"
        standfirst="Updates, insight and announcements from Childhood is Now."
        rule="bg-green-50t"
      />

      <Band tone="white">
        <NewsList {...newsProps} />
      </Band>
      <SectionCurve from="white" to="navy" variant={0} straight />
    </>
  );
}

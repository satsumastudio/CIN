import type { Metadata } from "next";
import { Band } from "@/components/page-band";
import { SectionCurve } from "@/components/section-curve";
import { NewsMore } from "@/components/tina/news-more";
import { NewsPostContent } from "@/components/tina/news-post";
import { getNewsTeaserProps } from "@/lib/tina-data";
import client from "../../../../../tina/__generated__/client";

// Every post in the CMS gets a page at build time, and every CMS save
// redeploys, so a slug that wasn't built here doesn't exist.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await client.queries.postConnection({});
  return (data.postConnection.edges ?? []).flatMap((edge) =>
    edge?.node ? [{ slug: edge.node._sys.filename }] : []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.queries.post({ relativePath: `${slug}.json` });
  return {
    title: data.post.title,
    description: data.post.excerpt ?? undefined,
    // A placeholder keeps its page only so it can be previewed while it's
    // being written in the CMS. Nothing links to it, so keep it out of search.
    robots: data.post.comingSoon ? { index: false } : undefined,
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, query, variables } = await client.queries.post({
    relativePath: `${slug}.json`,
  });
  const moreProps = await getNewsTeaserProps();

  return (
    <>
      <NewsPostContent data={data} query={query} variables={variables} />
      <Band tone="soft" curveFrom="white" curveVariant={1}>
        <NewsMore {...moreProps} currentSlug={slug} />
      </Band>
      <SectionCurve from="soft" to="navy" variant={0} straight />
    </>
  );
}

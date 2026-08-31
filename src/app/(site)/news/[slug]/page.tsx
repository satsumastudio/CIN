import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Band } from "@/components/page-band";
import { SectionCurve } from "@/components/section-curve";
import { NewsMore } from "@/components/tina/news-more";
import { NewsPostContent } from "@/components/tina/news-post";
import { getNewsPost, newsPosts } from "@/content/news";
import { getNewsTeaserProps } from "@/lib/tina-data";
import client from "../../../../../tina/__generated__/client";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getNewsPost(slug)) notFound();

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

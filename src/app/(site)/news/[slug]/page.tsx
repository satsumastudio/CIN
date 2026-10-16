import type { Metadata } from "next";
import { Band } from "@/components/page-band";
import { SectionCurve } from "@/components/section-curve";
import { NewsMore } from "@/components/tina/news-more";
import { NewsPostContent } from "@/components/tina/news-post";
import { getNewsTeaserProps } from "@/lib/tina-data";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  organizationId,
  pageMetadata,
  siteUrl,
} from "@/lib/seo";
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
  const post = data.post;
  return {
    ...pageMetadata({
      title: post.title,
      description:
        post.excerpt || "Updates, insight and announcements from Childhood is Now.",
      path: `/news/${slug}`,
      image: post.coverImage
        ? { url: post.coverImage, alt: post.coverAlt ?? post.title }
        : undefined,
      type: "article",
      publishedTime: post.comingSoon ? undefined : post.publishedAt ?? undefined,
    }),
    // A placeholder keeps its page only so it can be previewed while it's
    // being written in the CMS. Nothing links to it, so keep it out of search.
    robots: post.comingSoon ? { index: false } : undefined,
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
  const [moreProps, newsPage] = await Promise.all([
    getNewsTeaserProps(),
    client.queries.newsPage({ relativePath: "news.json" }),
  ]);

  const post = data.post;

  return (
    <>
      {!post.comingSoon && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: post.title,
                description: post.excerpt ?? undefined,
                datePublished: post.publishedAt ?? undefined,
                image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
                mainEntityOfPage: `${siteUrl}/news/${slug}`,
                author: { "@id": organizationId },
                publisher: { "@id": organizationId },
              },
              breadcrumbJsonLd([
                { name: "News", path: "/news" },
                { name: post.title, path: `/news/${slug}` },
              ]),
            ],
          }}
        />
      )}
      <NewsPostContent data={data} query={query} variables={variables} />
      <Band tone="soft" curveFrom="white" curveVariant={1}>
        <NewsMore
          {...moreProps}
          currentSlug={slug}
          heading={newsPage.data.newsPage.more?.heading}
          linkLabel={newsPage.data.newsPage.more?.linkLabel}
        />
      </Band>
      <SectionCurve from="soft" to="navy" variant={0} straight />
    </>
  );
}

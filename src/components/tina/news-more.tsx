"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { NewsCard } from "@/components/tina/news-card";
import { sortPosts } from "@/lib/news";
import type {
  PostConnectionQuery,
  PostConnectionQueryVariables,
} from "../../../tina/__generated__/types";

// Closing block for a single post. Without it an article ends on its last
// paragraph and hands straight to the footer, which wastes the one moment a
// reader has already chosen to keep reading.
export function NewsMore({
  data: initialData,
  query,
  variables,
  currentSlug,
}: {
  data: PostConnectionQuery;
  query: string;
  variables: PostConnectionQueryVariables;
  currentSlug: string;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const posts = sortPosts(
    (data.postConnection.edges ?? [])
      .flatMap((edge) => (edge?.node ? [edge.node] : []))
      .filter((post) => post._sys.filename !== currentSlug)
  ).slice(0, 2);

  if (posts.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl text-brand-blue sm:text-3xl">More from us</h2>
        <Link
          href="/news"
          className="link-arrow focus-ring min-h-11 items-center text-sm font-bold text-brand-blue transition-colors hover:text-blue-50t"
        >
          All news
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} sizes="(min-width: 640px) 50vw, 92vw" />
        ))}
      </div>
    </>
  );
}

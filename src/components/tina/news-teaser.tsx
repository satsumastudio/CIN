"use client";

import { useTina } from "tinacms/dist/react";
import { NewsCard } from "@/components/tina/news-card";
import { sortPosts } from "@/lib/news";
import type { PostConnectionQuery, PostConnectionQueryVariables } from "../../../tina/__generated__/types";

export function NewsTeaser({
  data: initialData,
  query,
  variables,
}: {
  data: PostConnectionQuery;
  query: string;
  variables: PostConnectionQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const posts = sortPosts(
    (data.postConnection.edges ?? []).flatMap((edge) => (edge?.node ? [edge.node] : []))
  ).slice(0, 3);

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-3">
      {posts.map((post) => (
        <NewsCard key={post.id} post={post} sizes="(min-width: 640px) 33vw, 92vw" />
      ))}
    </div>
  );
}

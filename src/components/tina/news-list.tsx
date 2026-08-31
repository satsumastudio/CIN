"use client";

import { useTina } from "tinacms/dist/react";
import { NewsCard } from "@/components/tina/news-card";
import { sortPosts } from "@/lib/news";
import type { PostConnectionQuery, PostConnectionQueryVariables } from "../../../tina/__generated__/types";

export function NewsList({
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
  );

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <NewsCard
            post={post}
            sizes="(min-width: 640px) 32rem, 92vw"
            titleAs="h2"
            large
            showExcerpt
          />
        </li>
      ))}
    </ul>
  );
}

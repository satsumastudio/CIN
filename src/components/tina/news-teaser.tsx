"use client";

import Link from "next/link";
import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { Card } from "@/components/section-heading";
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
  const posts = (data.postConnection.edges ?? [])
    .flatMap((edge) => (edge?.node ? [edge.node] : []))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 3);

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} hover className="flex h-full flex-col overflow-hidden">
          <Link href={`/news/${post._sys.filename}`} className="focus-ring flex h-full flex-col">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt ?? ""}
                  fill
                  sizes="(min-width: 640px) 33vw, 92vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-blue/70">
                {post.publishedAt &&
                  new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </p>
              <p className="mt-2 text-lg text-brand-blue" data-tina-field={tinaField(post, "title")}>
                {post.title}
              </p>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { Card } from "@/components/section-heading";
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
  const posts = (data.postConnection.edges ?? [])
    .flatMap((edge) => (edge?.node ? [edge.node] : []))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <Card hover className="flex h-full flex-col overflow-hidden">
            {post.coverImage && (
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt ?? ""}
                  fill
                  sizes="(min-width: 640px) 32rem, 92vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-blue/70">
                {post.publishedAt &&
                  new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </p>
              <h2 className="mt-2 text-xl">
                <Link
                  href={`/news/${post._sys.filename}`}
                  className="focus-ring underline decoration-transparent underline-offset-4 transition-colors hover:text-blue-50t hover:decoration-current"
                  data-tina-field={tinaField(post, "title")}
                >
                  {post.title}
                </Link>
              </h2>
              <p
                className="mt-2 flex-1 text-sm leading-relaxed text-brand-blue/75"
                data-tina-field={tinaField(post, "excerpt")}
              >
                {post.excerpt}
              </p>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}


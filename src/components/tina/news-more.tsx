"use client";

import Link from "next/link";
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import { Card } from "@/components/section-heading";
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
  const posts = (data.postConnection.edges ?? [])
    .flatMap((edge) => (edge?.node ? [edge.node] : []))
    .filter((post) => post._sys.filename !== currentSlug)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 2);

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
          <Card key={post.id} hover className="flex h-full flex-col overflow-hidden">
            <Link
              href={`/news/${post._sys.filename}`}
              className="focus-ring flex h-full flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt ?? ""}
                    fill
                    sizes="(min-width: 640px) 50vw, 92vw"
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
                <p className="mt-2 text-lg text-brand-blue">{post.title}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}

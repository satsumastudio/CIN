"use client";

import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { Band } from "@/components/page-band";
import type { PostQuery, PostQueryVariables } from "../../../tina/__generated__/types";

const rules = ["bg-green-50t", "bg-red-50t", "bg-yellow-50t", "bg-blue-50t"];

export function NewsPostContent({
  data: initialData,
  query,
  variables,
}: {
  data: PostQuery;
  query: string;
  variables: PostQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const post = data.post;

  // Deterministic per-post accent, so a post keeps the same colour every
  // visit and consecutive posts don't land on the same one.
  const seed = (post._sys.filename ?? "").charCodeAt(0) || 0;
  const tone = seed % 4;

  return (
    <Band tone="white">
      <article className="mx-auto max-w-3xl">
        <span aria-hidden className={`rule-top mb-5 block ${rules[tone]}`} />
        <p className="text-xs font-bold uppercase tracking-wide text-brand-blue/70">
          {post.publishedAt &&
            new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
        </p>
        <h1
          className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-blue"
          data-tina-field={tinaField(post, "title")}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            className="mt-5 text-balance text-xl leading-snug text-brand-blue/90 sm:text-2xl"
            data-tina-field={tinaField(post, "excerpt")}
          >
            {post.excerpt}
          </p>
        )}

        {post.coverImage && (
          // Deliberately straight and static, unlike the tilted photography
          // elsewhere: a tilt reads as a placed print on a profile or a
          // marketing block, but as a rendering fault on an article.
          <div
            className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-sm"
            data-tina-field={tinaField(post, "coverImage")}
          >
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? ""}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="mt-12 space-y-5 text-lg leading-relaxed text-brand-blue/80"
          data-tina-field={tinaField(post, "body")}
        >
          {(post.body ?? []).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Band>
  );
}

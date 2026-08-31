import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { Card } from "@/components/section-heading";
import { formatPostDate } from "@/lib/news";

type CardPost = {
  title: string;
  publishedAt?: string | null;
  comingSoon?: boolean | null;
  excerpt?: string | null;
  coverImage?: string | null;
  coverAlt?: string | null;
  _sys: { filename: string };
};

// A "coming soon" placeholder has no article to open yet, so it renders
// without a link or any hover movement rather than as a card that looks
// clickable and goes nowhere.
export function NewsCard({
  post,
  sizes,
  titleAs: Title = "p",
  large = false,
  showExcerpt = false,
}: {
  post: CardPost;
  sizes: string;
  titleAs?: "p" | "h2" | "h3";
  large?: boolean;
  showExcerpt?: boolean;
}) {
  const live = !post.comingSoon;

  const content = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.coverAlt ?? ""}
            fill
            sizes={sizes}
            className={`object-cover ${live ? "transition-transform duration-300 group-hover:scale-[1.04]" : ""}`}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-blue/70">
          {formatPostDate(post)}
        </p>
        <Title
          className={`mt-2 text-brand-blue ${large ? "text-xl" : "text-lg"}`}
          data-tina-field={tinaField(post, "title")}
        >
          {post.title}
        </Title>
        {showExcerpt && post.excerpt && (
          <p
            className="mt-2 flex-1 text-sm leading-relaxed text-brand-blue/75"
            data-tina-field={tinaField(post, "excerpt")}
          >
            {post.excerpt}
          </p>
        )}
      </div>
    </>
  );

  return (
    <Card hover={live} className="flex h-full flex-col overflow-hidden">
      {live ? (
        <Link href={`/news/${post._sys.filename}`} className="focus-ring flex h-full flex-col">
          {content}
        </Link>
      ) : (
        <div className="flex h-full flex-col">{content}</div>
      )}
    </Card>
  );
}

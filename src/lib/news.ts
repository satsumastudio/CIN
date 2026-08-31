type PostTiming = { publishedAt?: string | null; comingSoon?: boolean | null };

// Published articles newest first, then "coming soon" placeholders soonest
// first, so upcoming months read left to right after anything already out.
export function sortPosts<T extends PostTiming>(posts: T[]): T[] {
  const published = posts
    .filter((p) => !p.comingSoon)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  const upcoming = posts
    .filter((p) => p.comingSoon)
    .sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));
  return [...published, ...upcoming];
}

// Placeholders only know their month, so they drop the day. The timezone is
// pinned because these cards also render in the browser: formatting in the
// visitor's own zone can shift a midnight date back a day (or a month) and
// disagree with the server-rendered HTML.
export function formatPostDate(post: PostTiming): string {
  if (!post.publishedAt) return "";
  return new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: post.comingSoon ? undefined : "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

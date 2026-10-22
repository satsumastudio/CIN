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

type RichTextNode = { type?: string; text?: string; children?: RichTextNode[] };

// Plain text of a rich-text article, for when no summary has been written.
function richTextToPlain(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as RichTextNode;
  if (typeof n.text === "string") return n.text;
  const inner = (n.children ?? []).map(richTextToPlain).join(n.type === "root" ? " " : "");
  return inner.replace(/\s+/g, " ").trim();
}

// The written summary, or the article's opening trimmed to a sentence
// boundary near `max` characters, so cards and search snippets never end
// mid-word.
export function postSummary(
  post: { excerpt?: string | null; body?: unknown },
  max = 160
): string {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  const text = richTextToPlain(post.body);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd > max * 0.5) return cut.slice(0, sentenceEnd + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

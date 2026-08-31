import listeningToBabies from "../../content/posts/listening-to-babies-changes-decisions.json";
import bestStartInLife from "../../content/posts/best-start-in-life-one-year-on.json";
import recognisedForReducing from "../../content/posts/recognised-for-reducing-health-inequalities.json";

export type NewsPost = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  body: string[];
};

// Content lives in content/posts/*.json, editable via the Tina CMS admin at
// /admin. The slug (used for routing) comes from the filename rather than
// being a separate field, so it can't drift out of sync with the file Tina
// is actually editing.
export const newsPosts: NewsPost[] = [
  { slug: "listening-to-babies-changes-decisions", ...listeningToBabies },
  { slug: "best-start-in-life-one-year-on", ...bestStartInLife },
  { slug: "recognised-for-reducing-health-inequalities", ...recognisedForReducing },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

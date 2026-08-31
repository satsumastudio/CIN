import louiseHarrington from "../../content/team/louise-harrington.json";
import lucyWilliams from "../../content/team/lucy-williams.json";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  email: string;
  photo: string;
  shortBio: string;
  fullBio: string[];
};

// Content lives in content/team/*.json, editable via the Tina CMS admin at
// /admin. The slug (used for routing) comes from the filename rather than
// being a separate field, so it can't drift out of sync with the file Tina
// is actually editing.
export const team: TeamMember[] = [
  { slug: "louise-harrington", ...louiseHarrington },
  { slug: "lucy-williams", ...lucyWilliams },
];

export type NavItem = {
  label: string;
  href: string;
};

// Navigation structure lives in code rather than Tina — changing it means
// changing which pages/routes exist, not editing page copy, so it stays a
// developer change rather than something exposed to the CMS.
export const primaryNav: NavItem[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Work", href: "/our-work" },
  { label: "News", href: "/news" },
];

export const ctaNav: NavItem = { label: "Get In Touch", href: "/get-in-touch" };

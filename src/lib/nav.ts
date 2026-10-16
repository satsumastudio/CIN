import type { SiteSettingsQuery } from "../../tina/__generated__/types";

export type NavItem = {
  label: string;
  href: string;
  /** The Menu labels field this item's text comes from. */
  field: "whoWeAre" | "whatWeDo" | "ourWork" | "news" | "getInTouch";
};

type NavLabels = SiteSettingsQuery["siteSettings"]["navigation"];

// Which pages are in the menu is a developer change (it means adding or
// removing routes); what each one is called is copy, edited in Tina under
// Site-wide Text → Menu labels.
export function primaryNav(labels: NavLabels): NavItem[] {
  return [
    { label: labels?.whoWeAre || "Who We Are", href: "/who-we-are", field: "whoWeAre" },
    { label: labels?.whatWeDo || "What We Do", href: "/what-we-do", field: "whatWeDo" },
    { label: labels?.ourWork || "Our Work", href: "/our-work", field: "ourWork" },
    { label: labels?.news || "News", href: "/news", field: "news" },
  ];
}

export function ctaNav(labels: NavLabels): NavItem {
  return { label: labels?.getInTouch || "Get In Touch", href: "/get-in-touch", field: "getInTouch" };
}

import type { Metadata } from "next";
import { siteImage } from "@/lib/images";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://childhoodisnow.co.uk";

export const siteName = "Childhood is Now";

export const defaultTitle =
  "Childhood is Now — because children's futures can't wait";

export const defaultDescription =
  "Childhood is Now works with local authorities, the NHS and the Voluntary Community, Faith and Social Enterprise (VCFSE) sector to co-create fairer, healthier early years systems — built on evidence, creativity and authentic collaboration.";

const defaultImage = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "A woman crouches on sunlit grass in a park, steadying a toddler in a yellow checked shirt",
};

/** Absolute URL for a site path or an already-absolute media URL. */
export function absoluteUrl(path: string) {
  const local = siteImage(path);
  return local.startsWith("http") ? local : `${siteUrl}${local}`;
}

/**
 * Per-page metadata. Next.js replaces (rather than merges) a parent's
 * openGraph and twitter objects, so a page that sets only a title would
 * otherwise share with the homepage's title and URL. Every page goes
 * through here to get its own canonical URL and link-preview card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: {
  title?: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article" | "profile";
  publishedTime?: string;
}): Metadata {
  const shareTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const images = image ? [{ url: siteImage(image.url), alt: image.alt }] : [defaultImage];

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_GB",
      siteName,
      url: path,
      title: shareTitle,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Renders schema.org structured data for search engines. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a stray "</script>" in CMS content can't break out.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Home › section › page trail, shown by Google in place of the raw URL. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export const organizationId = `${siteUrl}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      legalName: "Childhood is Now Ltd",
      url: siteUrl,
      logo: absoluteUrl("/images/logos/logo-blue.png"),
      image: absoluteUrl(defaultImage.url),
      description: defaultDescription,
      email: "info@childhoodisnow.co.uk",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Companies House number",
        value: "16954121",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "16 Upper Woburn Place",
        addressLocality: "London",
        postalCode: "WC1H 0AF",
        addressCountry: "GB",
      },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Early years systems",
        "Best Start in Life",
        "Family Hubs",
        "Public health",
        "Health inequalities",
        "Co-design and participation",
        "Evaluation",
      ],
      founder: [
        { "@id": `${siteUrl}/who-we-are/louise-harrington#person` },
        { "@id": `${siteUrl}/who-we-are/lucy-williams#person` },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: "en-GB",
      publisher: { "@id": organizationId },
    },
  ],
};

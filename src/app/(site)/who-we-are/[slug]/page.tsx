import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionCurve } from "@/components/section-curve";
import { TeamMemberContent } from "@/components/tina/team-member";
import { team } from "@/content/team";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  organizationId,
  pageMetadata,
  siteUrl,
} from "@/lib/seo";
import client from "../../../../../tina/__generated__/client";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return {};
  return pageMetadata({
    title: `${member.name}, ${member.role}`,
    description: firstSentences(member.shortBio),
    path: `/who-we-are/${slug}`,
    image: { url: member.photo, alt: member.name },
    type: "profile",
  });
}

// Search snippets cut off around 155 characters, so lead with whole
// sentences that fit rather than a mid-word truncation.
function firstSentences(text: string, max = 160) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  return (out || sentences[0]).trim();
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!team.find((m) => m.slug === slug)) notFound();

  const { data, query, variables } = await client.queries.team({
    relativePath: `${slug}.json`,
  });

  const member = team.find((m) => m.slug === slug)!;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${siteUrl}/who-we-are/${slug}#person`,
              name: member.name,
              jobTitle: member.role,
              email: member.email,
              image: absoluteUrl(member.photo),
              description: member.shortBio,
              url: `${siteUrl}/who-we-are/${slug}`,
              worksFor: { "@id": organizationId },
            },
            breadcrumbJsonLd([
              { name: "Who we are", path: "/who-we-are" },
              { name: member.name, path: `/who-we-are/${slug}` },
            ]),
          ],
        }}
      />
      <TeamMemberContent data={data} query={query} variables={variables} />
      <SectionCurve from="white" to="navy" variant={2} straight />
    </>
  );
}

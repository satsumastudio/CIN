import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionCurve } from "@/components/section-curve";
import { TeamMemberContent } from "@/components/tina/team-member";
import { team } from "@/content/team";
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
  return { title: member ? member.name : "Team Member" };
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

  return (
    <>
      <TeamMemberContent data={data} query={query} variables={variables} />
      <SectionCurve from="white" to="navy" variant={2} straight />
    </>
  );
}

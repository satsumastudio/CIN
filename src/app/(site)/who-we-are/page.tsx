import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { getTeamGridProps, getValuesGridProps } from "@/lib/tina-data";
import { WhoWeAreClient } from "./who-we-are-client";
import { pageMetadata } from "@/lib/seo";

// Title and search description come from the CMS; the fallbacks cover a
// field left blank.
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.whoWeArePage({ relativePath: "who-we-are.json" });
  return pageMetadata({
    title: data.whoWeArePage.pageBand?.title || "Who we are",
    description:
      data.whoWeArePage.seo?.description ||
      "Founded by Louise Harrington and Lucy Williams, Childhood is Now combines public health, early years and creative engagement expertise with senior leadership experience across national charities, local government and the NHS.",
    path: "/who-we-are",
  });
}

export default async function WhoWeArePage() {
  const [{ data, query, variables }, teamProps, valuesProps] = await Promise.all([
    client.queries.whoWeArePage({ relativePath: "who-we-are.json" }),
    getTeamGridProps(),
    getValuesGridProps(),
  ]);

  return (
    <WhoWeAreClient
      data={data}
      query={query}
      variables={variables}
      teamProps={teamProps}
      valuesProps={valuesProps}
    />
  );
}

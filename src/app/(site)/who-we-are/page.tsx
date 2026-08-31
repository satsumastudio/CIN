import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { getTeamGridProps, getValuesGridProps } from "@/lib/tina-data";
import { WhoWeAreClient } from "./who-we-are-client";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Founded by Louise Harrington and Lucy Williams, Childhood is Now combines public health, early years and creative engagement expertise with senior leadership experience across national charities, local government and the NHS.",
};

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

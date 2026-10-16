import client from "../../../tina/__generated__/client";
import { getValuesGridProps, getNewsTeaserProps } from "@/lib/tina-data";
import type { Metadata } from "next";
import { HomeClient } from "./home-client";
import { defaultDescription, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description: defaultDescription,
  path: "/",
});

export default async function Home() {
  const [{ data, query, variables }, valuesProps, newsProps] = await Promise.all([
    client.queries.home({ relativePath: "home.json" }),
    getValuesGridProps(),
    getNewsTeaserProps(),
  ]);

  return (
    <HomeClient
      data={data}
      query={query}
      variables={variables}
      valuesProps={valuesProps}
      newsProps={newsProps}
    />
  );
}

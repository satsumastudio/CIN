import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { WhatWeDoClient } from "./what-we-do-client";
import { pageMetadata } from "@/lib/seo";

// Title and search description come from the CMS; the fallbacks cover a
// field left blank.
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.whatWeDoPage({ relativePath: "what-we-do.json" });
  return pageMetadata({
    title: data.whatWeDoPage.pageBand?.title || "What we do",
    description:
      data.whatWeDoPage.seo?.description ||
      "Hands-on senior support to design and improve early years strategies, bring partners together across sectors, embed co-design and participation, and translate evidence into real-world delivery.",
    path: "/what-we-do",
  });
}

export default async function WhatWeDoPage() {
  const { data, query, variables } = await client.queries.whatWeDoPage({
    relativePath: "what-we-do.json",
  });

  return <WhatWeDoClient data={data} query={query} variables={variables} />;
}

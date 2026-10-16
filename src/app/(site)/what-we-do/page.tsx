import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { WhatWeDoClient } from "./what-we-do-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "What we do",
  description:
    "Hands-on senior support to design and improve early years strategies, bring partners together across sectors, embed co-design and participation, and translate evidence into real-world delivery.",
  path: "/what-we-do",
});

export default async function WhatWeDoPage() {
  const { data, query, variables } = await client.queries.whatWeDoPage({
    relativePath: "what-we-do.json",
  });

  return <WhatWeDoClient data={data} query={query} variables={variables} />;
}

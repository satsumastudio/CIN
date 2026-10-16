import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { OurWorkClient } from "./our-work-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our work",
  description:
    "Current work, advisory group memberships and publications from two decades of leadership in early years, public health and children's services.",
  path: "/our-work",
});

export default async function OurWorkPage() {
  const { data, query, variables } = await client.queries.ourWorkPage({
    relativePath: "our-work.json",
  });

  return <OurWorkClient data={data} query={query} variables={variables} />;
}

import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { OurWorkClient } from "./our-work-client";
import { pageMetadata } from "@/lib/seo";

// Title and search description come from the CMS; the fallbacks cover a
// field left blank.
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.ourWorkPage({ relativePath: "our-work.json" });
  return pageMetadata({
    title: data.ourWorkPage.pageBand?.title || "Our work",
    description:
      data.ourWorkPage.seo?.description ||
      "Current work, advisory group memberships and publications from two decades of leadership in early years, public health and children's services.",
    path: "/our-work",
  });
}

export default async function OurWorkPage() {
  const { data, query, variables } = await client.queries.ourWorkPage({
    relativePath: "our-work.json",
  });

  return <OurWorkClient data={data} query={query} variables={variables} />;
}

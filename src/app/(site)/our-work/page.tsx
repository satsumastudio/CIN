import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { OurWorkClient } from "./our-work-client";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Current work and a track record built over two decades — including the National Centre for Family Hubs, NSPCC's Pregnancy in Mind, Making it REAL, Families Connect and the National Evaluation of Sure Start.",
};

export default async function OurWorkPage() {
  const { data, query, variables } = await client.queries.ourWorkPage({
    relativePath: "our-work.json",
  });

  return <OurWorkClient data={data} query={query} variables={variables} />;
}

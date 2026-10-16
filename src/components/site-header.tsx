import client from "../../tina/__generated__/client";
import { SiteHeaderClient } from "./site-header-client";

export async function SiteHeader() {
  const { data, query, variables } = await client.queries.siteSettings({
    relativePath: "site-settings.json",
  });

  return <SiteHeaderClient data={data} query={query} variables={variables} />;
}

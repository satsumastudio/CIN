import client from "../../tina/__generated__/client";

// Server-only data fetchers for the shared Tina-connected sections (Values,
// Founders, News). Kept out of the "use client" component files — an async
// function exported from a client-boundary file becomes client-only too,
// which breaks calling it from a server component during the page's own
// data fetch.
export async function getValuesGridProps() {
  const res = await client.queries.valueConnection({});
  return { data: res.data, query: res.query, variables: res.variables };
}

export async function getTeamGridProps() {
  const res = await client.queries.teamConnection({});
  return { data: res.data, query: res.query, variables: res.variables };
}

export async function getNewsTeaserProps() {
  const res = await client.queries.postConnection({});
  return { data: res.data, query: res.query, variables: res.variables };
}

export async function getNewsListProps() {
  const res = await client.queries.postConnection({});
  return { data: res.data, query: res.query, variables: res.variables };
}

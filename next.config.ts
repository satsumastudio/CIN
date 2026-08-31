import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content is edited through Tina and every save is a fresh deploy, so a
  // reviewer needs the next click to show new copy. Next's default
  // client-side Router Cache holds static pages in memory for 5 minutes,
  // which reads as "the site didn't update" even once the server has moved
  // on. 30 is the lowest Next.js allows — the right trade for a low-traffic
  // marketing site being actively reviewed, over shaving a network round trip.
  experimental: {
    staleTimes: { static: 30, dynamic: 0 },
  },
  // The Tina admin is a static file at public/admin/index.html — without
  // this, visiting the bare /admin (no trailing file) 404s, which is the
  // URL anyone will naturally type or bookmark.
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/", destination: "/admin/index.html" },
    ];
  },
  images: {
    remotePatterns: [
      // TinaCloud mirrors media referenced in content into its own CDN, so
      // image fields resolved through the cloud content API return
      // assets.tina.io URLs rather than local /images/... paths.
      { protocol: "https", hostname: "assets.tina.io" },
    ],
  },
};

export default nextConfig;

// TinaCloud hands image fields back as assets.tina.io URLs, but every upload
// is also committed to the repo under public/images. Serving that copy lets
// Vercel's image optimiser read from this deployment instead of fetching
// from Tina's CDN on every cache miss (~0.8s per image).
const TINA_ASSET = /^https:\/\/assets\.tina\.io\/[^/]+\//;

export function siteImage(src: string) {
  return src.replace(TINA_ASSET, "/images/");
}

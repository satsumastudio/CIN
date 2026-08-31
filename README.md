# Childhood is Now — website (v2)

Next.js site with content editing handled by [Tina CMS](https://tina.io). All page copy lives as JSON files under `content/`, editable either by hand or through Tina's admin UI at `/admin`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3021](http://localhost:3021) for the site, and [http://localhost:3021/admin/index.html](http://localhost:3021/admin/index.html) for the content editor. In local dev, "Enter Edit Mode" saves changes straight to the JSON files on disk — no account needed.

## Connecting TinaCloud (required before the client can edit the live site)

Tina needs a TinaCloud project so editing works on the deployed site, not just on your own machine. This is a one-time setup:

1. Go to [app.tina.io](https://app.tina.io) and sign up (free tier is fine for this project).
2. Create a new project, connect it to this GitHub repository, and point it at the `main` branch.
3. From the project's **Overview** tab, copy the **Client ID**.
4. From the **Tokens** tab, generate a token.
5. In Vercel, add both as environment variables on this project:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` — the Client ID (safe to expose to the browser)
   - `TINA_TOKEN` — the token (keep secret)
6. Redeploy. `/admin` on the live site will then prompt for TinaCloud login instead of "local mode", and edits made there commit straight to this repo — which triggers a normal Vercel redeploy a minute or two later.
7. In TinaCloud's project settings, invite the client's email address as an editor so they can log in.

For local dev, the same two variables can go in a `.env.local` file (see `.env.local.example`) if you want to test against TinaCloud instead of local mode — otherwise local mode works with no setup at all.

## Content structure

- `content/pages/*.json` — one file per page (home, who-we-are, what-we-do, our-work, get-in-touch, privacy, site-settings). Each maps to a "singleton" collection in the Tina admin, so editors can't accidentally create duplicates or delete the only copy.
- `content/team/*.json` — the two founder bios (Who We Are page).
- `content/values/*.json` — the four "What we stand for" cards.
- `content/posts/*.json` — News articles. Filename becomes the URL slug.

Navigation structure (which pages exist, their URLs) is intentionally kept in code (`src/lib/nav.ts`) rather than exposed to the CMS, since editing it wrong could break routing.

## Deploy on Vercel

Push to `main` and import the repo in Vercel as normal — no special build configuration needed beyond the environment variables above.

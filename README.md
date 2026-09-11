# DeskMux showcase

The public presentation of [DeskMux](https://github.com/dion-labs/deskmux),
independent of the native application's release and deployment lifecycle.

`npm ci` then `npm run dev`. `npm run build` emits static HTML and assets to
`dist`. Cloudflare Pages uses `main`, `npm run build`, and output `dist`.
Production: https://deskmux.dionlabs.ai. Project: `deskmux-site`.

Every push to `main` builds automatically through the GitHub-connected Pages
project at `deskmux-site-7l8.pages.dev`. The `deskmux-domain` Worker is a small
custom-domain proxy to that origin; it has no application state or copied assets.
Only router changes need `wrangler deploy --config wrangler.router.jsonc`.

The interactive desk is an illustrative preview. It never accesses devices or
connects to DeskMux. Update compatibility claims and release download links
alongside application releases. Mux is original artwork created for Dion Labs.

The 1200×630 Open Graph / X card is a typeset HTML composition using the
existing Mux artwork. Edit `scripts/social-card.html`, then run
`node scripts/build-social-card.mjs` with Chrome installed to regenerate
`public/social-preview-v2.png`. Keep both image metadata sets in sync.

## Missing pages

`public/404.html` is copied to the output root during the build. Cloudflare
Pages uses it to return HTTP 404 for unknown paths instead of falling back to
the homepage. Keep this file when changing the build or hosting configuration.

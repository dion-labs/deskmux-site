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

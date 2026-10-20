# Rottweiler Brew and Pub website

Brand site for Rottweiler Brew and Pub, built with [Astro](https://astro.build). It builds to plain static HTML, so it runs on GitHub Pages with no server.

## Run it locally

```
npm install
npm run dev
```

Open http://localhost:4321.

## Edit the beers

All beer copy and specs live in `src/data/beers.json`: name, style, ABV, Plato, BU, EBC, glass colour, tasting notes and the dog character. Contact details and the company line live in `src/data/site.js`. Change them there and every section updates.

## Where things are

- `src/pages/index.astro` puts the page together, one component per section
- `src/components/` holds the sections (hero, story, pack, taste map, trade, footer, age gate)
- `src/styles/global.css` holds the colour, type and layout tokens
- `src/scripts/site.js` runs the age gate, copy buttons, menu and scroll effects
- `public/img/` holds the dog photos, `public/fonts/` the Neue June brand font

## Host it on GitHub Pages

1. Create a repository on GitHub and push this folder to its `main` branch.
2. In the repository, open Settings > Pages. Set Source to "GitHub Actions".
3. Every push to `main` now builds and publishes the site through `.github/workflows/deploy.yml`.

The site appears at `https://<your-account>.github.io/<repository-name>/`. The workflow sets the base path for that address on its own.

For a custom domain such as rottweilerbrewandpub.com, add the domain under Settings > Pages. Then remove the `BASE_PATH` line from the workflow so the site builds at the root.

## Content notes

- The Technical Manual is confidential, so the site only shows what would go on a label. Do not add recipes, suppliers or process steps.
- The dog photos were generated in Canva for this site.

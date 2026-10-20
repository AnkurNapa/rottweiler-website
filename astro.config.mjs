import { defineConfig } from 'astro/config';

// On GitHub Pages the deploy workflow sets SITE_URL and BASE_PATH (for example /rottweiler-brew-and-pub).
// Locally, or on a custom domain, both fall back to the site root.
export default defineConfig({
  site: process.env.SITE_URL || 'https://rottweilerbrewandpub.com',
  base: process.env.BASE_PATH || '/',
});

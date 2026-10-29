// @ts-check
import { defineConfig } from 'astro/config';

// Served as a GitHub Pages project page, https://inargb.github.io/design/.
// For a custom domain later, build with SITE_URL=https://example.com BASE_PATH=/
// (and add public/CNAME).
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://inargb.github.io',
  base: process.env.BASE_PATH ?? '/design',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});

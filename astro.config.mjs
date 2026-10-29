// @ts-check
import { defineConfig } from 'astro/config';

// Served at the custom domain root, https://inasilva.com/ (public/CNAME).
// To serve from https://inargb.github.io/portfolio/ again, build with
// SITE_URL=https://inargb.github.io BASE_PATH=/portfolio.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://inasilva.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});

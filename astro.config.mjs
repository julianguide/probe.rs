// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";

import expressiveCode from 'astro-expressive-code';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // Update if deploying elsewhere!
  site: 'https://julianguide.github.io',
  // UPDATE FOR BASE PATH
  base: 'probe.rs',
  integrations: [// Must go before mdx() to add code blocks
  expressiveCode(), mdx(), sitemap(), icon({iconDir: 'src/icons'}), preact()],

  vite: {
    plugins: [tailwindcss(), icon()],
    server: {
      // ssh -R 80:localhost:4321 serveo.net
      allowedHosts: ['.serveo.net'],
    },
  },

  compressHTML: true,
});
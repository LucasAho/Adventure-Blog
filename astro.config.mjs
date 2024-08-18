import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
    site: "https://lucas-asher.com",
    integrations: [sitemap(), robotsTxt()]
});

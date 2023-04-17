import { defineConfig } from 'astro/config';
import image from "@astrojs/image";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [image(), tailwind()],
  server: {
    host: true,
    port: 3001
  }
});
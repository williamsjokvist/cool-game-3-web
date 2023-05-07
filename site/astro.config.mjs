import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [image(), tailwind()],
  server: {
    host: true,
    port: import.meta.env.PORT
  },
  adapter: vercel({
    analytics: false,
    includeFiles: ['./cool-game-web.proto', './src/proto/cool-game-web.ts']
  })
});
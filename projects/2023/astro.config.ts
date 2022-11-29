import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/2023',
  trailingSlash: 'always',
  integrations: [tailwind()]
});

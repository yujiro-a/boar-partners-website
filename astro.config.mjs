// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

/** @type {import('astro').AstroIntegration} */
const studioOverlay = {
  name: 'studio-overlay',
  hooks: {
    'astro:config:setup': ({ injectScript, command }) => {
      if (command === 'dev') {
        injectScript('page', `
          (() => {
            const s = document.createElement('script');
            s.src = '/studio-overlay.js';
            document.body.appendChild(s);
          })();
        `);
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['framer-motion', 'lenis'],
    },
  },

  integrations: [react(), studioOverlay]
});
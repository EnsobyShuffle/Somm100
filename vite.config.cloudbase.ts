import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The existing Netlify experience is a browser-local React/PWA app.
// Keep its UI and storage keys while making it deployable to mainland hosting.
export default defineConfig({
  root: fileURLToPath(new URL('./cloudbase', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  // App-specific and custom domains serve this app at /. Shared hosting may
  // mount it at /somm100/. Relative URLs support both without changing storage.
  base: './',
  plugins: [
    {
      name: 'somm100-cloudbase-public-paths',
      enforce: 'pre',
      transform(code, id) {
        // Scope public URLs in this build; retain APIs, external URLs and phonetics.
        const file = id.split('?')[0];
        if (!/\/(app|data)\//.test(file) || file.includes('/node_modules/')) return;
        if (!/\.(?:tsx?|json)$/.test(file)) return;
        return code.replace(/(["'`])\/(media\/|brand\/|journal\/|wine-atlas\/|releases\/|sw\.js(?=["'`]))/g, '$1./$2');
      },
    },
    react(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  define: { 'import.meta.env.VITE_SOMM100_LOCAL_ONLY': 'true' },
  build: {
    outDir: fileURLToPath(new URL('./dist-cloudbase', import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
});

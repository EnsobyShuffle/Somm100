import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The existing Netlify experience is a browser-local React/PWA app.
// Keep its UI and storage keys while making it deployable to mainland hosting.
export default defineConfig({
  root: fileURLToPath(new URL('./cloudbase', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  base: '/',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  define: { 'import.meta.env.VITE_SOMM100_LOCAL_ONLY': 'true' },
  build: {
    outDir: fileURLToPath(new URL('./dist-cloudbase', import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
});

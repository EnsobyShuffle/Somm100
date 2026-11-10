import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cohort from './data/foundation-cohort22.json';
import concepts from './data/foundation-concepts.json';
import { renderCourseHome } from './cloudbase/course-home-content.mjs';

const courseHome = fileURLToPath(new URL('./cloudbase/course.html', import.meta.url));

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
    {
      name: 'somm100-static-course-home',
      transformIndexHtml(html, context) {
        if (context.filename === courseHome) return renderCourseHome(html, cohort, concepts);
      },
    },
    react(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  define: { 'import.meta.env.VITE_SOMM100_LOCAL_ONLY': 'true' },
  build: {
    rolldownOptions: {input: {
      app: fileURLToPath(new URL('./cloudbase/index.html',import.meta.url)),
      foundation: fileURLToPath(new URL('./cloudbase/foundation.html',import.meta.url)),
      course: courseHome,
    }},
    outDir: fileURLToPath(new URL('./dist-cloudbase', import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
});

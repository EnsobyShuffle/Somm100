import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('./', import.meta.url));
export default defineConfig({
  root,
  base:'./',
  publicDir:false,
  build:{outDir:fileURLToPath(new URL('../../.foundation-ui-dist', import.meta.url)),emptyOutDir:true},
});

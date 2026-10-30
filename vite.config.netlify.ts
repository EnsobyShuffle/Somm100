import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";

/**
 * Netlify build target. Keep vite.config.ts as the original Cloudflare target;
 * this entry point deliberately excludes the Cloudflare Workers plugin.
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "cloudflare:workers",
        replacement: fileURLToPath(
          new URL("./lib/netlify-cloudflare-workers.ts", import.meta.url),
        ),
      },
    ],
  },
  plugins: [vinext(), nitro()],
});

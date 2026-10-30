/**
 * Build-time compatibility shim for Cloudflare-only route handlers.
 * The current SOMM100 UI uses browser-local storage and does not call these
 * D1-backed APIs. Netlify must never silently point them at production D1.
 */
export const env: Record<string, never> = Object.freeze({});

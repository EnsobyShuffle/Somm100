export const FOUNDATION_RECALL_PAGE = 'foundation-recall';

// Both entries must be hosted in the same directory and origin to share local records.
export function foundationFullAppUrl(page, href) {
  const allowed = new Set(['home','courses','foundation','service','practice','account',FOUNDATION_RECALL_PAGE]);
  const url = new URL('./index.html', href);
  url.hash = allowed.has(page) ? page : 'courses';
  return url.href;
}

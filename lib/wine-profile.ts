export type WineLink = { name: string; url: string };
export function wineTextSegments(text: string, links: WineLink[]): { text: string; url?: string }[] {
  const entries = [...new Map(links.filter(l => l.name && l.url).map(l => [l.name, l])).values()].sort((a,b) => b.name.length-a.name.length);
  if (!entries.length) return [{ text }];
  const pattern = new RegExp('(' + entries.map(l => l.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'g');
  return text.split(pattern).filter(Boolean).map(part => ({ text: part, url: entries.find(l => l.name === part)?.url }));
}

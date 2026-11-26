import identifiers from '../data/wine-channel-bilibili-playback.json';

const indexed: Record<string, { aid: number; cid: number } | null> = identifiers;

export function wasUnavailable(bvid: string) {
  return indexed[bvid] === null;
}

export function bilibiliPlayerUrl(bvid: string, originalUrl: string) {
  const requestedPart = Number(new URL(originalUrl).searchParams.get('p'));
  const part = Number.isSafeInteger(requestedPart) && requestedPart > 0 ? requestedPart : 1;
  const params = new URLSearchParams({ bvid, p: String(part), autoplay: 'true', danmaku: 'false', poster: 'true' });
  const record = indexed[bvid];
  if (record) {
    params.set('aid', String(record.aid));
    // Bilibili gives cid precedence over the requested part. Our catalog indexes part one.
    if (part === 1) params.set('cid', String(record.cid));
  }
  return 'https://player.bilibili.com/player.html?' + params;
}

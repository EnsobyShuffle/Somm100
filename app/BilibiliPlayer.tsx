'use client';

import {useState} from 'react';
import {bilibiliPlayerUrl, wasUnavailable} from '../lib/bilibili-playback';

type Props = { bvid: string; video: { title: string; url: string }; close: () => void };

export default function BilibiliPlayer({bvid, video, close}: Props) {
  const [attempt, setAttempt] = useState(0);
  const src = bilibiliPlayerUrl(bvid, video.url);
  const part = new URL(src).searchParams.get('p');
  const appUrl = 'bilibili://video/' + bvid + (part === '1' ? '' : '?page=' + part);
  return <div className="wc-player">
    {attempt === 0 && wasUnavailable(bvid) ?
      <p className="wc-player-notice" role="status">上次核对时，哔哩哔哩已无法提供这条原片。</p> :
      <iframe key={attempt} title={video.title} src={src}
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"/>}
    <div className="wc-player-actions">
      <button type="button" onClick={() => setAttempt(n => n + 1)}>重试站内播放</button>
      <a href={appUrl}>用哔哩哔哩 App 播放</a>
      <a href={video.url} target="_blank" rel="noreferrer">打开原片网页</a>
      <button type="button" onClick={close}>关闭播放</button>
    </div>
  </div>;
}

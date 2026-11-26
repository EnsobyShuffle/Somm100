'use client';

import {useState} from 'react';
import {bilibiliPlayerUrl, wasUnavailable} from '../lib/bilibili-playback';

type Props = { bvid: string; video: { title: string; url: string }; close: () => void };

export default function BilibiliPlayer({bvid, video, close}: Props) {
  const [attempt, setAttempt] = useState(0);
  const [manual, setManual] = useState(false);
  const src = bilibiliPlayerUrl(bvid, video.url, !manual);
  const part = new URL(src).searchParams.get('p');
  const appUrl = 'bilibili://video/' + bvid + (part === '1' ? '' : '?page=' + part);
  return <div className="wc-player">
    <div className="wc-player-viewport">
      {attempt === 0 && wasUnavailable(bvid) ?
        <p className="wc-unavailable" role="status">哔哩哔哩已无法提供这条原片。</p> :
        <iframe key={attempt} title={video.title} src={src}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"/>}
    </div>
    {manual && <p className="wc-player-notice" role="status">请点画面里的播放键开始播放。</p>}
    <div className="wc-player-actions">
      <button type="button" onClick={() => { setManual(!manual); setAttempt(n => n + 1); }}>
        {manual ? '重试自动播放' : '切换为手动播放'}
      </button>
      <button type="button" onClick={close}>关闭播放</button>
      <details className="wc-source-links">
        <summary>原片链接</summary>
        <a href={video.url} target="_blank" rel="noreferrer">打开原片网页</a>
        <a href={appUrl}>用哔哩哔哩 App 播放</a>
      </details>
    </div>
  </div>;
}

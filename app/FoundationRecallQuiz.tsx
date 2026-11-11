'use client';

import React, {useRef, useState} from 'react';
import './foundation-recall-quiz.css';

type RecallQuestion = {
  id: string;
  topic: string;
  prompt: string;
  answer: string;
  sourceUrl?: string;
};

type BookmarkChange = {type: 'bookmark'; questionId: string; active: boolean};

type Props = {
  questions: RecallQuestion[];
  bookmarks: string[];
  loading: boolean;
  save: (change: BookmarkChange) => Promise<unknown>;
};

const topicNames: Record<string, string> = {
  vinification: '葡萄酒酿造',
  viticulture: '葡萄种植',
};

export default function FoundationRecallQuiz({questions, bookmarks, loading, save}: Props) {
  const [showSaved, setShowSaved] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [pending, setPending] = useState<BookmarkChange | null>(null);
  const [saveError, setSaveError] = useState('');
  const saving = useRef(false);
  const savedView = useRef<HTMLButtonElement>(null);

  const savedIds = new Set(bookmarks);
  if (pending?.active) savedIds.add(pending.questionId);
  else if (pending) savedIds.delete(pending.questionId);
  const savedCount = questions.filter(({id}) => savedIds.has(id)).length;
  const groups = new Map<string, RecallQuestion[]>();
  for (const question of questions) {
    const group = groups.get(question.topic);
    if (group) group.push(question);
    else groups.set(question.topic, [question]);
  }
  let number = 0;

  function toggleAnswer(id: string) {
    setExpanded(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function toggleBookmark(id: string) {
    if (saving.current || loading) return;
    const change: BookmarkChange = {type: 'bookmark', questionId: id, active: !savedIds.has(id)};
    saving.current = true;
    if (showSaved && !change.active) savedView.current?.focus();
    setPending(change);
    setSaveError('');
    try {
      if (!await save(change)) setSaveError('收藏更新失败，请重试。');
    } catch {
      setSaveError('收藏更新失败，请重试。');
    } finally {
      setPending(null);
      saving.current = false;
    }
  }

  return (
    <section className="white-panel foundation-recall" aria-labelledby="foundation-recall-title">
      <h1 id="foundation-recall-title">侍酒师100 · 口头自练</h1>
      <div className="foundation-recall-views" role="group" aria-label="题目范围">
        <button type="button" aria-pressed={!showSaved} onClick={() => setShowSaved(false)}>全部题目</button>
        <button type="button" ref={savedView} aria-pressed={showSaved} onClick={() => setShowSaved(true)}>收藏（{savedCount}）</button>
      </div>
      {saveError && <p role="alert">{saveError}</p>}
      {showSaved && !savedCount && <p>当前题集还没有收藏。</p>}
      {Array.from(groups, ([topic, items]) => {
        const rows = items.map(question => ({question, number: ++number}));
        const visible = showSaved ? rows.filter(({question}) => savedIds.has(question.id)) : rows;
        if (!visible.length) return null;
        return (
          <section key={topic} className="foundation-recall-group" aria-label={topicNames[topic] ?? topic}>
            <h2>{topicNames[topic] ?? topic}</h2>
            <ol>
              {visible.map(({question, number: position}) => {
                const {id, prompt, answer, sourceUrl} = question;
                const open = expanded.has(id);
                const saved = savedIds.has(id);
                const answerId = `foundation-recall-answer-${id}`;
                return (
                  <li key={id} value={position} className="foundation-recall-item">
                    <div className="foundation-recall-row">
                      <span className="foundation-recall-number" aria-hidden="true">{String(position).padStart(2, '0')}</span>
                      <button type="button" className="foundation-recall-question" aria-expanded={open}
                        aria-controls={answerId} onClick={() => toggleAnswer(id)}>{prompt}</button>
                      <button type="button" className="foundation-recall-star"
                        aria-label={saved ? `取消收藏第 ${position} 题` : `收藏第 ${position} 题`}
                        aria-pressed={saved} disabled={loading || pending !== null}
                        onClick={() => void toggleBookmark(id)}>{saved ? '★' : '☆'}</button>
                    </div>
                    <div id={answerId} className="foundation-recall-answer" hidden={!open}>
                      <p>{answer}</p>
                      {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer">来源</a>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </section>
  );
}

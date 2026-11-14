'use client';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import React, {useEffect, useRef, useState} from 'react';
import data from '../data/foundation-study.json';
import concepts from '../data/foundation-concepts.json';
import FoundationPrepByCity from './FoundationPrepByCity';
import FoundationConcepts from './FoundationConcepts';
import {openReviewRecap} from './FoundationReviewRecap';
import {FOUNDATION_STORAGE_KEY, emptyFoundationProgress, normalizeFoundationProgress, recordFoundationAnswer, foundationWeekResult, foundationOptions} from '../lib/foundation-study.mjs';
import './foundation-study.css';

const h = React.createElement;
const conceptTitles = Object.fromEntries(concepts.map(({id, title}) => [id, title]));
export default function FoundationStudy({cityName, onCityChange, precourse=false}) {
  const [progress, setProgress] = useState(emptyFoundationProgress);
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [canSave, setCanSave] = useState(false);
  const pendingQuestionFocus = useRef(null);
  const [reviewOrigin, setReviewOrigin] = useState(null);
  const [practiceOrigin, setPracticeOrigin] = useState(null);
  const [readingOrigin, setReadingOrigin] = useState(null);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FOUNDATION_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && parsed.version !== 1) throw new Error('unsupported stored version');
      setProgress(normalizeFoundationProgress(parsed, data));
      setCanSave(true);
    } catch {
      // Preserve unreadable/unsupported records instead of overwriting them.
      setSaveError('已有本机记录无法读取。本次可继续练习，但不会覆盖旧记录或保存新进度。');
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try {
      window.localStorage.setItem(FOUNDATION_STORAGE_KEY, JSON.stringify(progress));
      setSaveError('');
    } catch {
      setSaveError('本机保存失败，请勿关闭页面。当前作答仍保留在本次页面中。');
    }
  }, [progress, loaded, canSave]);

  useEffect(() => {
    if (pendingQuestionFocus.current) {
      const {groupId, questionId} = pendingQuestionFocus.current;
      openReviewRecap(groupId, questionId);
      pendingQuestionFocus.current = null;
    }
  }, [progress.period]);

  function showWeekQuestions(weekNumber, questionId) {
    const week = data.weeks.find(item => item.number === weekNumber);
    const period = progress.pace === 4 ? Math.ceil(weekNumber / 2) : weekNumber;
    const groupId = `${week.id}-questions`;
    if (period === progress.period) {
      openReviewRecap(groupId, questionId);
      return;
    }
    pendingQuestionFocus.current = {groupId, questionId};
    setProgress(p => ({...p, period}));
  }

  const firstWeek = progress.pace === 4 ? progress.period * 2 - 1 : progress.period;
  const visibleWeeks = data.weeks.filter(w => w.number === firstWeek || (progress.pace === 4 && w.number === firstWeek + 1));
  const practiceReturn = reviewOrigin?.caseId
    ? {caseId: reviewOrigin.caseId, onReturn: returnToQuestion, label: '回到刚才的准备度题'}
    : visibleWeeks.some(week => week.number === practiceOrigin?.week)
      ? {caseId: practiceOrigin.caseId, onReturn: () => focusFoundationTarget(`foundation-week-practice-${practiceOrigin.caseId}`)}
      : undefined;
  const readingReturn = visibleWeeks.some(week => week.id === readingOrigin?.weekId)
    ? {conceptId: readingOrigin.conceptId, onReturn: () => focusFoundationTarget(readingOrigin.buttonId)}
    : undefined;
  const reviewQuestions = data.questions.filter(q => progress.answers[q.id] && progress.answers[q.id].latest !== q.answer);
  function reviewQuestion(question, targetId) {
    setReviewOrigin({targetId, questionId: question.id, week: question.week});
    focusFoundationTarget(targetId);
  }

  function reviewPractice(question) {
    setPracticeOrigin(null);
    setReviewOrigin({caseId: question.reviewPracticeId, questionId: question.id, week: question.week});
    openReviewRecap(question.reviewPracticeId);
  }

  function returnToQuestion() {
    showWeekQuestions(reviewOrigin.week, reviewOrigin.questionId);
  }

  const study = h('section', {className: 'white-panel foundation-study', 'aria-labelledby': 'foundation-weekly-study-title'},
    h('h2', {id: 'foundation-weekly-study-title'}, '本周要完成什么'),
    h('p', null, '同一套内容，两种节奏。推荐提前 8 周开始，每周 2–3 次、每次 30–45 分钟；4 周版每周约 3–4 次，合并相邻两周。可自行选择当前周，不代表已安排开课日期。'),
    h('div', {hidden: precourse}, h(FoundationPrepByCity, {cityName, onCityChange})),
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '预习节奏', h('select', {value: progress.pace, disabled: !loaded, onChange: e => {
        const pace = Number(e.target.value);
        setProgress(p => ({...p, pace, period: pace === 4 ? Math.ceil(firstWeek / 2) : firstWeek}));
      }}, h('option', {value: 8}, '8 周 · 推荐'), h('option', {value: 4}, '4 周 · 压缩'))),
      h('label', null, '当前周', h('select', {value: progress.period, disabled: !loaded, onChange: e => setProgress(p => ({...p, period: Number(e.target.value)}))},
        Array.from({length: progress.pace}, (_, i) => h('option', {value: i + 1, key: i}, `第 ${i + 1} 周`))))),
    h('p', {className: 'fine-print'}, '自查不计分；准备度题用于发现需要复习的概念，不设淘汰线。进度及首次／最近答案仅保存在当前浏览器，不会同步到账号或讲师端。'),
    saveError ? h('p', {role: 'alert'}, saveError) : null,
    h('details', {id: 'foundation-readiness-overview', className: 'foundation-review-recap'},
      h('summary', {id: 'foundation-readiness-overview-title'}, '开课前准备度总览'),
      h('p', null, `查看八组共 ${data.questions.length} 道题。建议先回看答错的概念，再补未答题。状态按最近一次作答更新，不影响报名。`),
      h('details', {id: 'foundation-readiness-review'},
        h('summary', null, `待复习题${loaded ? ` · ${reviewQuestions.length} 道` : ''}`),
        loaded && reviewQuestions.length > 0
          ? h('ul', null, reviewQuestions.map(q => h('li', {key: q.id},
            h('button', {type: 'button', className: 'button secondary',
              onClick: () => showWeekQuestions(q.week, q.id)}, `第 ${q.week} 组｜${q.topic}：${q.prompt}`))))
          : h('p', null, loaded ? '最近作答有误的题会列在这里。未答题可从下方题组进入。' : '正在读取本机记录')),
      h('ol', null, data.weeks.map(week => {
        const {total, answered, review, ready} = foundationWeekResult(week, data, progress);
        const unanswered = total - answered;
        const status = ready ? '本组已准备好' : [
          unanswered > 0 && `${unanswered} 题未答`,
          review > 0 && `${review} 题建议再看`,
        ].filter(Boolean).join('，');
        return h('li', {key: week.id},
          h('strong', null, week.title),
          h('p', null, loaded ? status : '正在读取本机记录'),
          h('button', {type: 'button', className: 'button secondary', disabled: !loaded,
            onClick: () => showWeekQuestions(week.number)}, `练习第 ${week.number} 组`));
      }))),
    visibleWeeks.map(week => {
      const result = foundationWeekResult(week, data, progress);
      const questions = data.questions.filter(q => q.week === week.number);
      return h('article', {key: week.id, id: week.id, className: 'foundation-week'},
        h('h3', null, `${progress.pace === 4 ? '学习单元' : '第'} ${week.number}${progress.pace === 4 ? '' : ' 周'}｜${week.title}`),
        h('p', null, week.goal),
        h('h4', {id: `${week.id}-digest`}, '先理解'),
        h('p', null, week.digest),
        reviewOrigin?.targetId === `${week.id}-digest`
          ? h('button', {type: 'button', className: 'button secondary', onClick: returnToQuestion}, '回到刚才的准备度题')
          : null,
        h('div', {className: 'button-row'}, week.concepts.map(id => {
          const buttonId = `${week.id}-read-${id}`;
          return h('button', {type: 'button', className: 'button secondary', id: buttonId, key: id, tabIndex: 0,
            onClick: () => {
              setReadingOrigin({weekId: week.id, conceptId: id, buttonId});
              focusFoundationTarget(id);
            }}, `阅读｜${conceptTitles[id]}`);
        })),
        week.practices?.length > 0 && h('div', {className: 'button-row foundation-week-practice'},
          week.practices.map(({id, title}) => h('button', {
            key: id, id: `foundation-week-practice-${id}`, type: 'button', tabIndex: 0,
            className: 'button secondary', 'aria-controls': id,
            onClick: () => {
              if (reviewOrigin?.caseId) setReviewOrigin(null);
              setPracticeOrigin({week: week.number, caseId: id});
              openReviewRecap(id);
            },
          }, `案例｜${title}`))),
        h('fieldset', null, h('legend', null, '知识点自查 · 理解后再勾选'),
          week.checks.map(check => h('label', {className: 'foundation-check', key: check.id},
            h('input', {type: 'checkbox', disabled: !loaded, checked: progress.checks[check.id] === true, onChange: e => {
              const checked = e.target.checked;
              setProgress(p => ({...p, checks: {...p.checks, [check.id]: checked}}));
            }}), h('span', null, check.text)))),
        h('details', {id: `${week.id}-questions`},
          h('summary', {id: `${week.id}-questions-title`}, `准备度选择题 · ${questions.length} 题`),
          h('p', {role: 'status'}, result.ready ? '本组概念检查：已准备好。你仍可返回阅读和自查。' : result.answered < result.total ? `已作答 ${result.answered} / ${result.total}，完成后查看本组准备度。` : '建议再看一遍本周内容，然后重新选择。'),
          week.number === 8 ? h('p', null, '这部分只是第一次预览；没记住也没关系，课间复习和正式课程还会再次学习。') : null,
          questions.map(q => {
            const entry = progress.answers[q.id];
            const correct = entry?.latest === q.answer;
            return h('fieldset', {className: 'foundation-question', id: q.id, key: q.id},
              h('legend', null, q.prompt),
              foundationOptions(q).map((index, position) => h('label', {className: 'foundation-check', key: index},
                h('input', {type: 'radio', disabled: !loaded, name: q.id, value: index, checked: entry?.latest === index,
                  onChange: () => setProgress(p => recordFoundationAnswer(p, q, index))}),
                h('span', null, `${String.fromCharCode(65 + position)}. ${q.options[index]}`))),
              entry ? h('div', {'aria-live': 'polite'},
                h('p', null, correct ? `理解正确：${q.topic}。` : `再看一下「${q.topic}」。正确理解是：${q.options[q.answer]}。`),
                !correct ? h('div', {className: 'button-row'},
                  q.reviewConceptId ? h('button', {type: 'button', className: 'button secondary',
                    onClick: () => reviewQuestion(q, q.reviewConceptId)}, `回看概念｜${conceptTitles[q.reviewConceptId]}`) : null,
                  q.reviewPracticeId ? h('button', {type: 'button', className: 'button secondary',
                    onClick: () => reviewPractice(q)}, '做一道相关案例') : null,
                  h('button', {type: 'button', className: 'button secondary',
                    onClick: () => reviewQuestion(q, `${week.id}-digest`)}, '返回本周知识提要')) : null,
                h('p', {className: 'fine-print'}, `首次选择：${q.options[entry.first]}；最近选择：${q.options[entry.latest]}`)) : null);
          }),
          h('button', {type: 'button', className: 'button secondary',
            onClick: () => openReviewRecap('foundation-readiness-overview')}, '回到准备度总览')));
    }));

  return h(React.Fragment, null, study, h(FoundationConcepts, {
    practiceReturn,
    readingReturn,
    reviewReturn: reviewOrigin
      ? {conceptId: reviewOrigin.targetId, onReturn: returnToQuestion}
      : undefined,
  }));
}

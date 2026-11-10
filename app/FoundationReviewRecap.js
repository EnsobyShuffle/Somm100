import React from 'react';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';

const h = React.createElement;

export function openReviewRecap(id, focusId = id + '-title') {
  const details = document.getElementById(id);
  if (!details) return;
  details.open = true;
  focusFoundationTarget(focusId);
}

export default function FoundationReviewRecap({id, title, intro, cases, onReview, disabled}) {
  return h('details', {id, className: 'foundation-review-recap'},
    h('summary', {id: id + '-title'}, `${title} · ${cases.length} 个案例`),
    h('p', null, intro),
    h('p', {className: 'fine-print'}, '先在自己的笔记中作答。展开参考答案不计分。'),
    h('ol', null, cases.map(({title, prompt, answer, reviews}) =>
      h('li', {key: title},
        h('h3', null, title),
        h('p', null, prompt),
        h('details', null, h('summary', null, '展开参考答案'), h('p', null, answer)),
        h('div', {className: 'button-row'}, reviews.map(([number, label]) =>
          h('button', {
            key: number, type: 'button', className: 'button secondary', disabled,
            onClick: () => onReview(number),
          }, `回看第 ${number} 节 · ${label}`)))))));
}

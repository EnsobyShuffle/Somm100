'use client';
import React from 'react';
import data from '../data/foundation-d2.json';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD2Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d2',
    title: 'D2｜葡萄品种复习',
    intro: '本区先开放葡萄品种的 9 个复习单元，供课堂后重建知识、检查理解。法国专题请见下方独立复习区；这些内容仍不代表完整 D2 课程或当期课表。',
    storageKey: 'somm100.foundation.d2-review.v1',
  });
}

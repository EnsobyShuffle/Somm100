'use client';
import React from 'react';
import data from '../data/foundation-d4.json';
import cases from './FoundationD4Recap.js';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD4Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d4',
    title: 'D4｜起泡、加强酒与世界产区',
    intro: '从气泡与加强工艺出发，继续认识北美、澳新、南美、南非和中国的代表产区与品种。先读学习目标，完成准备活动，再用自查与选择题复习。课堂顺序以本期安排为准。',
    storageKey: 'somm100.foundation.d4-review.v1',
    recap: {
      title: 'D4 综合复盘',
      intro: '每题先写下酒标或资料能确认的信息，再写工艺或产区判断。用原复习单元的技术表核对。',
      cases,
    },
  });
}

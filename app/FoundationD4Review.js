'use client';
import React from 'react';
import data from '../data/foundation-d4.json';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD4Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d4',
    title: 'D4｜起泡、加强酒与世界产区',
    intro: '从气泡与加强工艺出发，继续认识北美、澳新和南美的代表产区与品种。先读学习目标，完成准备活动，再用自查与选择题复习。课堂顺序以本期安排为准。',
    storageKey: 'somm100.foundation.d4-review.v1',
  });
}

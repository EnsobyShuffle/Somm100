'use client';
import React from 'react';
import data from '../data/foundation-d4.json';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD4Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d4',
    title: 'D4｜起泡酒与加强酒复习',
    intro: '从气泡来源到加强时机，用八节内容认识经典起泡酒、Port、Sherry 与 Madeira。先读学习目标，完成准备活动，再用自查与选择题复习。课堂顺序以本期安排为准。',
    storageKey: 'somm100.foundation.d4-review.v1',
  });
}

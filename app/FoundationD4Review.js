'use client';
import React from 'react';
import data from '../data/foundation-d4.json';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD4Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d4',
    title: 'D4｜起泡酒复习',
    intro: '从气泡来源到瓶中与罐中发酵，用四节内容认识香槟和其他经典起泡酒。先读学习目标，完成准备活动，再用自查与选择题复习。课堂顺序以本期安排为准。',
    storageKey: 'somm100.foundation.d4-review.v1',
  });
}

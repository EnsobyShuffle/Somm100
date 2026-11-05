'use client';
import React from 'react';
import data from '../data/foundation-d3.json';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD3Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d3',
    title: 'D3｜欧洲产区复习',
    intro: '从读酒标的方法开始，复习意大利的皮埃蒙特、威尼托和托斯卡纳。以下五节可独立练习，课堂先后顺序以本期授课安排为准。',
    storageKey: 'somm100.foundation.d3-review.v1',
  });
}

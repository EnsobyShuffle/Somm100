'use client';
import React from 'react';
import data from '../data/foundation-d3.json';
import FoundationRegionalReview from './FoundationRegionalReview.js';

export default function FoundationD3Review() {
  return React.createElement(FoundationRegionalReview, {
    data,
    prefix: 'foundation-d3',
    title: 'D3｜欧洲产区复习',
    intro: '从意大利、西班牙和葡萄牙出发，继续读德国酒标，再认识奥地利、希腊和匈牙利。每一节都把地名、葡萄品种或工艺放回具体酒款。可按主题选学，课堂顺序以本期安排为准。',
    storageKey: 'somm100.foundation.d3-review.v1',
  });
}

import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import FoundationStudy from '../../app/FoundationStudy.js';
import FoundationD1Review from '../../app/FoundationD1Review.js';
import FoundationD2Review from '../../app/FoundationD2Review.js';
import FoundationFranceReview from '../../app/FoundationFranceReview.js';
import FoundationCohort from '../../app/FoundationCohort.js';
import FoundationBridge from '../../app/FoundationBridge.js';
import './preview.css';
const h = React.createElement;
function FoundationPreview() {
  const [cityName, onCityChange] = useState('');
  return h('main', null, h('h1', null, 'Foundation 组件验证'),
    h('p', null, '开发验证入口：使用真实 React 组件及本机记录。不是完整应用或线上验收；仅在独立测试地址使用。'),
    h(FoundationStudy, {cityName, onCityChange}),
    h(FoundationD1Review), h(FoundationD2Review), h(FoundationFranceReview),
    h(FoundationCohort, {onReviewCity: onCityChange}),
    h(FoundationBridge, {cityName, onCityChange}));
}
createRoot(document.getElementById('root')).render(h(React.StrictMode, null, h(FoundationPreview)));

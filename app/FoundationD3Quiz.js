'use client';
import React from 'react';
import FoundationQuiz from './FoundationQuiz';
import data from '../data/foundation-d3-quiz.json';
import reviews from '../data/foundation-d3.json';
import {D3_QUIZ_STORAGE_KEY} from '../lib/foundation-quiz.mjs';
export default function FoundationD3Quiz() {
  return React.createElement(FoundationQuiz, {data, reviews, storageKey:D3_QUIZ_STORAGE_KEY, prefix:'foundation-d3'});
}

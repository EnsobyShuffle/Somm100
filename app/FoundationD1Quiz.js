'use client';
import React from 'react';
import FoundationQuiz from './FoundationQuiz';
import data from '../data/foundation-d1-quiz.json';
import reviews from '../data/foundation-d1.json';
import {D1_QUIZ_STORAGE_KEY} from '../lib/foundation-quiz.mjs';
export default function FoundationD1Quiz() {
  return React.createElement(FoundationQuiz, {data, reviews, storageKey:D1_QUIZ_STORAGE_KEY, prefix:'foundation-d1'});
}

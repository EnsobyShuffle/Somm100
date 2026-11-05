'use client';
import React from 'react';
import FoundationQuiz from './FoundationQuiz';
import data from '../data/foundation-d4-quiz.json';
import reviews from '../data/foundation-d4.json';
import {D4_QUIZ_STORAGE_KEY} from '../lib/foundation-quiz.mjs';
export default function FoundationD4Quiz() {
  return React.createElement(FoundationQuiz, {data, reviews, storageKey:D4_QUIZ_STORAGE_KEY, prefix:'foundation-d4'});
}

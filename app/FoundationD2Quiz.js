'use client';
import React from 'react';
import FoundationQuiz from './FoundationQuiz';
import data from '../data/foundation-d2-quiz.json';
import grapes from '../data/foundation-d2.json';
import france from '../data/foundation-france.json';
import {D2_QUIZ_STORAGE_KEY} from '../lib/foundation-quiz.mjs';
const reviews={units:[...grapes.units.map(u=>({...u,reviewPrefix:'foundation-d2'})),...france.units.map(u=>({...u,reviewPrefix:'foundation-france'}))]};
export default function FoundationD2Quiz() {
  return React.createElement(FoundationQuiz,{data,reviews,storageKey:D2_QUIZ_STORAGE_KEY,prefix:'foundation-d2'});
}

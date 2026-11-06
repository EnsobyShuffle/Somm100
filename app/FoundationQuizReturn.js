'use client';
import React,{useEffect,useState} from 'react';
import {quizReturnTarget} from '../lib/foundation-quiz.mjs';
export default function FoundationQuizReturn({prefix}) {
  const [target,setTarget]=useState(null);
  useEffect(()=>{
    function opened(event){
      if(event.detail?.prefix===prefix)setTarget(quizReturnTarget(event.detail.returnTo));
    }
    window.addEventListener('foundation-open-review',opened);
    return ()=>window.removeEventListener('foundation-open-review',opened);
  },[prefix]);
  if(!target)return null;
  return React.createElement('button',{type:'button',className:'button secondary',onClick:()=>{
    window.dispatchEvent(new CustomEvent('foundation-return-quiz',{detail:target}));
    setTarget(null);
  }},`返回 ${target.prefix.slice(-2).toUpperCase()} 自测第 ${target.number} 题`);
}

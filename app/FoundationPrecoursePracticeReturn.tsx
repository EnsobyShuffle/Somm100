import React from 'react';

export type PracticeReturn = {caseId: string; onReturn: () => void};

export default function FoundationPrecoursePracticeReturn({caseId, practiceReturn}: {
  caseId: string;
  practiceReturn?: PracticeReturn;
}) {
  if (practiceReturn?.caseId !== caseId) return null;
  return <button type="button" className="button secondary" onClick={practiceReturn.onReturn}>
    返回本周练习入口
  </button>;
}

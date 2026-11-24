// Called only after a learner requests navigation; never focuses during initial load.
export function focusFoundationTarget(id,doc=globalThis.document,view=globalThis.window){
  const target=doc?.getElementById(id);
  if(!target)return false;
  // Related exercises can belong to another course section.
  if (target.closest?.('[data-foundation-stage][hidden]')) {
    view.dispatchEvent(new view.CustomEvent('foundation-navigate', {detail:id}));
    return true;
  }
  // Headings/articles need programmatic focus but must not join the Tab sequence.
  if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
  target.focus({preventScroll:true});
  const reduced=view?.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;
  // 'auto' inherits CSS scroll-behavior:smooth; instant overrides it.
  target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
  return true;
}

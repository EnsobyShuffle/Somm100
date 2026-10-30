export function quizPool(questions:any[],state:any,f:any){
 const dismissed=new Set(state.dismissed||[]),bookmarks=new Set(state.bookmarks||[]),reviews=new Map((state.reviews||[]).map((r:any)=>[r.question_id,r])),now=new Date().toISOString();
 return questions.filter(q=>{
 const excluded=dismissed.has(q.id),review:any=reviews.get(q.id),country=q.country==='通用'?'general':q.country||((q.moduleId==='module02'||q.topic==='alsace')?'France':'general');
 const trackMatch=f.track==='SOMM100'?q.track==='SOMM100':f.track==='CMS'?(q.track||'CMS')==='CMS':true;
 const sourceMatch=!f.source||f.source==='all'||(f.source==='quizlet'?q.sourceBatch==='quizlet-20261028':f.source==='course'?!q.sourceBatch:q.sourceRefs?.some((s:any)=>s.setId===f.source));
 const qualityMatch=!f.quality||f.quality==='all'||(f.quality==='needs-review'?q.canSelfAssess===false:q.canSelfAssess!==false);
 const keyword=String(f.keyword||'').trim().toLocaleLowerCase();
 return sourceMatch&&qualityMatch&&(!keyword||`${q.prompt}\n${q.answer}`.toLocaleLowerCase().includes(keyword))&&trackMatch&&(f.filter==='dismissed'?excluded:!excluded)&&(f.track==='SOMM100'||f.level==='all'||(f.level==='IC'?['Intro','CS'].includes(q.difficulty):q.difficulty===f.level))&&(f.type==='all'||q.type===f.type)&&(f.track==='SOMM100'||f.level!=='MS'||q.type==='short')&&(f.topic==='all'||q.topic===f.topic)&&(f.country==='all'||country===f.country)&&(f.region==='all'||q.region===f.region||(f.region==='Alsace'&&(q.moduleId==='module02'||q.topic==='alsace')))&&(f.filter==='all'||f.filter==='dismissed'||(f.filter==='saved'&&bookmarks.has(q.id))||(f.filter==='wrong'&&review&&!review.last_score)||(f.filter==='due'&&review&&review.due_at<=now));
})}

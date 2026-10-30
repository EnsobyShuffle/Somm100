"""Import retrieved formal Notion learning pages without modifying their originals.

Usage: python scripts/import-cms-learning.py /absolute/retrieved-source-directory
The input contains m1/m2 guide, core, expansion, checklist, questions JSON,
calendar.json and media.json. It is a private retrieval working directory.
"""
import json,re,sys,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
src=Path(sys.argv[1])
def load(name): return json.loads((src/(name+'.json')).read_text())
def body(name): return load(name)['text'].split('<content>',1)[1].rsplit('</content>',1)[0].strip()
def plain(s): return re.sub(r'<[^>]+>','',s).replace('\\[','[').replace('\\]',']').strip()
media={x['reference']:x for x in load('media') if x['status']=='downloaded'}
known={load(k)['url'].split('?')[0]:load(k)['title'] for k in ['m1guide','m1core','m1expansion','m1checklist','m1questions','m2guide','m2core','m2expansion','m2checklist','m2questions']}
def rich(s,source):
 s=s.replace('\\[','[').replace('\\]',']')
 s=re.sub(r'<mention url="([^"]+)"\s*/>',lambda m:'['+known.get(m[1].split('?')[0],'原始学习资料')+']('+m[1]+')',s)
 s=re.sub(r'<mention url="([^"]+)"[^>]*>(.*?)</mention>',lambda m:'['+plain(m[2])+']('+m[1]+')',s,flags=re.S)
 s=s.replace('<b>','**').replace('</b>','**').replace('<i>','*').replace('</i>','*')
 s=re.sub(r'<(?:p|li)[^>]*>','\n\n',s);s=re.sub(r'</(?:p|li|ol|ul)>','\n\n',s)
 tokens={}
 def token(data):
  key='@@BLOCK'+str(len(tokens))+'@@';tokens[key]=data;return '\n\n'+key+'\n\n'
 def image(m):
  ref=m[1];cap=plain(m[2]);asset=media.get(ref)
  return token({'type':'image','src':asset['file'] if asset else '', 'caption':cap,'sourceUrl':source,'reference':ref})
 s=re.sub(r'<image[^>]*source="([^"]+)"[^>]*>(.*?)</image>',image,s,flags=re.S)
 def md_image(m):
  # Use matching recovered images where the source itself has the same subject.
  caption,url=m[1],m[2]
  mapping={'soil':'V11_soil','graft':'V13_grafting','Budbreak':'V03_budburst','raison':'V05_veraison','membrane':'V18_press','Red_wine_cap':'V21_cap','Oak':'V22_oak'}
  candidate=next((v for k,n in mapping.items() if k.lower() in url.lower() for ref,v in media.items() if n in ref),None)
  return token({'type':'image','src':candidate['file'] if candidate else url,'caption':caption,'sourceUrl':source,'reference':url})
 s=re.sub(r'!\[([^\]]*)\]\(([^)]+)\)',md_image,s)
 def table(m):
  rows=[[plain(cell) for cell in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',row,re.S)] for row in re.findall(r'<tr[^>]*>(.*?)</tr>',m[0],re.S)]
  return token({'type':'table','rows':rows})
 s=re.sub(r'<table[^>]*>.*?</table>',table,s,flags=re.S)
 s=re.sub(r'<callout[^>]*>(.*?)</callout>',lambda m:token({'type':'note','text':re.sub(r'<[^>]+>','',m[1]).strip()}),s,flags=re.S)
 s=re.sub(r'<[^>]+>','',s)
 blocks=[]
 for para in re.split(r'\n\s*\n',s):
  para=para.strip()
  if not para or para=='---':continue
  if para in tokens:blocks.append(tokens[para]);continue
  if re.match(r'^#{1,6} ',para): blocks.append({'type':'heading','text':re.sub(r'^#+\s*','',para)})
  elif re.match(r'^(?:[-*] |\d+\. )',para): blocks.append({'type':'list','items':[re.sub(r'^(?:[-*] |\d+\. )(?:\[[ x]\] )?','',x) for x in para.splitlines() if x.strip()]})
  else:blocks.append({'type':'paragraph','text':para})
 return blocks
def sections(name,pattern,prefix):
 text=body(name);matches=list(re.finditer(pattern,text,re.M));url=load(name)['url'];out=[]
 if matches and text[:matches[0].start()].strip():out.append({'id':prefix+'-intro','title':'Reading guide｜阅读说明','blocks':rich(text[:matches[0].start()],url)})
 for i,m in enumerate(matches):out.append({'id':prefix+str(i+1).zfill(2),'title':plain(m[1]),'blocks':rich(text[m.end():matches[i+1].start() if i+1<len(matches) else len(text)],url)})
 return out
curr=json.loads((root/'data/curriculum.json').read_text())
# Idempotent, preserves all pre-existing Module 01 IDs and local learning records.
curr['lessons']=[l for l in curr['lessons'] if not l['id'].startswith('M2-')]
curr['questions']=[q for q in curr['questions'] if not q['id'].startswith('M2-')]
curr['checklist']=[k for k in curr['checklist'] if not k['id'].startswith('M2-')]
for l in curr['lessons']:l['moduleId']='module01'
for k in curr['checklist']:k['moduleId']='module01'
for q in curr['questions']:q['moduleId']='module02' if str(q.get('module','')).lower().replace(' ','')=='module02' else 'module01'
for q in curr['questions']:
 if q['moduleId']=='module02' and not q.get('lessonId'):
  q['lessonId']='M2-KB'+{'ADV09':'01','ADV10':'05','ADV11':'06','ADV12':'03','ADV13':'08','ADV15':'08','ADV16':'08'}.get(q['id'],'09')
# Refresh the 64 original questions and 28 checks from the active formal pages.
for b in re.findall(r'<toggle>(.*?)</toggle>',body('m1questions'),re.S):
 prompt,answer=re.split(r'<b>Answer(?:｜答案)?[：:]</b>',b,maxsplit=1);qid=re.search(r'Q\d+',prompt)[0]
 q=next(q for q in curr['questions'] if q['id']==qid)
 q['prompt']=re.sub(r'^Q\d+\s*\[[^\]]+\]\s*','',plain(prompt));q['answer']=plain(answer)
 q['knowledgePoints']=re.findall(r'KP\d+',prompt)
for b in re.findall(r'<todo[^>]*>(.*?)</todo>',body('m1checklist'),re.S):
 kid=re.search(r'KP\d+',b)[0];k=next(k for k in curr['checklist'] if k['id']==kid);k['body']=plain(b)
checkblocks=re.findall(r'<todo[^>]*>(.*?)</todo>',body('m2checklist'),re.S)
for b in checkblocks:
 ident=re.search(r'KP\d+',b)[0];kb=re.search(r'KB\d+',b)[0]
 curr['checklist'].append({'id':'M2-'+ident,'displayId':ident,'body':plain(b),'sourceUrl':load('m2checklist')['url'],'moduleId':'module02','lessonId':'M2-'+kb})
qblocks=re.findall(r'<toggle>(.*?)</toggle>',body('m2questions'),re.S)
for b in qblocks:
 prompt,answer=re.split(r'<b>Answer(?:｜答案)?[：:]</b>',b,maxsplit=1);qid=re.search(r'Q\d+',prompt)[0];kp=re.search(r'KP\d+',prompt)
 checklist=next((k for k in curr['checklist'] if k['id']=='M2-'+(kp[0] if kp else 'KP28')),None)
 curr['questions'].append({'id':'M2-'+qid,'displayId':qid,'prompt':re.sub(r'^Q\d+\s*\[[^\]]+\]\s*','',plain(prompt)),'answer':plain(answer),'sourceUrl':load('m2questions')['url'],'origin':'SOMM100 self-authored practice; not official CMS exam','reviewStatus':'teacher-review-pending','type':'short','stage':'Certified','country':'France','region':'Alsace','module':'Module 02','moduleId':'module02','lessonId':checklist['lessonId'] if checklist else 'M2-KB09','difficulty':'CS','topic':'alsace','knowledgePoints':['M2-'+x for x in re.findall(r'KP\d+',prompt)]})
mods=[]
for n,title,zh,pages,period in [(1,'Viticulture & Vinification','葡萄种植与酿造','Ch. 2 · pp. 27–48','2026.11.01–11.05'),(2,'Alsace','阿尔萨斯','Ch. 5 · pp. 80–84','2026.11.09–11.11')]:
 p='m'+str(n);mid='module0'+str(n);pre='M'+str(n)
 core=sections(p+'core',r'^# (.+)$' if n==1 else r'^## (.+)$',pre+'-READ')
 exp=sections(p+'expansion',r'^## (.+)$',pre+'-EXP')
 for s in core:
  s['track']=bool(re.match(r'^\d+\s*[·｜]',s['title']))
  if s['track']:s['questionIds']=[q['id'] for q in curr['questions'] if q['moduleId']==mid][:2]
 for s in exp:
  match=re.match(r'KB(\d+)',s['title']);s['track']=bool(match)
  if match:
   s['lessonId']=('' if n==1 else 'M2-')+'KB'+match[1]
   s['questionIds']=[q['id'] for q in curr['questions'] if q.get('lessonId')==s['lessonId'] and q['type']=='short']
   if n==2:
    curr['lessons'].append({'id':s['lessonId'],'moduleId':mid,'title':s['title'].split('｜')[-1].split('[')[0].strip(),'en':s['title'].split('｜')[1],'body': '\n\n'.join(b.get('text','') or '\n'.join(b.get('items',[])) or '\n'.join(' | '.join(row) for row in b.get('rows',[])) for b in s['blocks']),'minutes':8,'category':'Alsace','sourceUrl':load('m2expansion')['url'],'reviewStatus':'teacher-review-pending','knowledgePoints':[k['id'] for k in curr['checklist'] if k.get('lessonId')==s['lessonId']],'related':s['questionIds']})
 # Match core sections to the existing KB IDs, preserving original textbook sequence.
 m1map=[1,6,1,2,3,5,5,6,7,8,9,9,4,2,10,10]
 m2map={'01':1,'03':2,'04':3,'05':4,'06':6,'07':5,'08':7,'09':4,'10':6,'11':3,'12':3,'13':3,'14':3,'15':3,'17':3,'18':3,'19':3,'20':3,'21':6,'22':6}
 for s in core:
  if not s['track']:continue
  number=int(re.match(r'\d+',s['title'])[0]);kb=m1map[number-1] if n==1 else m2map.get(str(number).zfill(2),1)
  lid=('' if n==1 else 'M2-')+'KB'+str(kb).zfill(2)
  s['lessonId']=lid;s['questionIds']=[q['id'] for q in curr['questions'] if q['lessonId']==lid and q['type']=='short' and q['difficulty']=='CS'][:2]
 resources={part:{'title':load(p+part)['title'],'url':load(p+part)['url'],'lastEdited':load(p+part).get('page_last_edited_at'),'sha256':hashlib.sha256(body(p+part).encode()).hexdigest()} for part in ['guide','core','expansion','checklist','questions']}
 for part,tag in [('checklist','todo'),('questions','toggle')]:
  resources[part]['notes']=rich(re.sub(r'<'+tag+r'[^>]*>.*?</'+tag+'>','',body(p+part),flags=re.S),load(p+part)['url'])
 resources['guide']['sections']=sections(p+'guide',r'^## (.+)$',pre+'-GUIDE')
 resources['core']['sections']=core;resources['expansion']['sections']=exp
 mods.append({'id':mid,'number':str(n).zfill(2),'title':title,'zh':zh,'pages':pages,'plannedDates':period,'sourceUrl':('https://app.notion.com/p/3f817d16de4c812b827edbfee9600691' if n==1 else 'https://app.notion.com/p/3fe17d16de4c818e9ffdc3c92823a19b'),'resources':resources,'lessonIds':[l['id'] for l in curr['lessons'] if l.get('moduleId')==mid],'questionIds':[q['id'] for q in curr['questions'] if q.get('moduleId')==mid],'checklistIds':[k['id'] for k in curr['checklist'] if k.get('moduleId')==mid]})
curr['readings']=[{'id':s['id'],'moduleId':m['id'],'title':s['title']} for m in mods for s in m['resources']['core']['sections'] if s['track']]
out={'version':1,'importedAt':'2026-10-25','reviewStatus':'student-draft-teacher-review-pending','modules':mods,'plan':{'title':load('calendar')['title'],'sourceUrl':load('calendar')['url'],'sections':sections('calendar',r'^# (.+)$','PLAN')},'gaps':['Current Youdao originals and WPS originals have not been re-read. Active Notion student pages were imported.','Academic review and OCR/translation checks remain pending. Alsace source numbering skips 02 and 16; no missing prose was fabricated.','The existing study calendar is Draft 5, not a confirmed timetable or exam date.']}
(root/'data/cms-learning.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
(root/'data/curriculum.json').write_text(json.dumps(curr,ensure_ascii=False,indent=2)+'\n')
(root/'data/cms-media.json').write_text(json.dumps([{'reference':r,'file':v['file'],'bytes':v['bytes'],'rights':'User-supplied teaching material; original credit retained'} for r,v in media.items()],ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'modules':len(mods),'readings':len(curr['readings']),'questions':len(curr['questions']),'checklist':len(curr['checklist']),'images':len(media)}))

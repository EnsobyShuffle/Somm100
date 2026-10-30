"""Deterministic, additive Notion import. Does not touch D1 or other countries."""
import json,re,pathlib,collections
ROOT=pathlib.Path(__file__).resolve().parents[1]
snapshot=json.loads((ROOT/'research/china-yunnan-20261029/notion-snapshot.json').read_text())
audit=json.loads((ROOT/'research/china-yunnan-20261029/relationship-audit.json').read_text())
def clean(s):
    s=re.sub(r'<image\b[^>]*>[\s\S]*?</image>','',s)
    s=re.sub(r'!\[[^\]]*\]\([^\n]*\)','',s)
    s=re.sub(r'<date start="([^"]+)"\s*/>',r'\1',s)
    s=re.sub(r'</?b>','**',s)
    s=re.sub(r'</?callout[^>]*>','',s)
    return s.strip()
def notion_id(url):
    m=re.search(r'([a-f0-9]{32})(?:\?|$)',url);return m[1] if m else None
records=[]
for r in snapshot['records']:
    p=dict(r['properties']);code=p.get('酒庄编号') or p.get('酒款编号') or p.get('年份编号') or p.get('产区编号')
    kind='site' if '-SITE-' in code else r['kind']
    status=p.get({'producer':'实体状态','wine':'酒款状态','vintage':'年份状态'}.get(kind,'法律／认证状态'))
    status={'待核':'当前状态待核','历史／停用':'历史','历史／已撤销':'已撤销认证'}.get(status,status)
    if kind in ['region','site'] and status=='现行': status='现行区域资料'
    if not status or status=='不适用': status='历史' if kind=='vintage' else '来源资料收录' if kind=='wine' else '来源资料收录' if kind=='region' else '村庄／Site' if kind=='site' else '当前状态待核'
    e={**r,'id':code.lower(),'code':code,'kind':kind,'name':p['名称'],'en':p.get('英文名',''),'status':status,'entityType':p.get('实体类型',p.get('条目类型','')),'properties':p,'sections':[],'aliases':[]}
    for o in audit['producerDisplayOverrides']:
        if o['notionId']==r['notionId']: e.update(status=o['displayStatus'],entityType=o['displayEntityType'],statusNote=o['reason'])
    for o in audit['wineDisplayEdits']:
        if o['notionId']==r['notionId']:p[o['field']]=o['displayValue']
    # Numbers/tech from a known vintage must never become a series parameter.
    if kind=='wine':
        p['常用品种／风格']=p.get('常用品种／风格','').replace('轻度橡木风格','风格').replace('陶罐熟化信息按年份','熟化信息按年份')
    content=clean(r['content'])
    pieces=re.split(r'^#{1,3}\s+(.+)$',content,flags=re.M)
    e['lead']=pieces[0].strip()
    for i in range(1,len(pieces),2):
        heading=pieces[i].strip();body=pieces[i+1].strip()
        if body:e['sections'].append({'title':heading,'body':body})
    e['sources']=[{'label':label,'url':url} for label,url in re.findall(r'(?<!!)\[([^\]]+)\]\((https?://[^\s]+)\)',r['content'])]
    if p.get('官方年份资料'):e['sources'].append({'label':'年份资料原文','url':p['官方年份资料']})
    e['sources']=list({s['url']:s for s in e['sources']}.values())
    e['summary']=p.get('收录理由') or p.get('系列说明') or p.get('层级说明') or p.get('葡萄来源说明') or re.sub(r'\*\*','',e['lead'])
    if kind=='producer':e['areas']=['云南']+(['山东'] if '姜瑜' in e['name'] else ['宁夏'] if e['name']=='寸山' else [])
    elif kind in ['wine','vintage']:e['areas']=['云南'] # Discovery scope = Yunnan producer network, NOT a grape-origin assertion.
    else:
        n=p.get('行政范围','')+' '+e['name'];e['areas']=[a for a in ['云南','宁夏','新疆','山东'] if a in n[:80]]
        group=p.get('地区组');e['areas']+=([group] if group in ['华北','西北','东北'] else [])
    if kind=='site':e['entityType']='村庄／来源网络';e['name']=e['name'].replace('云南·德钦·','');e['aliases']+=[e['name'].removesuffix('村')]
    if e['id']=='cn-wine-042':e['aliases']+=['小圃高海拔赤霞珠']
    if e['id']=='cn-wine-031':e['aliases']+=['海拔2600霞多丽']
    if e['id']=='cn-wine-036':e['aliases']+=['腊普藏云谷冰酒']
    if e['id']=='cn-wine-032':e['aliases']+=['三星玫瑰蜜','云南红三星玫瑰蜜']
    if e['id']=='cn-wine-058':e['aliases']+=['宝庄霞多丽','Célèbre White','Celebre Chardonnay']
    if e['id']=='cn-prod-050':e['aliases']+=['云南西鸽梅里酒庄']
    if e['id']=='cn-prod-054':e['aliases']+=['罗迪酒庄','水乳大地','Chateau Roduit','Château Roduit']
    if e['id']=='cn-w-005':e['en']='Ao Yun';e['aliases']+=['敖云各年份','Ao Yun vintages'];e['status']='现行系列／当前年份待核'
    if e['id']=='cn-v-005':e['en']='Ao Yun 2017';e['status']='历史年份'
    if e['id']=='cn-prod-045':e['aliases']+=['小圃','建塘','Domaine de la Gyalthang']
    if kind=='vintage':
        tech=p.get('酿造与陈年','');chunks=[s.strip() for s in re.split('[；。]',tech) if s.strip()]
        e['technical']={label:'；'.join(s for s in chunks if re.search(pattern,s)) for label,pattern in [('采收','采收'),('发酵容器','发酵'),('浸皮','浸皮|冷浸'),('酒泥','酒泥'),('苹果酸乳酸发酵','MLF|苹果酸'),('橡木桶／陶罐／不锈钢','橡木|陶罐|不锈钢'),('陈酿时间','个月|瓶陈|熟化'),('残糖','残糖'),('酸度／pH','总酸|pH|酸度')]}
        sugar={'cn-vint-036':'3.3 g/L（赛事资料）','cn-vint-016':'3.9（Notion未标明单位，待核）','cn-vint-034':'180 g/L（赛事资料）','cn-vint-033':'产品页显示“0”；单位及实验室数据待核，不解释为绝对零值。'}
        e['technical']['残糖']=sugar.get(e['id'],'')
    records.append(e)
by_notion={e['notionId']:e for e in records};by_id={e['id']:e for e in records}
assert len(by_id)==len(records)==len(by_notion),'Duplicate canonical IDs'
relations=[]
def edge(a,b,label,kind='catalogue',evidence='',source='',vintage=None):
    if a not in by_notion or b not in by_notion or a==b:return
    r={'from':by_notion[a]['id'],'to':by_notion[b]['id'],'label':label,'kind':kind,'evidence':evidence,'source':source or by_notion[a]['url'],'vintage':vintage}
    if r not in relations:relations.append(r)
for e in records:
    p=e['properties'];n=e['notionId']
    if e['kind']=='wine':
        for u in p.get('酒庄',[]):edge(notion_id(u),n,'Producer → 长期酒款','wine')
    if e['kind']=='vintage':
        for u in p.get('酒款',[]):edge(notion_id(u),n,'长期酒款 → 年份档案','vintage')
    if e['kind']=='producer':
        for u in p.get('产区',[]):
            ni=notion_id(u)
            if ni in by_notion and by_notion[ni]['kind']=='region':edge(ni,n,'区域收录／非葡萄来源断言','region')
    if e['kind'] in ['region','site']:
        for u in p.get('上级地域',[]):edge(notion_id(u),n,'下级地域','hierarchy')
        for u in p.get('下级地域',[]):edge(n,notion_id(u),'下级地域','hierarchy')
for r in audit['relations']:edge(r['fromId'],r['toId'],r['label'],r['kind'],r['evidence'],r['source'],r.get('vintage'))
# Explicit navigation parent: Deqin is a Yunnan administrative entry, not a GI assertion.
edge('40717d16de4c81779b11eace9f67e326','40317d16de4c811db6beda9fd21e6649','下级地域','hierarchy',source='https://app.notion.com/p/40717d16de4c81779b11eace9f67e326')
# Brand/production network stays separate. Shared network never means common ownership.
for a,b in [('cn-prod-051','cn-prod-052'),('cn-prod-051','cn-prod-053'),('cn-prod-051','cn-prod-037'),('cn-prod-052','cn-prod-053')]:
    if a in by_id and b in by_id:edge(by_id[a]['notionId'],by_id[b]['notionId'],'品牌／生产网络关联；具体股权待核','network',by_id[a]['properties'].get('母集团／所有权',''))
for e in records:
    e['relations']=[r for r in relations if r['from']==e['id'] or r['to']==e['id']]
    # Search follows explicit edges. No unrelated producer portfolio inherits a village or vintage.
    related=[by_id[r['to'] if r['from']==e['id'] else r['from']] for r in e['relations']]
    e['searchText']=' '.join([e['name'],e['en'],*e['aliases'],e['summary'],str(e['properties'].get('年份','')),str(e['properties'].get('常用品种／风格','')),str(e['properties'].get('品种与比例','')),e['properties'].get('所在地',''),e['properties'].get('固定产区说明',''),*[(x['name']+' '+x['en']) for x in related]])
    del e['content']
data={'updatedAt':'2026-10-29','source':'Notion China Wine Library','counts':dict(collections.Counter(e['kind'] for e in records)),'records':records,'relations':relations,'notes':audit['criticalNotes']}
(ROOT/'data/china-library.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
index={'updatedAt':data['updatedAt'],'counts':data['counts'],'records':[{k:e[k] for k in ['id','notionId','kind','name','en','status','entityType','aliases','summary','areas','searchText']} for e in records]}
(ROOT/'data/china-index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2))
print(json.dumps({'records':data['counts'],'relations':len(relations)},ensure_ascii=False))

import json
from pathlib import Path
p=Path('research/rully-completion-20261029/census-additions.json');d=json.loads(p.read_text())
for producer in d['producers']:
 for w in producer['wines']:
  en=w['translations']['en'];pid=producer['id']
  if pid=='producer-fr-sylvain-lucie-ponsot':
   red='pinot-noir' in w['grapeIds'];village='bas-de-vauvry' in w['id'];place=w['place'];level='村庄级' if village else '一级园';levelen='village' if village else 'Premier Cru'
   w['place']=f'Rully {level}，{place}。酒庄将这一来源独立装瓶。';en['place']=f'{place}, Rully {levelen}; bottled separately by the estate.'
   method=w['method'];m_en=en['method']
   w['detail']=f'{w["grape"]} 酿制的 Rully {level}'+('红酒。' if red else '白酒。')+'此酒款的熟成方案为'+method+'酒庄另有不同容器或新桶比例的 Vauvry 酒款，分别建档。'
   en['detail']=f'A {w["grape"]} Rully {levelen} '+('red' if red else 'white')+' with the following maturation specification: '+m_en+' Other Vauvry cuvées use different vessels or new-oak proportions and are separate wines.'
   if not red:
    w['method']+=' 酒庄白酒的整体熟成时间为 15–20 个月，依年份调整；不是本酒款每个年份的固定时长。';en['method']+=' The estate gives 15–20 months as its general white-wine ageing range, adjusted by vintage; this is not a fixed duration for every release of this cuvée.'
   else:
    w['method']+=' 酒庄红酒采用温控与轻柔萃取；这属于酒庄层面的工艺说明。';en['method']+=' Temperature control and gentle extraction are described at estate level for the reds.'
   w['sourceIds']=list(dict.fromkeys(w['sourceIds']+[sid for s in producer['sections'] for sid in s['sourceIds']]))
  if pid=='producer-fr-des-chauchoux':
   red='pinot-noir' in w['grapeIds'];pc='1er-' in w['id'];place=w['place'];level='一级园' if pc else '村庄级';levelen='Premier Cru' if pc else 'village'
   w['place']=f'Rully {level}'+(f'，{place} 地块。' if pc else '，Burgundy 的 Côte Chalonnaise。')+'此酒款的葡萄园面积、种植年份及坡向未单独披露。'
   en['place']=f'Rully {levelen}'+(f', {place}.' if pc else ', Côte Chalonnaise, Burgundy.')+' Parcel area, planting year and exposure are not separately disclosed for this wine.'
   w['method']='酒庄官网给出的整体熟成基线为橡木桶 8–10 个月；未公布此酒款逐年份的发酵方式、新桶比例或熟成时间，不把酒庄基线视作本酒款的固定技术表。'
   en['method']='The estate website gives 8–10 months in oak as its general maturation baseline. Cuvée-specific fermentation, new-oak percentage and vintage-specific ageing are not published; the estate baseline is not a fixed technical specification for this wine.'
   w['detail']=f'Domaine des Chauchoux 的 {w["grape"]} '+('红酒' if red else '白酒')+f'，以 Rully {level}'+(f' {place}' if pc else '')+' 销售。BIVB 酒庄目录明确列出这款酒的颜色与级别；酒庄由 Belleville 家族经营，与 Domaine Belleville 为不同生产者。'
   en['detail']=f'A {w["grape"]} '+('red' if red else 'white')+f' from Domaine des Chauchoux, listed by BIVB as Rully {levelen}'+(f' {place}.' if pc else '.')+' The Belleville family runs this estate, which is distinct from Domaine Belleville.'
   w['sourceIds']=list(dict.fromkeys(w['sourceIds']+[sid for s in producer['sections'] for sid in s['sourceIds']]))
  if pid=='producer-fr-albert-sounit' and len(w['detail'])<20:
   w['detail']=f'{w["grape"]} 酿制的 '+w['name']+'。'+w['place']+' '+w['method']
   en['detail']=w['name']+', made from '+w['grape']+'. '+en['place']+' '+en['method']
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')

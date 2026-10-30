"""Cache verified source images without generating or substituting grape identities."""
import json,urllib.request,concurrent.futures,io
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[2];p=root/'data/grape-varieties.json';arr=json.loads(p.read_text());out=root/'public/media/grapes';out.mkdir(exist_ok=True,parents=True)
manifest_path=root/'data/grape-media.json';manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
new_ids=set(json.loads((root/'data/linked-country-audit.json').read_text())['newGrapeIds'])
def get(g):
 if g['id'] not in new_ids:return None
 u=g.get('imageUrl')
 if not u or u.startswith('/'):return None
 if g['id'] in ['hondarrabi-zuri','hondarrabi-beltza']:
  g['imageUrl']='';g['imageStatus']='Original source URL returned non-image data during validation';return None
 if u.startswith('http://'):u='https://'+u[7:]
 cached=manifest.get(g['id'])
 if cached and cached['originalUrl']==u and (root/'public'/cached['localUrl'].lstrip('/')).exists():
  g['originalImageUrl']=u;g['imageUrl']=cached['localUrl'];return None
 try:
  r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=22);data=r.read(8000000);im=Image.open(io.BytesIO(data));ext={'JPEG':'jpg','MPO':'jpg','PNG':'png','WEBP':'webp','AVIF':'avif','GIF':'gif'}.get(im.format)
  if not ext:raise ValueError('unsupported image '+str(im.format))
  file=out/(g['id']+'.'+ext);file.write_bytes(data);g['originalImageUrl']=u;g['imageUrl']='/media/grapes/'+file.name
  manifest[g['id']]={'originalUrl':u,'localUrl':g['imageUrl'],'credit':g.get('imageCredit'),'sourceUrl':g.get('imageSourceUrl'),'width':im.width,'height':im.height,'bytes':len(data)}
  return g['id'],'saved'
 except Exception as e:
  g['imageUrl']=u
  return g['id'],'remote-only: '+str(e)[:100]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
 results=[x for x in ex.map(get,arr) if x]
p.write_text(json.dumps(arr,ensure_ascii=False,indent=2)+'\n');manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print('New image attempts:',len(results),'cached total:',len(manifest));print([r for r in results if r[1]!='saved'])

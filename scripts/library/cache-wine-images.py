import json,subprocess,concurrent.futures,io,sys
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[2];p=root/'data/grape-wines.json';arr=json.loads(p.read_text());out=root/'public/media/grape-wines';out.mkdir(exist_ok=True,parents=True)
if len(sys.argv)>1:
 src=Path(sys.argv[1]);seen={w['id'] for w in arr}
 for part in ['extra','italy','iberia','world']:
  f=src/('wines-'+part+'.json')
  if not f.exists():raise ValueError('Missing batch '+str(f))
  for w in json.loads(f.read_text()):
   if w['id'] not in seen:arr.append(w);seen.add(w['id'])
def get(w):
 u=w.get('imageUrl')
 if not u or u.startswith('/'):return None
 try:
  r=subprocess.run(['curl','-L','--fail','--silent','--max-time','30','--connect-timeout','12','-A','Mozilla/5.0',u],capture_output=True,timeout=35)
  if r.returncode:raise ValueError('HTTP download code '+str(r.returncode))
  data=r.stdout;im=Image.open(io.BytesIO(data));ext={'JPEG':'jpg','MPO':'jpg','PNG':'png','WEBP':'webp','AVIF':'avif','GIF':'gif'}.get(im.format)
  if not ext:raise ValueError(im.format)
  if len(data)>10000000:raise ValueError('oversize')
  file=out/(w['id']+'.'+ext);file.write_bytes(data);w['originalImageUrl']=u;w['imageUrl']='/media/grape-wines/'+file.name
  return w['id'],'saved'
 except Exception as e:return w['id'],str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:results=[r for r in ex.map(get,arr) if r]
p.write_text(json.dumps(arr,ensure_ascii=False,indent=2)+'\n');print('Wines',len(arr),'local images',sum(str(w.get('imageUrl','')).startswith('/') for w in arr));print([r for r in results if r[1]!='saved'])

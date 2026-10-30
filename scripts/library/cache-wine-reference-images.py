"""Cache exact, researched wine photographs. Never substitute an unidentified bottle."""
import concurrent.futures
import io
import json
import urllib.request
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
path = root / 'data/grape-wines.json'
wines = json.loads(path.read_text())
output = root / 'public/media/grape-wines'
output.mkdir(parents=True, exist_ok=True)

def cache(wine):
    url = wine.get('imageUrl') or wine.get('originalImageUrl')
    if not url or not url.startswith(('http://', 'https://')):
        return None
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=20) as response:
            data = response.read(8_000_001)
        if len(data) > 8_000_000:
            raise ValueError('image exceeds cache size limit')
        with Image.open(io.BytesIO(data)) as picture:
            picture.verify()
            extension = {'JPEG': 'jpg', 'PNG': 'png', 'WEBP': 'webp', 'AVIF': 'avif'}.get(picture.format)
        if not extension:
            raise ValueError('unsupported image format')
        filename = wine['id'] + '.' + extension
        (output / filename).write_bytes(data)
        wine['originalImageUrl'] = url
        wine['imageUrl'] = '/media/grape-wines/' + filename
        return {'id': wine['id'], 'cached': True}
    except Exception as error:
        return {'id': wine['id'], 'cached': False, 'reason': str(error)[:140]}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results = [result for result in pool.map(cache, wines) if result]
path.write_text(json.dumps(wines, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(results, ensure_ascii=False))

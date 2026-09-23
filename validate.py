"""Validate generated pages and local routes. Python 3 standard library only."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, parse_qs
from collections import Counter

ROOT = Path(__file__).parent / 'docs'
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.tags, self.ids, self.refs, self.images, self.headings = path, [], [], [], [], []
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag,attrs))
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag in ('a','link','script','img'):
            ref = attrs.get('href') if tag in ('a','link') else attrs.get('src')
            if ref: self.refs.append(ref)
        if tag=='img': self.images.append(attrs)
        if tag in ('h1','h2','h3'): self.headings.append(int(tag[1]))

pages = {p.name: Page(p) for p in ROOT.glob('*.html')}
errors, refs = [], 0
valid_interests = {'rotulacion','senalizacion','acrilico','diseno','numero-habitacion','exhibidor-acrilico','placa-personalizada','exhibidor'}
for name,page in pages.items():
    if page.headings.count(1)!=1: errors.append(f'{name}: H1 count')
    if any(n>1 for n in Counter(page.ids).values()): errors.append(f'{name}: duplicate ID')
    if not any(t=='title' for t,a in page.tags): errors.append(f'{name}: missing title')
    if not any(t=='meta' and a.get('name')=='description' and a.get('content') for t,a in page.tags): errors.append(f'{name}: description')
    for previous,current in zip(page.headings,page.headings[1:]):
        if current>previous+1: errors.append(f'{name}: heading jump {previous}-{current}')
    for img in page.images:
        if not img.get('alt'): errors.append(f'{name}: image without alt')
    for ref in page.refs:
        url=urlsplit(ref)
        if url.scheme or url.netloc: continue
        refs+=1
        target=(page.path.parent/unquote(url.path)) if url.path else page.path
        if not target.is_file(): errors.append(f'{name}: missing {ref}')
        if url.fragment and target.name in pages and unquote(url.fragment) not in pages[target.name].ids: errors.append(f'{name}: missing anchor {ref}')
        if target.name=='contacto.html':
            for key,values in parse_qs(url.query).items():
                allowed={'interes':valid_interests,'producto':{'numero-habitacion','exhibidor-acrilico','placa-personalizada'},'origen':{'proyectos','taller'}}
                if key not in allowed or any(v not in allowed[key] for v in values): errors.append(f'{name}: invalid quote link {ref}')
required = [a.get('name') for t,a in pages['contacto.html'].tags if 'required' in a]
if set(required)!={'nombre','contacto','necesidad'}: errors.append(f'Required fields: {required}')
print(f'{len(pages)} pages; {refs} local links/assets; 3 required form fields.')
if errors: raise SystemExit('\n'.join(errors))
print('PASS: local routes, anchors, quote parameters, IDs, heading hierarchy, metadata and image alt text.')

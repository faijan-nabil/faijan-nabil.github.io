# Run:  python build_posts.py   -> regenerates blog/posts.json from the .md files
import os, re, json
D = 'blog/posts'; out = []
for f in sorted(os.listdir(D)):
    if not f.endswith('.md'): continue
    t = open(os.path.join(D, f), encoding='utf-8').read()
    m = re.match(r'---\n(.*?)\n---\n', t, re.S); meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ':' in line:
                k, v = line.split(':', 1); meta[k.strip()] = v.strip()
    out.append({'slug': f[:-3], 'title': meta.get('title', f[:-3]), 'date': meta.get('date', ''),
                'summary': meta.get('summary', ''),
                'tags': [x.strip() for x in meta.get('tags', '').split(',') if x.strip()]})
out.sort(key=lambda p: p['date'], reverse=True)
json.dump(out, open('blog/posts.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
print(len(out), 'posts written')

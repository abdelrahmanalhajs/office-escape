import re,sys,json
AR=r'؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿«»…'
RUN=re.compile('['+AR+']['+AR+r'\s.,:;!?()\-/0-9+×−=%·*]*')
def spans(src):
    out=[]
    ms=list(RUN.finditer(src));i=0
    while i<len(ms):
        a=ms[i].start();b=ms[i].end()
        while i+1<len(ms):
            gap=src[b:ms[i+1].start()]
            m=re.fullmatch(r'\s*\$\{([^{}]*)\}\s*',gap) or re.fullmatch(r'\s*\$\{([^{}]*\{[^{}]*\}[^{}]*)\}\s*',gap)
            if m and not re.search('['+AR+']',gap) and len(gap)<70: b=ms[i+1].end();i+=1
            else: break
        out.append((a,b));i+=1
    return out
def runs(src):
    out=[];pos=0
    ms=list(RUN.finditer(src))
    i=0
    while i<len(ms):
        a=ms[i].start();b=ms[i].end()
        while i+1<len(ms):
            gap=src[b:ms[i+1].start()]
            m=re.fullmatch(r'\s*\$\{([^{}]*)\}\s*',gap) or re.fullmatch(r'\s*\$\{([^{}]*\{[^{}]*\}[^{}]*)\}\s*',gap)
            if m and not re.search('['+AR+']',gap) and len(gap)<70: b=ms[i+1].end();i+=1
            else: break
        out.append(src[a:b]);i+=1
    return out
if __name__=='__main__':
    files=['index.html']+['games/%s.js'%g for g in ['office','show','pharaoh','priest','cake']]
    allr={}
    for f in files:
        for r in runs(open(f).read()):
            allr.setdefault(r.strip(),[]).append(f)
    keys=sorted(allr)
    print(len(keys),sum(len(k) for k in keys))
    json.dump(keys,open('i18n/keys.json','w'),ensure_ascii=False,indent=0)

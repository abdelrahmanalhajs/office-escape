import sys,json;sys.path.insert(0,'i18n')
import extract,raw_en
KEEP=set('صخنشي-ال')   # internal Arabic letter codes (not shown to players)
def keyruns(path,src):
    out=[]
    for r in extract.runs(src):
        k=r.strip()
        if k and set(k)<=KEEP and len(k)<=4: continue
        if k not in out: out.append(k)
    return out
if __name__=='__main__':
    files=['index.html','games/office.js','games/show.js','games/pharaoh.js','games/priest.js','games/cake.js']
    order={}
    for f in files:
        src=raw_en.apply_raw(f,open(f).read());order[f]=keyruns(f,src)
    json.dump(order,open('i18n/order.json','w'),ensure_ascii=False)
    for f in files[1:]:
        print('=====',f,len(order[f]))
        for i,k in enumerate(order[f]):print(i,k[:24].replace('\n',' '))

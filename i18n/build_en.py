import sys,json,re,os
sys.path.insert(0,'i18n')
import extract,raw_en,list_en
ROOT='.'
FILES={'index.html':'index','games/office.js':'office','games/show.js':'show','games/pharaoh.js':'pharaoh','games/priest.js':'priest','games/cake.js':'cake'}
POST={
 'games/cake.js':[("'. before the party. Enjoy!","' before the party. Enjoy!")],
 'games/office.js':[('From: Marwan ← Management','From: Marwan → Management')],
}
def load_tr(name):
    d={}
    for line in open('i18n/en/%s.txt'%name,encoding='utf8').read().split('\n'):
        if not line.strip(): continue
        n,t=line.split('|',1); d[int(n)]=t.replace('\\n','\n').replace("'",'’')
    return d
def translate(path,src):
    src=raw_en.apply_raw(path,src)
    keys=list_en.keyruns(path,src); tr=load_tr(FILES[path])
    assert len(keys)==len(tr),(path,len(keys),len(tr))
    mp={k:tr[i] for i,k in enumerate(keys)}
    out=[];pos=0
    for a,b in extract.spans(src):
        r=src[a:b];k=r.strip()
        out.append(src[pos:a]);pos=b
        if k not in mp:
            assert not k or (set(k)<=list_en.KEEP and len(k)<=4),(path,'untranslated',k)
            out.append(r);continue
        lead=r[:len(r)-len(r.lstrip())];trail=r[len(r.rstrip()):]
        out.append(lead+mp[k]+trail)
    out.append(src[pos:]);res=''.join(out)
    for a,b in POST.get(path,[]):
        assert a in res,(path,'post',a); res=res.replace(a,b)
    return res
def main():
    os.makedirs('docs/en/games',exist_ok=True)
    for path in FILES:
        res=translate(path,open(path).read())
        if path=='index.html':
            res=res.replace('dir="rtl" lang="ar"','dir="ltr" lang="en"').replace("'dir','rtl'","'dir','ltr'")
            res=res.replace('family=Aref+Ruqaa:wght@400;700','family=Aref+Ruqaa:wght@400;700&family=Caveat:wght@500;700')
            res=res.replace('--f-hand:"Aref Ruqaa"','--f-hand:"Caveat","Aref Ruqaa"')
            res=res.replace('style="text-align:right"','style="text-align:left"')
            res=res.replace('href="en/index.html" hreflang="en" lang="en">English','href="../index.html" hreflang="ar" lang="ar">العربية')
            res=res.replace("li.src='logo.png'","li.src='../logo.png'").replace("a.src='sounds/'+n","a.src='../sounds/'+n").replace("a.src='sounds/","a.src='../sounds/")
            res=res.replace('src="games/','src="games/')
            for a,b in [("transform-origin:right center;transition:transform .6s","transform-origin:left center;transition:transform .6s"),
                        ("transform:rotateY(-14deg) translateZ(10px);box-shadow:-18px 18px 40px","transform:rotateY(14deg) translateZ(10px);box-shadow:18px 18px 40px"),
                        ("rotateY(calc(-10deg + var(--ry,0deg)))","rotateY(calc(10deg + var(--ry,0deg)))"),
                        ("transform:rotateY(-80deg) translateZ(20px)!important;transition:transform .55s ease-in;box-shadow:-60px 0","transform:rotateY(80deg) translateZ(20px)!important;transition:transform .55s ease-in;box-shadow:60px 0"),
                        (".door-card .knob{position:absolute;top:52%;left:12px;",".door-card .knob{position:absolute;top:52%;right:12px;")]:
                assert a in res,a; res=res.replace(a,b)
        res=res.replace("'oe-","'oe-en-").replace('"oe-','"oe-en-')
        res=res.replace('dir="rtl"','dir="ltr"').replace("'dir','rtl'","'dir','ltr'")
        if path=='index.html':
            wrapped=('<!doctype html>\n<html lang="en" dir="ltr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<link rel="icon" href="../icon.svg">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}img{max-width:100%}body{margin:0}</style>\n</head>\n<body>\n'+res+'\n</body>\n</html>\n')
            open('docs/en/index.html','w',encoding='utf8').write(wrapped)
        else:
            open('docs/en/'+path,'w',encoding='utf8').write(res)
    # leftover Arabic check
    bad=0
    for path in FILES:
        f='docs/en/index.html' if path=='index.html' else 'docs/en/'+path
        t=open(f,encoding='utf8').read()
        for a,b in extract.spans(t):
            k=t[a:b].strip()
            if re.search('[\u0600-\u06FF]',k) and not (set(k)<=list_en.KEEP and len(k)<=4) and k not in ('٠١٢٣٤٥٦٧٨٩','٠-٩','العربية'):
                print('LEFTOVER',path,repr(k[:60]));bad+=1
    print('done, leftovers:',bad)
main()

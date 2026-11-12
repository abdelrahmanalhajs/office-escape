# Structural English replacements applied BEFORE the numbered prose translation.
import re
def L(prefix,new):  # replace a whole source line that starts with prefix
    return ('line',prefix,new)
def S(old,new): return ('sub',old,new)
def X(rx,new): return ('rx',rx,new)

RAW={
'games/office.js':[
 L("const FLW=","const FLW=['','1st floor','2nd floor','3rd floor','4th floor','5th floor','6th floor','7th floor','8th floor','9th floor'];"),
 L("const BR=","const BR=['Golf Land','Maadi','Mohandessin'],DP=['Projects','Accounts','Human Resources'],DV=['A','B','C'];"),
 L("const PN=","const PN={omar:'Omar',salma:'Salma',ziad:'Ziad'};"),
 L("  const rules=","  const rules=R.shuffle([`Slot ${pos[0]+1} holds the biggest of the four numbers.`,`Slot ${pos[1]+1} plus slot ${pos[2]+1} equals ${u+v}.`,`The number in slot ${pos[1]+1} is ${u<v?'smaller':'bigger'} than the number in slot ${pos[2]+1}.`]);"),
 L("const dest=","const dest=x=>`Destination: ${DP[x.gen.fax.di]} department, ${BR[x.gen.fax.bi]} branch, fax machine ${DV[x.gen.fax.vi]}.`;"),
],
'games/show.js':[
 L("const PADS=","const PADS=[{id:'bell',i:'🔔',l:'Bell',c:'#ff9d00'},{id:'clap',i:'👏',l:'Clap',c:'#ff3df2'},{id:'laugh',i:'😂',l:'Laugh',c:'#00b3ff'},{id:'door',i:'🚪',l:'Door',c:'#7a5cff'},{id:'horn',i:'🎺',l:'Horn',c:'#ff4d6d'},{id:'meow',i:'🐱',l:'Cat',c:'#2bc48a'}];"),
 L("const SHN=","const SHN={square:'the square',circle:'the circle',triangle:'the triangle'},CLN={red:'red',blue:'blue',green:'green',yellow:'yellow'};"),
 S("big?'اختاروا أكبر رقم!':'اختاروا أصغر رقم!'","big?'Choose the biggest number!':'Choose the smallest number!'"),
 S("'اضغطوا على '+SHN[sh[0]]+'!'","'Press '+SHN[sh[0]]+'!'"),
 S("'اختاروا اللون '+CLN[cl[0]]+'!'","'Choose the color '+CLN[cl[0]]+'!'"),
 S("'اضغطوا على كلمة '+","'Press the word '+"),
],
'games/pharaoh.js':[
 L("const PN=","const PN={sun:'Sun',eye:'Eye',scarab:'Scarab',wave:'Wave'};"),
 L("  const cards=","  const cards=R.shuffle([`“The ${PN[D]} symbol sits directly to the ${mir?'left':'right'} of the ${PN[C]} symbol.”`,`“The ${PN[B]} symbol is not at either end.”`,`“The ${mir?PN[B]:PN[A]} symbol comes before the ${mir?PN[A]:PN[B]} symbol when reading left to right.”`]);"),
],
'games/priest.js':[
 L("const SYM=","const SYM={wave:['The Wave','the Wave',1],bird:['The Bird','the Bird',0],eye:['The Eye','the Eye',1],mountain:['The Mountain','the Mountain',0]};"),
 L("const ING=","const ING={nile:['what runs without feet','Clear water that moves on its own.'],lotus:['the extract of a flower that floats on water','A lotus flower floating in pale liquid.'],sunoil:['an oil that carries the warmth of day','Warm golden oil that smells of sunshine.'],salt:['the solution left when salty water evaporates','White crystals that glitter, with a salty taste.']};"),
 L("const DW=","const DW=['','one drop','two drops','three drops'];"),
 X(r"const SPELLS=\[.*?\]\}\];","const SPELLS=[{w:['LIGHT','BREAKS','CURSE','COMES','PEACE','VILLAGE'],d:['NIGHT','BRAKES','NURSE','COMBS','PLACE','VINTAGE']},\n  {w:['DAWN','FADES','SHADOW','GROWS','HOPE','VALLEY'],d:['DUSK','FATES','WINDOW','GLOWS','ROPE','VOLLEY']},\n  {w:['MOON','OPENS','GATE','SHINES','LIGHT','TOWER'],d:['SOON','OVENS','GAME','SHARES','NIGHT','POWER']}];"),
 L("  const l1=","  const l1=R.shuffle(keys).map(k=>`${SYM[k][0]} guards ${ING[guard[k]][0]}.`);"),
 L("  const l2=","  const cap=t=>t[0].toUpperCase()+t.slice(1);\n  const l2=[`${cap(L(dbl))} gets twice what ${L(base)} gets.`,`${cap(L(plus))} gets what ${L(base)} gets, plus ${DW[a]}.`,`${cap(L(minus))} gets what ${L(plus)} gets, minus ${DW[b]}.`,`The four vessels hold ${5*s+2*a-b} drops in total.`];"),
 L("const NAMES=","const NAMES=[['nile','Nile Water'],['lotus','Lotus Extract'],['sunoil','Sun Oil'],['salt','Salt Solution']];"),
 L("const MSG=","const MSG='“Behind an eye that cannot see,<br>beneath a sun that does not burn,<br>inside a vessel that holds no water…<br>you will find what fell from the words of protection.”';"),
 L("const INSIDE=",""),L("const FR=",""),L("const STASH=",""),L("const PAT=",""),
 X(r"const lines=\[\[.*?\]\];","const lines=[['In the name of',0,','],['the',2,1,','],['and',4,3,'to the',5,'.']];"),
],
'games/cake.js':[
 L("const PEOPLE=","const PEOPLE=[{id:'omar',n:'Omar',m:1,e:'🧔',c:'#3a7bd5'},{id:'nada',n:'Nada',m:0,e:'👩',c:'#c94b9b'},{id:'karim',n:'Karim',m:1,e:'🧑',c:'#2bb673'},{id:'salma',n:'Salma',m:0,e:'👩‍🦱',c:'#e0a530'}];"),
 L("const XW=","const XW={40:'40 minutes',45:'45 minutes',50:'50 minutes'},YW={15:'a quarter of an hour',20:'twenty minutes'};"),
 L("const LN=","const LN={choc:'Chocolate',cake:'Cake',cream:'Cream',straw:'Strawberry'};"),
 X(r"ex=R\.shuffle\(\[.*?\]\);","ex=R.shuffle(['I was getting ice','I was hanging the decorations','I was fixing the speakers','I was looking for the charger']);"),
 L("  logs[early.id]=","  logs[early.id]='“I was in the hall ten minutes before the cake arrived. I stayed a quarter of an hour and left. '+ex[0]+'.”';"),
 L("  logs[quick.id]=","  logs[quick.id]=`“I came in right after ${early.n} left. I left two minutes before the power cut. ${ex[1]}.”`;"),
 L("  logs[thief.id]=","  logs[thief.id]=`“I came in ${Y===15?'five minutes':'ten minutes'} after ${quick.n} did. I stayed a quarter of an hour after the power cut. ${ex[2]}.”`;"),
 L("  logs[late.id]=","  logs[late.id]='“I came in five minutes after the power cut, and left a quarter of an hour later. '+ex[3]+'.”';"),
 L("  const recipe=","  const recipe=R.shuffle([`${LN[order[0]]} at the base.`,`${LN[order[1]]} directly on top of ${LN[order[0]]}.`,`${LN[order[2]]} directly on top of ${LN[order[1]]}.`,`${LN[order[3]]} as the very last layer on top.`]);"),
 L("const LAY=","const LAY={choc:{n:'Chocolate',c:'#5a3320',w:'200px',num:'9'},cake:{n:'Cake',c:'#e0b060',w:'170px',num:'4'},cream:{n:'Cream',c:'#f7a8c0',w:'140px',num:'7'},straw:{n:'Strawberry',c:'#e2264d',w:'110px',num:'🍓🍓'}};"),
],
'index.html':[],
}
def apply_raw(path,src):
    for kind,a,b in RAW.get(path,[]):
        if kind=='line':
            lines=src.split('\n');hit=False
            for i,l in enumerate(lines):
                if l.startswith(a): lines[i]=b;hit=True;break
            assert hit,(path,'line',a)
            src='\n'.join(lines)
        elif kind=='sub':
            assert a in src,(path,'sub',a); src=src.replace(a,b)
        else:
            src,n=re.subn(a,lambda m:b,src,count=1,flags=re.S); assert n==1,(path,'rx',a)
    return src

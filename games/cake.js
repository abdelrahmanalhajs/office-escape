/* قضية اختفاء تورتة عيد الميلاد */
(function(){
const css=`
.ck-room{background:var(--surface);border:2px dashed var(--line);border-radius:16px;padding:16px;position:relative;overflow:hidden}
.ck-tape{position:absolute;top:18px;left:-40px;right:-40px;background:#ffd23f;color:#3a2a00;font-weight:800;text-align:center;transform:rotate(-3deg);font-size:.8rem;letter-spacing:.2em;padding:2px;opacity:.9;pointer-events:none}
.ck-plate{display:block;margin:26px auto 6px;max-width:220px}
.ck-plate .crumb{animation:float 4s ease-in-out infinite}
.ck-clock{font-family:var(--f-mono);background:#1c1014;color:#ff6fa0;border-radius:8px;padding:.1em .6em;font-size:1.3rem;font-weight:700;direction:ltr;display:inline-block}
.ck-box{perspective:800px;display:grid;place-items:center;height:120px}
.ck-box .bx{width:150px;height:80px;background:#8a5d70;border-radius:6px;position:relative;margin-top:30px}
.ck-box .ld{position:absolute;inset:-22px -4px auto;height:26px;background:#e2457a;border-radius:6px;transform-origin:top right;transition:transform 1s cubic-bezier(.3,1.4,.4,1)}
.ck-box.open .ld{transform:rotate(55deg) translate(10px,-10px)}
.ck-box .ky{position:absolute;left:50%;top:10px;font-size:2rem;transform:translateX(-50%);opacity:0;transition:all .8s .5s}
.ck-box.open .ky{opacity:1;top:-50px}
.ck-cctv{background:#0e0a0c;border-radius:12px;padding:14px;color:#9dffb8;font-family:var(--f-mono);position:relative;overflow:hidden}
.ck-cctv::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(transparent 0 3px,#0004 3px 4px);pointer-events:none;animation:scan 6s linear infinite}
@keyframes scan{to{background-position:0 80px}}
.ck-rec{color:#ff4d6d;animation:blink 1s infinite}
@keyframes blink{50%{opacity:.2}}
.ck-sus{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;perspective:800px}
.ck-s{background:#1c1418;border:2px solid #9dffb844;border-radius:10px;padding:10px;color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:transform .3s;font-family:var(--f-body)}
.ck-s:hover{transform:rotateY(-14deg) translateZ(8px);border-color:#9dffb8}
.ck-s .ph{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;font-size:2rem;background:var(--pc)}
.ck-acc{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}
.ck-acc label{display:flex;flex-direction:column;gap:4px;font-size:.9rem}
.ck-stack{perspective:900px;height:250px;display:grid;place-items:end center}
.ck-tower{position:relative;width:200px;transform-style:preserve-3d;transform:rotateX(-12deg) rotateY(-22deg);animation:ckspin 14s linear infinite;display:flex;flex-direction:column-reverse;align-items:center}
@keyframes ckspin{to{transform:rotateX(-12deg) rotateY(338deg)}}
.ck-lay{width:var(--w);height:44px;border-radius:50%/22%;background:var(--c);box-shadow:inset 0 -10px 0 #0003,0 6px 10px #0003;display:grid;place-items:center;font-family:var(--f-mono);font-weight:700;font-size:1.3rem;color:#fff;margin-top:-6px;animation:dropin .6s;cursor:pointer;border:0}
.ck-parts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.ck-part{border:2px solid var(--line);background:var(--surface);border-radius:12px;padding:10px 14px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:96px;color:inherit}
.ck-part.used{opacity:.25;cursor:default}
.ck-part .sw{width:70px;height:26px;border-radius:50%/40%;background:var(--c);display:grid;place-items:center;font-family:var(--f-mono);font-weight:700;color:#fff}
.ck-fridge{perspective:900px;width:180px;height:230px;margin:auto;position:relative}
.ck-fridge .in{position:absolute;inset:0;background:#dff3ff;border-radius:10px;display:grid;place-items:center;font-size:4rem;border:3px solid #9bb7c7}
.ck-fridge .dr{position:absolute;inset:0;background:linear-gradient(90deg,#f4f6f8,#cfd6dd);border-radius:10px;border:3px solid #9bb7c7;transform-origin:left center;transition:transform 1.6s cubic-bezier(.4,.1,.2,1);display:grid;place-items:center}
.ck-fridge.open .dr{transform:rotateY(-115deg)}
.ck-fridge .hd{position:absolute;right:12px;top:40%;width:8px;height:50px;border-radius:4px;background:#8a93a5}
@media(max-width:700px){.ck-sus{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;
const cover=`<svg viewBox="0 0 200 200" aria-hidden="true"><ellipse cx="100" cy="160" rx="80" ry="14" fill="#fff" stroke="#f2c6d3" stroke-width="3"/><path d="M60 156q10-8 22-2t26-3 30 4" stroke="#ffd0dc" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="70" cy="150" r="3" fill="#8a4a2a"/><circle cx="126" cy="152" r="2.5" fill="#8a4a2a"/><text x="100" y="118" text-anchor="middle" font-size="84" font-family="Baloo Bhaijaan 2" fill="#fff">?</text><circle cx="150" cy="56" r="26" fill="none" stroke="#fff" stroke-width="7"/><path d="M168 76l20 22" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg>`;
function spots(el,list,x){
  el.innerHTML=`<div class="scene" style="--cols:4">${list.map(s=>`<button class="spot ${x.st['f_'+s.id]?(s.card?'found':'empty'):''}" type="button" data-s="${s.id}"><span style="font-size:2.2rem">${s.art}</span><span class="lbl">${s.label}</span></button>`).join('')}</div>`;
  el.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{const s=list.find(z=>z.id===b.dataset.s);x.st['f_'+s.id]=1;x.save();
    if(s.card){x.sfx('find');x.bag.add(s.id,s.t,s.card,s.icon||'🔎');x.bag.open(s.id);b.classList.add('found');}else{x.sfx('click');x.toast(s.e);b.classList.add('empty');}});
}
const R1={key:'c1',title:'مسرح الجريمة',short:'الصالة',goal:'افتحوا صندوق الأدلة.',
 hints:['التلات ورقات بيكملوا بعض. ولا واحدة فيها ساعة النور.','احسبوا التورتة وصلت إمتى الأول.',
  {prism:['الحفلة','− ؟','+ ؟','؟؟:؟؟'],text:'الصندوق بيقرا الساعة زي ساعة الحيطة، مش زي الدعوة.'}],
 render(el,x){
  el.innerHTML=`<div class="ck-room"><div class="ck-tape">CRIME SCENE · ممنوع الأكل · CRIME SCENE · ممنوع الأكل</div>
   <svg class="ck-plate" viewBox="0 0 220 90" aria-hidden="true"><ellipse cx="110" cy="60" rx="100" ry="22" fill="#fff" stroke="#f2c6d3" stroke-width="3"/><path d="M50 56q20-10 36 0t40-2 40 6" stroke="#ffd0dc" stroke-width="8" fill="none" stroke-linecap="round"/><g class="crumb"><circle cx="80" cy="50" r="3" fill="#8a4a2a"/><circle cx="140" cy="62" r="4" fill="#8a4a2a"/><circle cx="118" cy="48" r="2" fill="#8a4a2a"/></g></svg>
   <p style="text-align:center" class="muted">ساعة الحيطة: <span class="ck-clock" id="wc">${f24(x.gen.party-2)}</span></p></div>
   <div id="sc"></div>
   <div class="card tape"><b>على صندوق الأدلة</b><p class="hand">«لو عرفتوا النور قطع إمتى هتعرفوا أول خيط في الجريمة… وياريت متاكلوش الأدلة»</p></div>
   <div class="ck-box" id="bx"><div class="bx"><div class="ld"></div><div class="ky">🗝</div></div></div>
   <div class="row" style="justify-content:center"><div id="lk"></div></div><div class="msg" id="m" style="text-align:center"></div>`;
  spots(el.querySelector('#sc'),[
   {id:'c_inv',label:'ترابيزة الهدايا',art:'🎁',t:'دعوة عيد الميلاد',icon:'💌',card:'<div class="card"><p class="hand">انتوا معزومين على عيد ميلاد… مفاجأة!<br>الحفلة الساعة '+f12(x.gen.party)+' مساءً. متتأخروش.</p></div>'},
   {id:'c_bak',label:'باب التلاجة',art:'🧲',t:'ورقة الحلواني',icon:'🧾',card:'<div class="card"><p class="hand">التورتة اتسلّمت واتحطت في التلاجة قبل ميعاد الحفلة '+XW[x.gen.X]+'. بالهنا.</p></div>'},
   {id:'c_msg',label:'موبايل على الكنبة',art:'📱',t:'رسالة صاحب البيت',icon:'💬',card:'<div class="card"><p class="hand">يا جماعة النور قطع! التورتة يدوب كانت واصلة من '+YW[x.gen.Y]+'… حد يشوف الكشاف فين.</p></div>'},
   {id:'c_bal',label:'بلالين',art:'🎈',e:'بالونة فرقعت. محدش اتخض خالص.'},{id:'c_can',label:'علبة شمع',art:'🕯',e:'شمع من غير تورتة. مأساة.'},
   {id:'c_sofa',label:'تحت الكنبة',art:'🛋',e:'شوكة عليها كريمة. حد كان مستعجل.'},{id:'c_spk',label:'السماعة',art:'🔊',e:'بلاي ليست عيد ميلاد على الصامت.'},{id:'c_cat',label:'القطة',art:'🐈',e:'بريئة. المرة دي.'}],x);
  el.querySelector('#lk').innerHTML=x.lockHTML('lkc1',4,{label:'صندوق الأدلة'});
  x.wireLock('lkc1',4,v=>{if(v===x.gen.cut){el.querySelector('#bx').classList.add('open');x.sfx('unlock');
    x.bag.add('c_note','ورقة من الصندوق','<div class="card"><p class="hand">«اللي خد التورتة غالبًا كان موجود وسطكم… ومش بعيد يكون لسه بيمثل دور البريء!»</p></div>','🗝');
    setTimeout(()=>x.voice('ورقة جوه الصندوق','«اللي خد التورتة غالبًا كان موجود وسطكم… ومش بعيد يكون لسه بيمثل دور البريء!»',{av:'🗝',onClose:()=>x.solve(100)}),1500);return true;}
    x.fail(el.querySelector('#bx'),el.querySelector('#m'),'الصندوق مقفول. جربوا تاني.');return false;});
 }};
const PEOPLE=[{id:'omar',n:'عمر',m:1,e:'🧔',c:'#3a7bd5'},{id:'nada',n:'ندى',m:0,e:'👩',c:'#c94b9b'},{id:'karim',n:'كريم',m:1,e:'🧑',c:'#2bb673'},{id:'salma',n:'سلمى',m:0,e:'👩‍🦱',c:'#e0a530'}];
const f24=t=>String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');
const f12=t=>{const h=Math.floor(t/60)-12,m=t%60;return m?h+':'+String(m).padStart(2,'0'):String(h)};
const XW={40:'بأربعين دقيقة',45:'بخمسة وأربعين دقيقة',50:'بخمسين دقيقة'},YW={15:'ربع ساعة',20:'تلت ساعة'};
const LN={choc:'الشوكولاتة',cake:'الكيك',cream:'الكريمة',straw:'الفراولة'};
function generate(){
  const R=OE.RND,party=R.pick([1140,1170,1200,1230,1260]),X=R.pick([40,45,50]),Y=R.pick([15,20]),C=party-X+Y,entry=C-5;
  const [early,quick,thief,late]=R.shuffle(PEOPLE),logs={},ex=R.shuffle(['كنت بجيب تلج','كنت بعلّق الزينة','كنت بظبط السماعات','كنت بدوّر على الشاحن']);
  logs[early.id]='«أنا كنت في الصالة قبل التورتة ما توصل بعشر دقايق. قعدت ربع ساعة وخرجت. '+ex[0]+'.»';
  logs[quick.id]=`«دخلت أول ما ${early.n} ${early.m?'خرج':'خرجت'}. خرجت قبل النور ما يقطع بدقيقتين. ${ex[1]}.»`;
  logs[thief.id]=`«دخلت بعد ${quick.n} ما ${quick.m?'دخل':'دخلت'} ${Y===15?'بخمس دقايق':'بعشر دقايق'}. فضلت جوه ربع ساعة بعد النور ما قطع. ${ex[2]}.»`;
  logs[late.id]='«أنا دخلت بعد النور ما قطع بخمس دقايق، ومشيت بعد ربع ساعة. '+ex[3]+'.»';
  const order=R.shuffle(['choc','cake','cream','straw']),dg=R.digits(3,1,9),nums={},berries=R.int(1,5);order.filter(k=>k!=='straw').forEach((k,i)=>nums[k]=dg[i]);
  const recipe=R.shuffle([`${LN[order[0]]} في القاعدة.`,`${LN[order[1]]} فوق ${LN[order[0]]} مباشرة.`,`${LN[order[2]]} فوق ${LN[order[1]]} مباشرة.`,`${LN[order[3]]} آخر طبقة فوق.`]);
  return {party,X,Y,cut:f24(C).replace(':',''),sus:PEOPLE.map(p=>({...p,log:logs[p.id]})),acc:thief.id+'@'+(Math.floor(entry/60)-12)+String(entry%60).padStart(2,'0'),thief:thief.n,order,nums,berries,recipe,fridge:order.map(k=>k==='straw'?berries:nums[k]).join('')};
}
const R2={key:'c2',title:'كلنا أبرياء يا جماعة',short:'الكاميرات',goal:'حددوا المتهم… وساعة دخوله بالظبط.',
 hints:['محدش فيهم قال ساعة. كلهم بيحكوا بالنسبة لحاجة تانية.','رتّبوهم على خط زمني. الأدلة بتاعة الصالة لسه في الحقيبة.',
  {prism:['قبل','بعد','مش وقت','الوصول'],text:'تلات شروط على الشاشة. واحد بس بيحققهم التلاتة.'}],
 render(el,x){
  const SUS=x.gen.sus;
  el.innerHTML=`<div class="ck-cctv stack"><div class="row" style="justify-content:space-between"><span>CAM-02 · LIVING ROOM</span><span class="ck-rec">● REC</span></div>
   <p style="color:#fff;font-family:var(--f-body)">التورتة كانت موجودة لحد ما النور قطع. بعدها اختفت.</p>
   <ul style="margin:0;padding-inline-start:1.2em;color:#fff;font-family:var(--f-body)"><li>اللي أخد التورتة دخل قبل اختفائها.</li><li>خرج بعد اختفائها.</li><li>ماكانش في الصالة وقت وصول التورتة.</li></ul>
   <div class="ck-sus">${SUS.map(s=>`<button class="ck-s" type="button" data-s="${s.id}"><span class="ph" style="--pc:${s.c}">${s.e}</span><b>${s.n}</b><small style="opacity:.7">سجل الحركة</small></button>`).join('')}</div></div>
   <div class="panel stack"><b>محضر الاتهام</b><div class="ck-acc">
    <label>المتهم<select class="field" id="who"><option value="">—</option>${SUS.map(s=>`<option value="${s.id}">${s.n}</option>`).join('')}</select></label>
    <label>دخل الساعة<select class="field mono" id="hh"><option>6</option><option>7</option><option>8</option><option>9</option></select></label>
    <label>الدقيقة<select class="field mono" id="mm">${Array.from({length:12},(_,i)=>`<option>${String(i*5).padStart(2,'0')}</option>`).join('')}</select></label>
    <button class="btn" id="go" type="button">وجّهوا الاتهام</button></div><span class="muted" style="font-size:.85rem">اتهام غلط = ٣٠ ثانية خصم</span><div class="msg" id="m"></div></div>`;
  el.querySelectorAll('.ck-s').forEach(b=>b.onclick=()=>{const s=SUS.find(z=>z.id===b.dataset.s);x.sfx('click');x.bag.add('c_'+s.id,'أقوال '+s.n,`<div class="card"><p class="hand">${s.log}</p></div>`,s.e);x.bag.open('c_'+s.id);});
  el.querySelector('#go').onclick=()=>{const w=el.querySelector('#who').value,m=el.querySelector('#m');if(!w){x.fail(null,m,'اختاروا متهم.');return;}
    const k=w+'@'+el.querySelector('#hh').value+el.querySelector('#mm').value;
    if(k===x.gen.acc){x.sfx('unlock');x.voice('نظام الكاميرات','«تم تحديد المتهم بنجاح! بس واضح إنه نسي إن الكاميرات مش بتنسى… حتى لو هو نسي يمسح الكريمة من إيده 😂»<br><br>🗝 مفتاح المطبخ معاكم.',{av:'📹',onClose:()=>x.solve(100)});}
    else{x.run.pen+=30;x.save();x.fail(el.querySelector('.ck-acc'),m,'«واضح إنك اتسرعت في الحكم يا حضرة المحقق… ارجع راجع الأدلة!»');}};
 }};
const LAY={choc:{n:'شوكولاتة',c:'#5a3320',w:'200px',num:'9'},cake:{n:'كيك',c:'#e0b060',w:'170px',num:'4'},cream:{n:'كريمة',c:'#f7a8c0',w:'140px',num:'7'},straw:{n:'فراولة',c:'#e2264d',w:'110px',num:'🍓🍓'}};
const R3={key:'c3',title:'المطبخ ومهمة إنقاذ التورتة',short:'المطبخ',goal:'التلاجة مقفولة بكود. ابنوا التورتة صح وافتحوها.',
 hints:['الوصفة مش مكتوبة بالترتيب. رتّبوها انتوا، ومتفترضوش إن التورتة عادية.','الكود بيتقرا من القاعدة لفوق.',{prism:['🍓','🍓','= ؟','عدّوا'],text:'طبقة واحدة مفيهاش رقم مكتوب. بصّوا عليها كويس.'}],
 render(el,x){
  x.st.stack=x.st.stack||[];
  const num=k=>k==='straw'?'🍓'.repeat(x.gen.berries):String(x.gen.nums[k]);
  el.innerHTML=`<div id="sc"></div>
   <div class="ck-room"><div class="ck-stack"><div class="ck-tower" style="${x.st.built?'':'animation:none'}">${x.st.stack.map((k,i)=>`<button class="ck-lay" type="button" data-rm="${k}" style="--c:${LAY[k].c};--w:${200-i*28}px;font-size:${k==='straw'?'.8rem':'1.3rem'}" aria-label="شيل ${LAY[k].n}">${num(k)}</button>`).join('')||'<span class="muted">الطبق فاضي</span>'}</div></div>
   ${x.st.built?'':`<div class="ck-parts">${x.shuffle(Object.keys(LAY)).map(k=>`<button class="ck-part ${x.st.stack.includes(k)?'used':''}" type="button" data-k="${k}" style="--c:${LAY[k].c}"><span class="sw" style="font-size:${k==='straw'?'.6rem':'1rem'}">${num(k)}</span><span>${LAY[k].n}</span></button>`).join('')}</div>
   <p class="muted" style="text-align:center;font-size:.85rem">دوسوا على طبقة تتحط فوق اللي قبلها. دوسوا على طبقة في التورتة تشيلوها.</p>
   <div class="row" style="justify-content:center"><button class="btn" id="bd" type="button" ${x.st.stack.length===4?'':'disabled'}>التورتة جاهزة</button></div>`}</div>
   <div class="row" style="justify-content:center;gap:24px;align-items:center"><div class="ck-fridge" id="fr"><div class="in">🎂</div><div class="dr"><span class="hd"></span>❄</div></div><div id="lk"></div></div><div class="msg" id="m" style="text-align:center"></div>`;
  spots(el.querySelector('#sc'),[
   {id:'c_rec',label:'كتاب الطبخ',art:'📖',t:'الوصفة',icon:'📖',card:'<div class="card"><p class="hand">«عشان تعملوا تورتة مظبوطة مش مجرد خليط عشوائي زي اللي بيعمله عمر في المطبخ:»<br>'+x.gen.recipe.map(t=>'• '+t).join('<br>')+'</p></div>'},
   {id:'c_sink',label:'الحوض',art:'🚰',e:'سكينة تورتة مغسولة بسرعة.'},{id:'c_oven',label:'الفرن',art:'♨',e:'بارد. محدش خبز حاجة.'},{id:'c_apr',label:'مريلة',art:'🥼',e:'عليها بصمة كريمة. مقاس '+x.gen.thief+'.'}],x);
  el.querySelectorAll('.ck-part').forEach(b=>b.onclick=()=>{if(x.st.stack.includes(b.dataset.k))return;x.st.stack.push(b.dataset.k);x.sfx('drip');x.rerender();});
  if(!x.st.built)el.querySelectorAll('.ck-lay').forEach(b=>b.onclick=()=>{x.st.stack=x.st.stack.filter(k=>k!==b.dataset.rm);x.sfx('click');x.rerender();});
  const bd=el.querySelector('#bd');if(bd)bd.onclick=()=>{if(x.st.stack.join(',')===x.gen.order.join(',')){x.st.built=1;x.sfx('magic');x.rerender();}else{x.fail(el.querySelector('.ck-stack'),el.querySelector('#m'),'التورتة وقعت. ده خليط عمر.');x.st.stack=[];setTimeout(()=>x.rerender(),900);}};
  el.querySelector('#lk').innerHTML=x.lockHTML('lkc3',4,{label:'كود التلاجة'});
  x.wireLock('lkc3',4,v=>{if(!x.st.built){x.fail(el.querySelector('#fr'),el.querySelector('#m'),'ابنوا التورتة الأول.');return false;}
    if(v===x.gen.fridge){el.querySelector('#fr').classList.add('open');x.sfx('unlock');
     setTimeout(()=>x.voice('رسالة من '+x.gen.thief,'«يا جماعة أنا مخبي التورتة عشان أعمل مفاجأة لصاحب عيد الميلاد وأحط عليها صورته وهو نايم… بس مكنتش متوقع إنكم تحولوا عيد الميلاد لقسم شرطة! وبالمناسبة أنا كنت هاكل حتة صغيرة بس»',{av:'🧑',onClose:()=>x.solve(0)}),1900);return true;}
    x.fail(el.querySelector('#fr'),el.querySelector('#m'),'التلاجة بتزنّ. الكود غلط.');return false;});
 }};
OE.register({id:'cake',short:'التورتة',title:'قضية اختفاء تورتة عيد الميلاد',theme:'cake',color:'#e2457a',
 tagline:'الحفلة كمان ٢٠ دقيقة. والتورتة… مش موجودة.',minutes:20,players:'٣–٦ محققين',difficulty:4,cover,
 story:`<p>الحفلة هتبدأ كمان ٢٠ دقيقة، وصاحب عيد الميلاد في الطريق، لكن في كارثة… التورتة اختفت!</p><p style="margin-top:8px">آخر واحد شافها بيقول إنه سابها في مكانها، والباقيين كل واحد عنده رواية، وفي حد واضح إنه مخبي سر. اعرفوا مين، وإمتى، وفين.</p>`,
 rooms:[R1,R2,R3], generate,
 winHTML:x=>`<span class="trophy">القضية اتحلت</span><h1>مبروك يا محققين!</h1><p class="lead">أنقذتوا عيد الميلاد قبل وصول صاحبه… بس في سؤال أهم من كل الأدلة: مين فيكم لحس الكريمة اللي على طبق التقديم؟</p>`,
 loseHTML:x=>`<h1>صاحب عيد الميلاد وصل</h1><p class="lead">الشمع منوّر… على طبق فاضي. والكل بيبص على ${x.gen.thief||'بعض'}.</p>`,
});
document.getElementById('game-css').textContent+=css;
})();

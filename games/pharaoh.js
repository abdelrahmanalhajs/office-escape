/* ممنوع إزعاج الفرعون */
(function(){
const css=`
.ph-wall{background:linear-gradient(180deg,#3a2a14,#2b1f10);border:2px solid #6b4e22;border-radius:14px;padding:18px;box-shadow:inset 0 0 40px #0008}
.ph-sym{width:48px;height:48px;display:inline-block}
.ph-sym svg{width:100%;height:100%}
.ph-grid{display:grid;grid-template-columns:repeat(6,48px);gap:8px;justify-content:center;direction:ltr;padding:14px;background:#1d140a;border-radius:10px;border:2px solid #e0a53055}
.ph-grid .ph-sym{animation:flipin .6s both}
.ph-insc{font-family:var(--f-display);font-size:1.3rem;color:#e0a530;text-align:center;text-shadow:0 0 12px #e0a53066}
.ph-pap{background:linear-gradient(90deg,#d8c08a,#ead7a8 20%,#ead7a8 80%,#d8c08a);color:#3a2a10;border-radius:4px;padding:16px;box-shadow:var(--shadow);position:relative}
.ph-pap table{width:100%;border-collapse:collapse;direction:ltr}
.ph-pap td{padding:6px;text-align:center;border-bottom:1px dashed #3a2a1055;font-family:var(--f-mono);font-size:1.3rem;font-weight:700}
.ph-assemble{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;perspective:800px;max-width:340px;margin:auto}
.ph-assemble .pc{height:90px;background:#ead7a8;border-radius:3px;animation:fly 1.2s both cubic-bezier(.2,.9,.3,1.2)}
.ph-assemble .pc:nth-child(1){--fx:-160px;--fy:-90px}.ph-assemble .pc:nth-child(2){--fx:160px;--fy:-120px;animation-delay:.15s}.ph-assemble .pc:nth-child(3){--fx:-140px;--fy:120px;animation-delay:.3s}.ph-assemble .pc:nth-child(4){--fx:150px;--fy:110px;animation-delay:.45s}
@keyframes fly{from{transform:translate(var(--fx),var(--fy)) rotateY(180deg) rotateZ(40deg);opacity:0}to{transform:none;opacity:1}}
.ph-tablets{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.ph-tab{background:linear-gradient(#8a7a62,#6b5d48);border-radius:14px 14px 6px 6px;padding:14px;display:flex;align-items:center;justify-content:center;gap:6px;direction:ltr;font-family:var(--f-mono);font-size:1.6rem;color:#f6e7c8;box-shadow:0 8px 0 #3a2f22}
.ph-tab .ph-sym{width:40px;height:40px}
.ph-scale{display:block;margin:auto;max-width:260px}
.ph-scale .beam{transform-origin:130px 40px;transition:transform 1.2s cubic-bezier(.3,1.5,.4,1);transform:rotate(-12deg)}
.ph-scale.ok .beam{transform:rotate(0)}
.ph-lock3{display:flex;gap:14px;justify-content:center;direction:ltr;flex-wrap:wrap}
.ph-lock3 label{display:flex;flex-direction:column;align-items:center;gap:6px;background:#1d140a;border:2px solid #e0a53066;border-radius:12px;padding:10px}
.ph-lock3 select{background:#2b1f10;color:#f6e7c8;border:1px solid #e0a530;border-radius:8px;font-family:var(--f-mono);font-size:1.3rem;padding:.2em .4em}
.ph-altar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;direction:ltr;background:linear-gradient(#5a4428,#3a2a14);padding:14px;border-radius:10px;box-shadow:0 10px 0 #1d140a}
.ph-slot{aspect-ratio:1;border:2px dashed #e0a53088;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#1d140a88;position:relative}
.ph-slot .n{position:absolute;top:4px;left:8px;font-family:var(--f-mono);color:#e0a530;font-size:.8rem}
.ph-slot.fill{border-style:solid;animation:dropin .5s}
.ph-tray{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.ph-piece{width:72px;height:72px;border-radius:12px;border:2px solid #e0a530;background:#2b1f10;cursor:pointer;display:grid;place-items:center;transition:transform .2s}
.ph-piece.sel{transform:translateY(-8px) rotateX(20deg);box-shadow:0 0 0 4px #e0a53066}
.ph-piece.used{opacity:.25;cursor:default}
.ph-env{perspective:700px;display:grid;place-items:center;height:150px}
.ph-env .e{width:200px;height:120px;background:#ead7a8;position:relative;border-radius:4px;box-shadow:0 10px 24px #0008}
.ph-env .f{position:absolute;inset:0 0 auto;height:70px;background:#d8c08a;clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:top;transition:transform 1s}
.ph-env .seal{position:absolute;top:50px;left:50%;width:30px;height:30px;margin-left:-15px;border-radius:50%;background:#a3271a;transition:opacity .3s}
.ph-env.open .f{transform:rotateX(180deg)}.ph-env.open .seal{opacity:0}
.ph-coffin{display:block;margin:auto;max-width:200px}
.ph-coffin .sl{animation:sealIn 1.6s both cubic-bezier(.3,1.3,.4,1)}
@keyframes sealIn{from{transform:translate(0,-120px) rotate(-90deg);opacity:0}}
@media(max-width:700px){.ph-tablets{grid-template-columns:1fr}.ph-grid{grid-template-columns:repeat(4,44px)}}
`;
const S={
 sun:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="8" fill="#e0a530"/>'+Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<line x1="${20+Math.cos(a)*11}" y1="${20+Math.sin(a)*11}" x2="${20+Math.cos(a)*17}" y2="${20+Math.sin(a)*17}" stroke="#e0a530" stroke-width="3" stroke-linecap="round"/>`}).join('')+'</svg>',
 eye:'<svg viewBox="0 0 40 40"><path d="M4 20q16-14 32 0q-16 14-32 0z" fill="none" stroke="#3fb6c8" stroke-width="3"/><circle cx="20" cy="20" r="5" fill="#3fb6c8"/><path d="M14 27l-3 9M24 27q4 6 0 10" stroke="#3fb6c8" stroke-width="2.5" fill="none"/></svg>',
 scarab:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="23" rx="9" ry="11" fill="#2f8a5a"/><circle cx="20" cy="10" r="4" fill="#2f8a5a"/><path d="M11 18l-7-4M11 26l-7 3M29 18l7-4M29 26l7 3" stroke="#2f8a5a" stroke-width="2.5"/><line x1="20" y1="13" x2="20" y2="34" stroke="#1d140a" stroke-width="1.5"/></svg>',
 wave:'<svg viewBox="0 0 40 40"><path d="M3 14l5-5 5 5 5-5 5 5 5-5 5 5 4-4M3 24l5-5 5 5 5-5 5 5 5-5 5 5 4-4M3 34l5-5 5 5 5-5 5 5 5-5 5 5 4-4" fill="none" stroke="#5aa0ff" stroke-width="2.5"/></svg>',
 feather:'<svg viewBox="0 0 40 40"><path d="M20 4q12 12 0 32q-12-20 0-32z" fill="#f6e7c8"/><line x1="20" y1="8" x2="20" y2="38" stroke="#8a6a30" stroke-width="2"/></svg>',
 ruby:'<svg viewBox="0 0 40 40"><path d="M10 14l5-7h10l5 7-10 20z" fill="#d7263d"/><path d="M10 14h20M15 7l5 7 5-7M20 14v20" stroke="#ff8a9a" stroke-width="1.2" fill="none"/></svg>',
 crown:'<svg viewBox="0 0 40 40"><path d="M6 30l2-18 7 8 5-12 5 12 7-8 2 18z" fill="#e0a530"/><rect x="6" y="30" width="28" height="5" fill="#c08a20"/></svg>',
};
const sym=(k,w)=>`<span class="ph-sym" ${w?`style="width:${w}px;height:${w}px"`:''}>${S[k]}</span>`;
const cover=`<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M70 20h60l14 30-6 130H62l-6-130z" fill="#e0a530"/><path d="M70 20h60l14 30H56z" fill="#3fb6c8"/><rect x="78" y="56" width="44" height="40" rx="18" fill="#f2c88a"/><path d="M84 70h10M106 70h10" stroke="#1d140a" stroke-width="4" stroke-linecap="round"/><path d="M88 84q12 6 24 0" stroke="#1d140a" stroke-width="3" fill="none"/><path d="M92 96h16v28l-8 6-8-6z" fill="#3fb6c8"/><text x="100" y="168" text-anchor="middle" font-size="28">💤</text><text x="146" y="40" font-size="22" fill="#fff" font-family="Lalezar">Z</text><text x="160" y="24" font-size="16" fill="#fff" font-family="Lalezar">z</text></svg>`;
const pap=g=>`<div class="ph-pap"><table><tr>${g.pord.map(k=>`<td>${sym(k,36)}</td>`).join('')}</tr><tr>${g.pord.map(k=>`<td>${g.vals[k]}</td>`).join('')}</tr></table></div>`;
const PN={sun:'الشمس',eye:'العين',scarab:'الجعران',wave:'الموجة'};
function generate(){
  const R=OE.RND,keys=['sun','eye','scarab','wave'],d=R.digits(4,1,9),vals={};keys.forEach((k,i)=>vals[k]=d[i]);
  const grid=[];keys.forEach(k=>{for(let i=0,n=R.int(3,6);i<n;i++)grid.push(k)});
  const [f,r,c]=R.digits(3,1,9),[A,B,C,D]=R.shuffle(keys),mir=R.int(0,1),sol=mir?[D,C,B,A]:[A,B,C,D];
  const cards=R.shuffle([`«رمز ${PN[D]} مباشرة على ${mir?'يسار':'يمين'} رمز ${PN[C]}.»`,`«رمز ${PN[B]} ليس في أي طرف.»`,`«رمز ${mir?PN[B]:PN[A]} يسبق رمز ${mir?PN[A]:PN[B]} عند القراءة من اليسار إلى اليمين.»`]);
  return {vals,pord:R.shuffle(keys),grid:R.shuffle(grid),door:d.slice().sort((a,b)=>a-b).join(''),eq:[2*f,f+r,r+c],lock3:''+f+r+c,sol,cards,box:sol.slice().reverse().map(k=>vals[k]).join('')};
}
function spots(el,list,x,after){
  el.innerHTML=`${OE.sceneOpen('bg-pharaoh',list,x)}${list.map((s,i)=>`<button style="${OE.slot(i,list.length)}" class="spot ${x.st['f_'+s.id]?(s.card||s.piece?'found':'empty'):''}" type="button" data-s="${s.id}"><span class="art">${s.art}</span><span class="lbl">${s.label}</span></button>`).join('')}</div>`;
  el.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{const s=list.find(z=>z.id===b.dataset.s);const first=!x.st['f_'+s.id];x.st['f_'+s.id]=1;x.save();
    if(s.card){x.sfx('find');x.bag.add(s.id,s.t,s.card,s.icon||'𓂀');x.bag.open(s.id);b.classList.add('found');}
    else if(s.piece){if(first){x.sfx('find');x.toast('لقيتوا قطعة بردية!');}b.classList.add('found');}
    else{x.sfx('click');x.toast(s.e);b.classList.add('empty');}
    after&&after();});
}
const R1={key:'p1',title:'شفرة الحارس',short:'الحارس',goal:'افتحوا باب الحارس عشان توصلوا لقاعة الميزان.',
 hints:['البردية مش زينة. كل رمز ليه قيمة.','الباب مش عايز تعدّوا. عايز ترتّبوا.',
  {prism:['0','…','9','✓'],text:'ترجموا كل رمز مختلف، والترتيب "الصح دايمًا" هو اللي أي حد يعرفه من غير ما يفكر.'}],
 render(el,x){
  const L=[{id:'p_jar',label:'جرة',art:'🏺',piece:1},{id:'p_anubis',label:'تمثال',art:'🗿',e:'التمثال بيبصلكم. بس كده.'},{id:'p_torch',label:'شعلة',art:'🔥',piece:1},{id:'p_sand',label:'كومة رمل',art:'⛰',piece:1},
    {id:'p_chest',label:'صندوق خشب',art:'🧰',e:'فاضي. حد سبقكم.'},{id:'p_crack',label:'شق في الحيطة',art:'🧱',piece:1},{id:'p_rug',label:'سجادة',art:'🟫',e:'تراب تلات آلاف سنة.'},{id:'p_cat',label:'تمثال قطة',art:'🐈‍⬛',e:'باستت نايمة. بلاش تصحّوها هي كمان.'}];
  const got=L.filter(s=>s.piece&&x.st['f_'+s.id]).length;
  const grid=x.gen.grid,PAP=pap(x.gen);
  el.innerHTML=`<div id="sc"></div>
   <div class="ph-wall stack"><div class="row" style="justify-content:space-between"><b>قطع البردية: ${got} من 4</b>${got===4&&!x.st.asm?'<button class="btn sm" id="asm" type="button">ركّبوا البردية</button>':''}</div><div id="pap"></div></div>
   <div class="ph-wall stack"><div class="ph-insc">«الترتيب الصح دايمًا صح كده كده»</div><div class="ph-grid">${grid.map((k,i)=>`<span class="ph-sym" style="animation-delay:${i*.04}s">${S[k]}</span>`).join('')}</div>
   <div class="row" style="justify-content:center"><div id="lk"></div></div><div class="msg" id="m" style="text-align:center"></div></div>`;
  spots(el.querySelector('#sc'),L,x,()=>x.rerender());
  if(x.st.asm)el.querySelector('#pap').innerHTML=PAP;
  const a=el.querySelector('#asm');if(a)a.onclick=()=>{x.sfx('magic');el.querySelector('#pap').innerHTML=`<div class="ph-assemble">${'<div class="pc"></div>'.repeat(4)}</div>`;
    setTimeout(()=>{x.st.asm=1;x.bag.add('p_pap','البردية',PAP,'📜');x.rerender();},1700);};
  el.querySelector('#lk').innerHTML=x.lockHTML('lkp1',4,{label:'باب الحارس'});
  x.wireLock('lkp1',4,v=>{if(v===x.gen.door){x.sfx('stone');x.good(el.querySelector('#m'),'الباب بيتزحزح…');setTimeout(()=>x.voice('صوت من جوه الحيطة','«خدوا البردية معاكم… آخر باب بيتكلم نفس اللغة.»',{av:'𓂀',onClose:()=>x.solve(100)}),900);return true;}x.fail(el.querySelector('.ph-grid'),el.querySelector('#m'),'الرموز اتطفت. الباب مش موافق.');return false;});
 }};
const TAB=(a,b,n)=>`<div class="ph-tab">${sym(a)}<span>+</span>${sym(b)}<span>=</span><span>${n}</span></div>`;
const R2={key:'p2',title:'ميزان الفرعون',short:'الميزان',goal:'عدّوا اختبار الميزان وافتحوا غرفة العرش.',
 hints:['نفس الرسمة ليها نفس القيمة في كل لوح.','ابدأوا باللوح اللي فيه رسمة واحدة مكررة.',{prism:[sym('feather',30),'→',sym('ruby',30),'→ '+sym('crown',24)],text:'كل قيمة تعرفوها بتفتح اللوح اللي بعده.'}],
 render(el,x){
  const L=[{id:'p_t1',label:'تحت التمثال',art:'🗿',card:TAB('feather','feather',x.gen.eq[0]),t:'لوح ١',icon:'🪨'},{id:'p_t2',label:'ورا الستارة',art:'🎭',card:TAB('feather','ruby',x.gen.eq[1]),t:'لوح ٢',icon:'🪨'},
    {id:'p_t3',label:'جوه التابوت الصغير',art:'⚱',card:TAB('ruby','crown',x.gen.eq[2]),t:'لوح ٣',icon:'🪨'},{id:'p_v',label:'مزهرية',art:'🏺',e:'فيها ورد ناشف.'},{id:'p_s',label:'درع',art:'🛡',e:'تقيل جدًا.'},{id:'p_m',label:'مومياء صغيرة',art:'🩹',e:'قطة؟ ولا كلب؟ مش وقته.'}];
  const found=['p_t1','p_t2','p_t3'].filter(k=>x.st['f_'+k]);
  el.innerHTML=`<svg class="ph-scale ${x.st.ok?'ok':''}" viewBox="0 0 260 150" aria-hidden="true"><rect x="125" y="40" width="10" height="100" fill="#c08a20"/><rect x="90" y="138" width="80" height="10" rx="3" fill="#c08a20"/><g class="beam"><rect x="30" y="36" width="200" height="8" rx="4" fill="#e0a530"/><path d="M40 44l-18 40h36zM220 44l-18 40h36z" fill="none" stroke="#e0a530" stroke-width="2"/><ellipse cx="40" cy="86" rx="22" ry="5" fill="#e0a530"/><ellipse cx="220" cy="86" rx="22" ry="5" fill="#e0a530"/><path d="M40 70q8-16 0-26q-8 10 0 26" fill="#f6e7c8"/></g><circle cx="130" cy="38" r="8" fill="#3fb6c8"/></svg>
   <div id="sc"></div>
   ${found.length?`<div class="ph-tablets">${found.map(k=>L.find(s=>s.id===k).card).join('')}</div>`:''}
   <div class="ph-wall stack"><div class="ph-insc">قفل غرفة العرش</div>
   <div class="ph-lock3">${['feather','ruby','crown'].map(k=>`<label>${sym(k)}<select id="v_${k}" aria-label="${k}">${Array.from({length:10},(_,i)=>`<option ${String(x.st['v_'+k]??'')===String(i)?'selected':''}>${i}</option>`).join('')}</select></label>`).join('')}</div>
   <div class="row" style="justify-content:center"><button class="btn" id="go" type="button">لفّوا القفل</button></div><div class="msg" id="m" style="text-align:center"></div></div>`;
  spots(el.querySelector('#sc'),L,x,()=>x.rerender());
  ['feather','ruby','crown'].forEach(k=>{const s=el.querySelector('#v_'+k);if(x.st['v_'+k]===undefined)s.value='0';s.onchange=()=>{x.st['v_'+k]=s.value;x.save();x.sfx('click');};});
  el.querySelector('#go').onclick=()=>{const v=['feather','ruby','crown'].map(k=>el.querySelector('#v_'+k).value).join('');
    if(v===x.gen.lock3){x.st.ok=1;x.save();el.querySelector('.ph-scale').classList.add('ok');x.sfx('stone');setTimeout(()=>x.voice('الفرعون (بيتمتم)','«هو لازم كل الدوشة دي عشان الواحد يعرف ينام؟»',{av:'😴',onClose:()=>x.solve(100)}),1300);}
    else x.fail(el.querySelector('.ph-lock3'),el.querySelector('#m'),'الميزان مال. الفرعون اتقلب في نومه.');};
 }};
const ORDER=['sun','eye','scarab','wave'];
const R3={key:'p3',title:'رجّعوا الحماية',short:'الختم',goal:'رتّبوا رموز الحماية على المذبح، وافتحوا صندوق ختم النوم.',
 hints:['في رمز واحد ممنوع من الطرفين. ابدأوا بيه.','في رمزين لازم يقفوا جنب بعض. اعتبروهم قطعة واحدة.',{prism:['١','٢','٣','٤'],text:'بعد الترتيب، الوصية بتتقرا من اليمين. والبردية لسه في الحقيبة.'}],
 render(el,x){
  x.st.slots=x.st.slots||[null,null,null,null];
  const L=[{id:'p_c1',label:'ورا الشعلة',art:'🔥',card:'<div class="card"><p class="hand">'+x.gen.cards[0]+'</p></div>',t:'بطاقة ١',icon:'📜'},
    {id:'p_c2',label:'تحت السجادة',art:'🟫',card:'<div class="card"><p class="hand">'+x.gen.cards[1]+'</p></div>',t:'بطاقة ٢',icon:'📜'},
    {id:'p_c3',label:'بُق التمثال',art:'🗿',card:'<div class="card"><p class="hand">'+x.gen.cards[2]+'</p></div>',t:'بطاقة ٣',icon:'📜'},
    {id:'p_x1',label:'عمود',art:'🏛',e:'نقوش عن حفلة قديمة.'},{id:'p_x2',label:'قارب صغير',art:'🛶',e:'قارب الشمس. ناقصه مجداف.'},{id:'p_x3',label:'سلة',art:'🧺',e:'تمر عمره تلات آلاف سنة. لا.'}];
  if(x.st.arranged)return box(el,x);
  el.innerHTML=`<div id="sc"></div>
   <div class="ph-wall stack"><div class="ph-insc">المذبح · من الشمال لليمين</div>
   <div class="ph-altar">${x.st.slots.map((k,i)=>`<button class="ph-slot ${k?'fill':''}" type="button" data-i="${i}"><span class="n">${i+1}</span>${k?sym(k,44):''}</button>`).join('')}</div>
   <div class="ph-tray">${ORDER.map(k=>`<button class="ph-piece ${x.st.sel===k?'sel':''} ${x.st.slots.includes(k)?'used':''}" type="button" data-k="${k}">${sym(k,40)}</button>`).join('')}</div>
   <p class="muted" style="text-align:center;font-size:.9rem">اختاروا رمز وبعدين مكانه. دوسوا على مكان مليان تفضّوه.</p>
   <div class="row" style="justify-content:center"><button class="btn" id="go" type="button" ${x.st.slots.every(Boolean)?'':'disabled'}>ثبّتوا الترتيب</button></div><div class="msg" id="m" style="text-align:center"></div></div>`;
  spots(el.querySelector('#sc'),L,x);
  el.querySelectorAll('.ph-piece').forEach(b=>b.onclick=()=>{if(x.st.slots.includes(b.dataset.k))return;x.st.sel=b.dataset.k;x.sfx('click');x.rerender();});
  el.querySelectorAll('.ph-slot').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(x.st.slots[i]){x.st.slots[i]=null;}else if(x.st.sel){x.st.slots[i]=x.st.sel;x.st.sel=null;x.sfx('stone');}x.rerender();});
  el.querySelector('#go').onclick=()=>{if(x.st.slots.join(',')===x.gen.sol.join(',')){x.st.arranged=1;x.sfx('magic');x.rerender();}else{x.fail(el.querySelector('.ph-altar'),el.querySelector('#m'),'الرموز بتنطفي واحد ورا التاني…');}};
 }};
function box(el,x){
  const W='<div class="card"><p class="hand">«ارجعوا للبردية. ابدأوا بالرمز الموجود أقصى اليمين، ثم تحرّكوا خانة خانة نحو اليسار. أرقام الرموز تفتح صندوق ختم النوم.»</p></div>';
  el.innerHTML=`<div class="ph-wall stack"><div class="ph-altar">${x.st.slots.map((k,i)=>`<div class="ph-slot fill"><span class="n">${i+1}</span>${sym(k,44)}</div>`).join('')}</div></div>
   <div class="ph-env ${x.st.envOpen?'open':''}" id="env"><div class="e"><div class="f"></div><div class="seal"></div></div></div>
   ${x.st.envOpen?W:'<div class="row" style="justify-content:center"><button class="btn" id="oe" type="button">افتحوا «وصية الفرعون»</button></div>'}
   <div class="row" style="justify-content:center"><div id="lk"></div></div><div class="msg" id="m" style="text-align:center"></div><div id="end"></div>`;
  const o=el.querySelector('#oe');if(o)o.onclick=()=>{el.querySelector('#env').classList.add('open');x.sfx('whoosh');x.bag.add('p_will','وصية الفرعون',W,'✉');setTimeout(()=>{x.st.envOpen=1;x.rerender();},1000);};
  el.querySelector('#lk').innerHTML=x.lockHTML('lkp3',4,{label:'صندوق ختم النوم'});
  x.wireLock('lkp3',4,v=>{if(v===x.gen.box){x.sfx('unlock');el.querySelector('#end').innerHTML=`<svg class="ph-coffin" viewBox="0 0 200 160" aria-hidden="true"><path d="M60 150l-10-90q0-50 50-50t50 50l-10 90z" fill="#e0a530"/><rect x="80" y="40" width="40" height="34" rx="14" fill="#f2c88a"/><g class="sl"><circle cx="100" cy="110" r="16" fill="#3fb6c8"/><text x="100" y="116" text-anchor="middle" font-size="16">𓂀</text></g></svg>`;
    setTimeout(()=>x.voice('الفرعون','«أخيرًا… مين اللي سمح لكم تدخلوا مقبرتي أصلًا؟! اقفلوا الباب وراكم. ومن غير رزع.»',{av:'😴',onClose:()=>x.solve(0)}),1700);return true;}
    x.fail(el.querySelector('#lkp3'),el.querySelector('#m'),'الصندوق ما اتحركش. الفرعون بيكح.');return false;});
}
OE.register({id:'pharaoh',short:'الفرعون',title:'ممنوع إزعاج الفرعون',theme:'pharaoh',color:'#a8741a',
 tagline:'حد لمس التابوت. والفرعون صحي… وهو مش طايق نفسه.',minutes:20,players:'٣–٦ لاعبين',difficulty:3,cover,
 story:`<p>دخلتوا مقبرة قديمة، وحد من الفريق لمس التابوت. فجأة اشتغل إنذار المقبرة وصحي الفرعون… وهو آخر حاجة كان محتاجها حد يصحّيه.</p><p style="margin-top:8px">ختم النوم محبوس في صندوق جوه غرفة العرش. رجّعوه مكانه قبل الوقت ما يخلص.</p>`,
 opening:x=>x.voice('الفرعون','«مين اللي بيخبط؟! أنا نايم من تلات آلاف سنة! قدامكم عشرين دقيقة ترجعوا ختم النوم لمكانه… قبل ما أصحصح وأحكيلكم تاريخ مصر كله!»',{av:'😠',btn:'حاضر'}),
 rooms:[R1,R2,R3], generate,
 winHTML:x=>`<span class="trophy">الفرعون نام</span><h1>ختم النوم رجع مكانه</h1><p class="lead">العدّاد وقف، والإنذار هدي، والمقبرة رجعت ساكتة. ${OE.esc(x.run.team)} خرجوا على أطراف صوابعهم.</p>`,
 loseHTML:()=>`<h1>الفرعون صحصح</h1><p class="lead">«خلاص… طالما صحيتوني، نبدأ من الأسرة الأولى!»</p>`,
});
document.getElementById('game-css').textContent+=css;
})();

/* اجتماع كان ممكن يبقى إيميل */
(function(){
const {esc}=OE;
const css=`
.lap{perspective:1200px}
.lap .lid{background:#22262f;border-radius:16px 16px 6px 6px;padding:14px;transform-origin:bottom center;transition:transform 1.2s cubic-bezier(.3,1.2,.4,1)}
.lap.closed .lid{transform:rotateX(-70deg)}
.lap .scr{border-radius:4px;background:radial-gradient(120% 90% at 80% 10%,#2f5fb8,#0f2a5c);color:#fff;padding:18px;display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center}
.lap .base{height:16px;background:linear-gradient(#c9ced8,#8a93a5);border-radius:0 0 18px 18px;margin:0 -16px}
.photos{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;width:100%;perspective:600px}
.photo{background:#ffffff14;border:1px solid #ffffff40;border-radius:8px;padding:8px 6px 6px;position:relative;animation:flipin .8s both}
.photo:nth-child(2){animation-delay:.12s}.photo:nth-child(3){animation-delay:.24s}.photo:nth-child(4){animation-delay:.36s}
.photo .n{position:absolute;top:4px;inset-inline-start:6px;font-family:var(--f-mono);font-size:.75rem;background:#fff;color:#0f2a5c;border-radius:4px;padding:0 .4em;font-weight:700}
.photo svg{width:100%;max-width:90px;height:auto;display:block;margin:auto}
.lockline{font-family:var(--f-hand);font-size:1.15rem}
.notes{display:flex;gap:14px;flex-wrap:wrap}
.sticky{background:#ffe066;color:#3a2f00;padding:12px 14px;box-shadow:var(--shadow);font-family:var(--f-hand);font-size:1.1rem;flex:1 1 130px;transform:rotate(1.5deg)}
.sticky:nth-child(2){transform:rotate(-2deg)}.sticky.warn{flex-basis:100%;background:#ffd6d6;transform:rotate(-.6deg)}
.mail{display:grid;grid-template-columns:140px minmax(0,1fr);border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow)}
.mail-side{background:color-mix(in srgb,var(--accent) 8%,var(--surface));padding:14px;display:flex;flex-direction:column;gap:6px;font-size:.9rem;border-inline-end:1px solid var(--line)}
.mail-side .on{background:var(--accent);color:var(--accent-ink);font-weight:700;border-radius:6px;padding:.2em .6em}
.mail-body{padding:16px;display:flex;flex-direction:column;gap:12px;min-width:0}
.mi{border:1px solid var(--line);border-radius:10px;padding:14px;background:var(--bg)}
.mi.urgent{border-color:var(--alarm)}
.mh{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:.85rem;color:var(--muted)}
.pill{font-size:.72rem;font-weight:700;padding:0 .6em;border-radius:99px;background:var(--ok);color:#fff}
.pill.red{background:var(--alarm)}
.tray{border:2px dashed var(--line);border-radius:8px;padding:8px 12px;cursor:pointer;background:var(--bg)}
.tray.full{border-style:solid;border-color:var(--ok);color:var(--ok);font-weight:700}
.receipt{background:var(--paper);color:var(--paper-ink);font-family:var(--f-mono);padding:14px 16px;border-radius:3px;box-shadow:var(--shadow);direction:ltr;text-align:left;white-space:pre;overflow-x:auto;max-width:100%;font-size:.88rem;animation:dropin .7s}
.envs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.who{border:1.5px solid var(--line);border-radius:12px;background:var(--surface);padding:14px;display:flex;flex-direction:column;gap:10px}
.who .face{width:46px;height:46px;border-radius:50%;background:var(--hi);color:var(--hi-ink);display:grid;place-items:center;font-family:var(--f-display);font-size:1.3rem}
.who .say{background:var(--bg);border-radius:10px;padding:8px 12px;font-weight:700}
.who.pick{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow)}
.tf{display:flex;gap:6px;font-size:.85rem;align-items:center}
.tf button{border:1.5px solid var(--line);background:var(--bg);border-radius:99px;padding:0 .8em;cursor:pointer}
.tf button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.env3d{perspective:600px;height:70px;display:grid;place-items:center}
.env3d .env{width:100px;height:60px;background:#e9d8b4;position:relative;border-radius:3px;box-shadow:0 4px 10px #0003}
.env3d .flap{position:absolute;top:0;left:0;right:0;height:34px;background:#d8c299;clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:top;transition:transform .9s}
.env3d.open .flap{transform:rotateX(180deg)}
.env3d .keyin{position:absolute;inset:auto 0 6px 0;text-align:center;font-size:1.4rem;opacity:0;transition:opacity .4s .6s, transform .6s .6s}
.env3d.open .keyin{opacity:1;transform:translateY(-34px)}
.digits4{display:flex;gap:10px;direction:ltr;justify-content:center}
.digits4 span{width:52px;height:60px;display:grid;place-items:center;border-radius:8px;background:var(--hi);color:var(--hi-ink);font-family:var(--f-mono);font-weight:700;font-size:1.8rem;box-shadow:var(--shadow);animation:flipin .7s both}
.digits4 span:nth-child(2){animation-delay:.1s}.digits4 span:nth-child(3){animation-delay:.2s}.digits4 span:nth-child(4){animation-delay:.3s}
.stations{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.station{border:1.5px solid var(--line);border-radius:12px;padding:12px;background:var(--surface);display:flex;flex-direction:column;gap:8px}
.station form{display:flex;gap:8px}
.station input{direction:ltr;text-align:center;letter-spacing:.3em;font-family:var(--f-mono)}
.bigcode{font-family:var(--f-mono);font-size:2rem;font-weight:700;letter-spacing:.2em;direction:ltr;display:inline-block;background:var(--ink);color:var(--bg);padding:.1em .6em;border-radius:8px}
.chips{display:flex;gap:8px;flex-wrap:wrap}.chips span{background:var(--bg);border:1px solid var(--line);border-radius:99px;padding:0 .8em;font-size:.9rem}
.boss{max-width:520px;text-align:start}
@media(max-width:700px){.photos{grid-template-columns:repeat(2,minmax(0,1fr))}.mail{grid-template-columns:1fr}.envs,.stations{grid-template-columns:1fr}}
`;
const sv=(i,vb='0 0 100 70')=>`<svg viewBox="${vb}" aria-hidden="true">${i}</svg>`;
const ART={
  car:sv('<path d="M8 10h84" stroke="#ffffff55" stroke-width="3"/><path d="M18 46l6-14h40l10 14z" fill="#ffd84d"/><rect x="12" y="44" width="72" height="12" rx="4" fill="#ffd84d"/><circle cx="28" cy="58" r="6" fill="#111"/><circle cx="68" cy="58" r="6" fill="#111"/><rect x="30" y="35" width="14" height="9" fill="#9cc4ff"/><rect x="48" y="35" width="14" height="9" fill="#9cc4ff"/>'),
  elev:sv('<rect x="25" y="6" width="50" height="60" rx="3" fill="#c9ced8"/><rect x="29" y="14" width="20" height="50" fill="#8a93a5"/><rect x="51" y="14" width="20" height="50" fill="#8a93a5"/><rect x="38" y="2" width="24" height="9" rx="2" fill="#111"/><path d="M50 4l-4 5h8z" fill="#5af08e"/>'),
  desk:sv('<rect x="10" y="34" width="80" height="6" fill="#c08a55"/><rect x="14" y="40" width="5" height="26" fill="#8a5a34"/><rect x="81" y="40" width="5" height="26" fill="#8a5a34"/><rect x="36" y="12" width="30" height="20" rx="2" fill="#2f5fb8"/><path d="M30 66c0-16 20-16 20 0" fill="#555"/>'),
  drawer:sv('<rect x="20" y="8" width="60" height="58" rx="3" fill="#8a93a5"/><rect x="25" y="13" width="50" height="15" fill="#c9ced8"/><rect x="25" y="31" width="50" height="15" fill="#c9ced8"/><rect x="18" y="49" width="64" height="15" fill="#e6e9ee" stroke="#555"/><rect x="30" y="44" width="40" height="7" fill="#fff"/>'),
  holder:sv('<rect x="20" y="20" width="60" height="40" rx="6" fill="#5d6678"/><rect x="28" y="10" width="44" height="30" rx="4" fill="#ffd84d" transform="rotate(-6 50 25)"/>'),
  book:sv('<rect x="22" y="8" width="56" height="56" rx="3" fill="#2350c8"/><rect x="28" y="16" width="44" height="6" fill="#fff" opacity=".8"/><rect x="28" y="28" width="30" height="3" fill="#fff" opacity=".5"/>'),
  sign:sv('<rect x="15" y="22" width="70" height="26" rx="3" fill="#c9a43c"/><rect x="20" y="27" width="60" height="16" fill="#e8c86a"/>'),
  bin:sv('<path d="M30 20h40l-5 46H35z" fill="#8a93a5"/><rect x="26" y="14" width="48" height="7" rx="2" fill="#5d6678"/><path d="M42 18l6-8 6 8" fill="#fff"/>'),
  phone:sv('<rect x="38" y="8" width="26" height="52" rx="5" fill="#1c2230"/><rect x="41" y="13" width="20" height="38" fill="#2f5fb8"/><path d="M51 60v8" stroke="#555" stroke-width="3"/>'),
  mug:sv('<path d="M32 22h30v36a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6z" fill="#d7263d"/><path d="M62 30h6a8 8 0 0 1 0 16h-6" fill="none" stroke="#d7263d" stroke-width="5"/>'),
  paper:sv('<rect x="22" y="8" width="56" height="56" rx="3" fill="#8a93a5"/><rect x="28" y="20" width="44" height="34" fill="#fff"/>'),
  board:sv('<rect x="10" y="8" width="80" height="54" rx="3" fill="#b5835a"/><rect x="18" y="16" width="22" height="18" fill="#ffe066" transform="rotate(-5 29 25)"/><rect x="48" y="14" width="30" height="22" fill="#fff"/>'),
  file:sv('<path d="M20 14h24l6 6h30v42H20z" fill="#d7263d"/><rect x="26" y="26" width="48" height="30" fill="#fff" opacity=".9"/>'),
  cooler:sv('<rect x="38" y="4" width="24" height="22" rx="8" fill="#9cc4ff"/><rect x="34" y="26" width="32" height="42" rx="3" fill="#e6e9ee" stroke="#8a93a5"/>'),
  printer:sv('<rect x="18" y="26" width="64" height="30" rx="4" fill="#5d6678"/><rect x="28" y="12" width="44" height="16" fill="#fff"/><rect x="28" y="52" width="44" height="12" fill="#fff"/>'),
};
const cover=`<svg viewBox="0 0 200 200" aria-hidden="true"><rect x="30" y="40" width="140" height="92" rx="8" fill="#22262f"/><rect x="40" y="50" width="120" height="72" rx="3" fill="#2f5fb8"/><rect x="18" y="132" width="164" height="12" rx="6" fill="#c9ced8"/><circle cx="100" cy="78" r="14" fill="#ffffff33"/><rect x="74" y="98" width="52" height="9" rx="4" fill="#ffffff55"/><g transform="translate(120 20) rotate(12)"><rect width="56" height="38" rx="3" fill="#ffe066"/><path d="M0 0l28 20 28-20" fill="none" stroke="#c9a43c" stroke-width="3"/></g><text x="100" y="178" text-anchor="middle" font-size="22" fill="#fff" font-family="IBM Plex Mono">Re: Re: Fwd</text></svg>`;

const FLW=['','الأول','التاني','التالت','الرابع','الخامس','السادس','السابع','التامن','التاسع'];
const BR=['أرض الجولف','المعادي','المهندسين'],DP=['المشروعات','الحسابات','الموارد البشرية'],DV=['A','B','C'];
const PN={omar:'عمر',salma:'سلمى',ziad:'زياد'};
function generate(){
  const R=OE.RND,[a,b,c,d]=R.digits(4,1,9),oth=R.shuffle([1,2,3,4,5,6,7,8,9].filter(n=>![a,b,c,d].includes(n)));
  const fl=R.shuffle([1,2,3,4,5,6,7,8,9].filter(n=>n!==b)).slice(0,2);
  const fax={br:R.digits(3,10,99),dp:R.digits(3,10,99),dv:R.digits(3,10,99),bi:R.int(0,2),di:R.int(0,2),vi:R.int(0,2)};
  const [X,Y,Z]=R.shuffle(['omar','salma','ziad']);
  const digs=[a,b,c,d],mx=Math.max(...digs),pos=R.shuffle([0,1,2,3]),[u,v,w]=R.shuffle(digs.filter(n=>n!==mx)),t=[];
  t[pos[0]]=mx;t[pos[1]]=u;t[pos[2]]=v;t[pos[3]]=w;
  const rules=R.shuffle([`الخانة ${pos[0]+1} فيها أكبر رقم من الأربعة.`,`مجموع الخانة ${pos[1]+1} والخانة ${pos[2]+1} يساوي ${u+v}.`,`رقم الخانة ${pos[1]+1} ${u<v?'أصغر':'أكبر'} من رقم الخانة ${pos[2]+1}.`]);
  return {pw:''+a+b+c+d,a,b,c,d,visitor:oth[0],dr:[oth[1],oth[2]],fl,fax,faxAns:''+fax.br[fax.bi]+fax.dp[fax.di]+fax.dv[fax.vi],key:{X,Y,Z},race:{digs:R.shuffle(digs),rules,ans:t.join('')}};
}
function spots(el,list,x,onFind){
  list=OE.trim(list,x);
  el.innerHTML=`${OE.sceneOpen('bg-office',list,x)}${list.map((s,i)=>`<button style="${OE.slot(i,list.length)}" class="spot ${x.st['f_'+s.id]?(s.card?'found':'empty'):''}" type="button" data-s="${s.id}"><span class="art">${OE.art(s.art)}</span><span class="lbl">${s.label}</span></button>`).join('')}</div>`;
  el.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{const s=list.find(z=>z.id===b.dataset.s);
    if(s.card){x.sfx('find');x.bag.add(s.id,s.cardTitle,s.card,s.icon||'✦');if(!x.st['f_'+s.id]){x.st['f_'+s.id]=1;x.save();b.classList.add('found');}x.bag.open(s.id);}
    else{x.sfx('click');x.toast(s.empty||'مفيش حاجة هنا.');x.st['f_'+s.id]=1;x.save();b.classList.add('empty');}
    onFind&&onFind();});
}

/* ---------- rooms ---------- */
const R1={key:'r1',title:'مكتب مروان',short:'المكتب',goal:'لابتوب مروان مقفول. افتحوه.',
 hints:['مروان مش بيكتب الباسورد. بيكتب يومه.',
  'كل صورة على شاشة القفل ليها حاجة في المكتب. مش كل رقم في المكتب بتاع مروان.',
  {prism:['أركن','أطلع','أقعد','أفتح'],text:'أربع أفعال، أربع حاجات في الأوضة، أربع أرقام. الزوار مش مروان.'}],
 render(el,x){
  if(x.st.unlocked)return mail(el,x);
  el.innerHTML=`<div class="notes"><div class="sticky">اشحن الموبايل</div><div class="sticky">متنساش الكارت</div><div class="sticky">ابعت الميل!!</div><div class="sticky warn">لو نسيت الباسورد، يومك كله قدامك.</div></div>
  <div class="lap" id="lap"><div class="lid"><div class="scr" id="scr">
    <div class="photos"><div class="photo"><span class="n">1</span>${ART.car}</div><div class="photo"><span class="n">2</span>${ART.elev}</div><div class="photo"><span class="n">3</span>${ART.desk}</div><div class="photo"><span class="n">4</span>${ART.drawer}</div></div>
    <p class="lockline">"الباسورد ٤ أرقام. أركن، أطلع، أقعد، أفتح الدرج. رقم كل مكان، بنفس الترتيب، ومن غير حروف."</p>
    <div id="lk"></div><div class="msg" id="m"></div></div></div><div class="base"></div></div>
  <div><b>المكتب</b><p class="muted" style="font-size:.9rem">دوسوا على أي حاجة تبصّوا عليها.</p></div><div id="sc"></div>`;
  el.querySelector('#lk').innerHTML=x.lockHTML('lk1',4);
  spots(el.querySelector('#sc'),[
   {id:'o_cards',label:'حافظة الكروت',art:ART.holder,cardTitle:'كارت جراج',icon:'🅿',card:`<div class="card"><table><tr><td>كارت جراج الموظفين</td><td></td></tr><tr><td>الاسم</td><td>مروان</td></tr><tr><td>المكان</td><td class="mono ltr">P${x.gen.a}</td></tr></table></div>`},
   {id:'o_bin',label:'سلة المهملات',art:ART.bin,cardTitle:'تذكرة جراج قديمة',icon:'🎫',card:`<div class="card"><table><tr><td>تذكرة زائر</td><td></td></tr><tr><td>المكان</td><td class="mono ltr">P${x.gen.visitor}</td></tr><tr><td>التاريخ</td><td>الشهر اللي فات</td></tr></table></div>`},
   {id:'o_dir',label:'كومة ملفات',art:ART.book,cardTitle:'دليل المبنى',icon:'🏢',card:`<div class="card"><table><tr><td>الاستقبال</td><td>الأرضي</td></tr>${x.shuffle([['الحسابات',x.gen.fl[0]],['المشروعات · مروان',x.gen.b],['الموارد البشرية',x.gen.fl[1]]]).sort((p,q)=>p[1]-q[1]).map(r=>`<tr><td>${r[0]}</td><td>${FLW[r[1]]}</td></tr>`).join('')}</table></div>`},
   {id:'o_plate',label:'طرف المكتب',art:ART.sign,cardTitle:'لوحة المكتب',icon:'🪧',card:`<div class="card" style="text-align:center"><span class="mono" style="background:#c9a43c;color:#2a1d00;padding:.2em .8em;border-radius:4px;font-weight:700;font-size:1.3rem">DESK ${x.gen.c}</span></div>`},
   {id:'o_drawers',label:'أدراج المكتب',art:ART.drawer,cardTitle:'الأدراج',icon:'🗄',card:`<div class="card"><table>${[['درج الشواحن',x.gen.dr[0]],['درج الملفات',x.gen.dr[1]],['درج الأوراق',x.gen.d]].sort((p,q)=>p[1]-q[1]).map(r=>`<tr><td>${r[0]}</td><td class="mono">${r[1]}</td></tr>`).join('')}</table></div>`},
   {id:'o_phone',label:'الموبايل',art:ART.phone,empty:'الموبايل فاصل شحن. زي ما الورقة قالت.'},
   {id:'o_mug',label:'كوباية',art:ART.mug,empty:'قهوة باردة من امبارح.'},
   {id:'o_cool',label:'كولدير',art:ART.cooler,empty:'مية. بس.'},
  ],x);
  x.wireLock('lk1',4,v=>{if(v===x.gen.pw){x.good(el.querySelector('#m'),'اتفتح...');x.sfx('unlock');setTimeout(()=>{x.st.unlocked=1;x.rerender();},800);return true;}x.fail(el.querySelector('#scr'),el.querySelector('#m'),'الباسورد غلط.');return false;});
 }};
const dest=x=>`الجهة: إدارة ${DP[x.gen.fax.di]}، فرع ${BR[x.gen.fax.bi]}، جهاز الفاكس ${DV[x.gen.fax.vi]}.`;
function mail(el,x){
  el.innerHTML=`<div class="mail flipin"><nav class="mail-side"><span class="on">الوارد (1)</span><span>المرسل</span><span>مسودات (14)</span></nav><div class="mail-body">
    <article class="mi"><div class="mh"><span>من: مروان ← الإدارة</span><span class="pill">اتبعت</span></div><b>الملف النهائي</b><p class="muted">FINAL_final_v3.pdf</p></article>
    <article class="mi urgent"><div class="mh"><span>Re: الملف النهائي</span><span class="pill red">مطلوب فاكس</span></div>
    <p>شكرًا، استلمنا الميل. برجاء إرسال نسخة من الميل والمرفق بالفاكس للاعتماد.</p><p style="margin-top:6px">${dest(x)}</p><p class="muted" style="margin-top:6px">دليل الأرقام موجود في غرفة الفاكس.</p></article></div></div>
  <div class="row"><button class="btn big" id="pr" type="button">خدوا المستند من صينية الطباعة</button></div>`;
  x.bag.add('o_reply','رد الإدارة','<div class="card"><p>شكرًا، استلمنا الميل. برجاء إرسال نسخة من الميل والمرفق بالفاكس للاعتماد.</p><p style="margin-top:6px">'+dest(x)+'</p></div>','✉');
  el.querySelector('#pr').onclick=()=>{x.bag.add('o_doc','المستند المطبوع','<div class="card">نسخة مطبوعة من الميل والمرفق. ٢ صفحة.</div>','📄');x.solve(300);};
}
const R2={key:'r2',title:'غرفة الفاكس',short:'الفاكس',goal:'ابعتوا المستند للجهة الصح.',
 hints:['الرد على الميل قال رايح فين بالظبط. ارجعوله من الحقيبة.',
  'الملصق على الماكينة بيقول الترتيب. محدش قال اجمعوا.',
  {prism:['فرع','إدارة','جهاز','٦'],text:'ست خانات = تلات أجزاء، كل جزء من دليل مختلف في الأوضة.'}],
 render(el,x){
  if(x.st.sent)return sent(el,x);
  el.innerHTML=`<div class="sticky" style="max-width:260px;flex:none">آه، إحنا لسه بنستخدم فاكس.</div>
  <div id="sc"></div>
  <div class="row" style="align-items:flex-start;gap:20px">
   <div class="stack" style="gap:10px;flex:1;min-width:220px"><div class="card tape"><b>ملصق على الجهاز</b><p>كود الفرع، ثم كود الإدارة، ثم كود الجهاز. اكتبهم وراء بعض، من غير جمع حسابي.</p></div>
   <button class="tray ${x.st.tray?'full':''}" id="tray" type="button">${x.st.tray?'المستند في صينية الإرسال':'صينية الإرسال فاضية'}</button><div class="msg" id="m"></div></div>
   <div id="lk"></div></div>`;
  el.querySelector('#lk').innerHTML=x.lockHTML('lk2',6,{label:'رقم الوجهة'});
  spots(el.querySelector('#sc'),[
   {id:'o_br',label:'درج الاستقبال',art:ART.paper,cardTitle:'دليل الفروع',icon:'🏬',card:`<div class="card"><table>${BR.map((n,i)=>`<tr><td>${n}</td><td class="mono">${x.gen.fax.br[i]}</td></tr>`).join('')}</table></div>`},
   {id:'o_dp',label:'لوحة الملاحظات',art:ART.board,cardTitle:'دليل الإدارات',icon:'📌',card:`<div class="card"><table>${DP.map((n,i)=>`<tr><td>${n}</td><td class="mono">${x.gen.fax.dp[i]}</td></tr>`).join('')}</table></div>`},
   {id:'o_dv',label:'ملف الصيانة',art:ART.file,cardTitle:'ورقة الأجهزة',icon:'🔧',card:`<div class="card"><table>${DV.map((n,i)=>`<tr><td>${n}</td><td class="mono">${x.gen.fax.dv[i]}</td></tr>`).join('')}</table></div>`},
   {id:'o_pr2',label:'الطابعة',art:ART.printer,empty:'فاضية. الورق خلص من سنة.'},
   {id:'o_cl2',label:'كولدير',art:ART.cooler,empty:'حد كاتب عليه: "ممنوع الفاكس جنب المية".'},
   {id:'o_bin2',label:'سلة',art:ART.bin,empty:'إيصالات فاكس قديمة كلها "فشل".'},
  ],x);
  el.querySelector('#tray').onclick=()=>{if(!x.bag.has('o_doc')){x.toast('مفيش مستند معاكم.');return;}x.st.tray=1;x.sfx('click');x.rerender();};
  x.wireLock('lk2',6,v=>{const m=el.querySelector('#m');if(!x.st.tray){x.fail(el.querySelector('#tray'),m,'الصينية فاضية.');return false;}
    if(v===x.gen.faxAns){x.good(m,'جاري الإرسال...');setTimeout(()=>{x.st.sent=1;x.rerender();},900);return true;}x.fail(el.querySelector('#lk2'),m,'الرقم ده مش بتاع الجهة المطلوبة.');return false;});
 }};
function sent(el,x){
  el.innerHTML=`<div class="receipt">TRANSMISSION REPORT\n------------------------\nPAGES   : 2\nTIME    : ${x.clockTime(Date.now())}\nRESULT  : OK</div>
  <article class="mi urgent flipin"><div class="mh"><span>مندوب الإدارة</span><span class="pill red">اجتماع · الآن</span></div><p>تم استلام الفاكس. برجاء حضور اجتماع فوري في الميتينج روم لمناقشة الميل.</p></article>
  <div class="row"><button class="btn big" id="go" type="button">على الميتينج روم</button></div>`;
  el.querySelector('#go').onclick=()=>x.solve(200);
}
const R3A={key:'r3a',title:'الميتينج روم: المفتاح مع مين؟',short:'الميتينج',goal:'الباب مقفول والمفتاح مع واحد من التلاتة. اثبتوا مين قبل ما تفتحوا أي مظروف.',
 hints:['إفادة واحدة بس صح. مش اتنين، ومش ولا واحدة.','افترضوا. لكل افتراض عدّوا الإفادات الصح.',
  {prism:['عمر؟','سلمى؟','زياد؟','= ١'],text:'جرّبوا كل اسم من التلاتة، وعدّوا الإفادات الصح في كل مرة.'}],
 render(el,x){
  const K=x.gen.key,say=id=>id===K.X?'المفتاح مع '+PN[K.Y]:id===K.Y?'المفتاح مش معايا':'المفتاح مش مع '+PN[K.X];
  const P=['omar','salma','ziad'].map((id,i)=>({id,n:PN[id],s:say(id),p:i}));
  x.st.tf=x.st.tf||{};
  el.innerHTML=`<div class="card"><b>تقرير العهدة</b><p>المفتاح مش ضايع؛ عهدة مع واحد من التلاتة اللي معاهم مظاريف. ملحوظة: إفادة واحدة فقط من الإفادات التلاتة صحيحة.</p><p class="muted" style="margin-top:6px">المظروف مش هيتفتح غير لما تقدموا استنتاج كامل: صاحب المفتاح، وكل إفادة صح ولا غلط.</p></div>
  <div class="envs">${P.map(p=>`<div class="who ${x.st.pick===p.id?'pick':''}"><div class="row"><span class="face">${p.n[0]}</span><div><b>${p.n}</b>${x.player(p.p,'')?`<div class="muted" style="font-size:.8rem">بيلعبه: ${esc(x.player(p.p,''))}</div>`:''}</div></div>
    <div class="say">"${p.s}"</div>
    <div class="tf"><span class="muted">الإفادة:</span><button type="button" data-t="${p.id}" data-v="1" aria-pressed="${x.st.tf[p.id]===1}">صح</button><button type="button" data-t="${p.id}" data-v="0" aria-pressed="${x.st.tf[p.id]===0}">غلط</button></div>
    <div class="env3d" id="env_${p.id}"><div class="env"><div class="flap"></div><div class="keyin">🔑</div></div></div>
    <button class="btn ${x.st.pick===p.id?'':'ghost'}" type="button" data-p="${p.id}">المفتاح مع ${p.n}</button></div>`).join('')}</div>
  ${x.player(3,'')?`<p class="muted">${esc(x.player(3,''))} بينسّق الاستنتاج.</p>`:''}
  <div class="row"><button class="btn big" id="sub" type="button">قدّموا الاستنتاج وافتحوا المظروف</button><span class="muted" style="font-size:.85rem">استنتاج غلط = ٣٠ ثانية خصم</span></div><div class="msg" id="m"></div>`;
  el.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{x.st.tf[b.dataset.t]=+b.dataset.v;x.rerender();});
  el.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{x.st.pick=b.dataset.p;x.rerender();});
  el.querySelector('#sub').onclick=()=>{const m=el.querySelector('#m');
    if(!x.st.pick||P.some(p=>x.st.tf[p.id]===undefined)){x.fail(null,m,'الاستنتاج ناقص: اختاروا صاحب المفتاح وقيّموا التلات إفادات.');return;}
    if(x.st.pick===K.X&&x.st.tf[K.X]===0&&x.st.tf[K.Y]===1&&x.st.tf[K.Z]===0){const e=el.querySelector('#env_'+x.st.pick);e.classList.add('open');x.sfx('unlock');x.good(m,'المفتاح جوه!');x.solve(1800);}
    else{x.run.pen+=30;x.save();x.fail(el.querySelector('.envs'),m,'المشغّل رفض الاستنتاج. راجعوا كل إفادة على افتراضكم.');}
  };
 }};
const rulesHTML=r=>`<div class="card"><b>باسورد الاجتماع</b><p class="muted" style="margin-bottom:8px">نفس أرقام لابتوب مروان، بترتيب جديد. الخانة ١ هي أول رقم تكتبوه:</p><div class="digits4">${r.digs.map(d=>`<span>${d}</span>`).join('')}</div>
<ol style="margin:12px 0 0;padding-inline-start:1.3em"><li>استخدم كل رقم مرة واحدة.</li>${r.rules.map(t=>`<li>${t}</li>`).join('')}</ol></div>`;
const R3B={key:'r3b',title:'الميتينج روم: أول واحد يعمل Join يكسب',short:'السباق',goal:'التعاون خلص. كل واحد لوحده. أول Join صحيح يكسب.',
 hints:['قاعدة واحدة من الأربعة بتثبت خانة كاملة لوحدها.','في قاعدة بتقول مجموع خانتين. رقمين بس من الباقيين يدّوا المجموع ده.',{prism:['أكبر','؟+؟','< >','١ باقي'],text:'بعد ما تثبتوا تلات خانات، الرقم الباقي ملوش غير مكان واحد.'}],
 render(el,x){
  const names=[0,1,2,3].map(i=>x.player(i,'لاعب '+(i+1)));
  const remote=OE.RACE.available();
  el.innerHTML=`${rulesHTML(x.gen.race)}
  ${remote?`<div class="panel stack" style="gap:10px"><b>ادخلوا من موبايلاتكم</b><p>افتحوا نفس اللينك على الموبايل، دوسوا "أنا لاعب" تحت في صفحة اللعبة، واكتبوا الكود:</p><span class="bigcode">${x.run.code}</span><div class="chips" id="joined"><span class="muted">لسه محدش دخل...</span></div></div>`:''}
  <b>${remote?'أو من الشاشة دي':'محطات الدخول'}</b>
  <div class="stations">${names.map((n,i)=>`<div class="station"><b>${esc(n)}</b><form data-i="${i}" autocomplete="off"><input class="field" id="st${i}" inputmode="numeric" maxlength="4" aria-label="باسورد ${esc(n)}" placeholder="••••"><button class="btn" type="submit">Join</button></form><div class="msg" id="stm${i}"></div></div>`).join('')}</div>`;
  const rj=()=>{const j=el.querySelector('#joined');if(j)j.innerHTML=OE.RACE.joined.length?OE.RACE.joined.map(n=>`<span>${esc(n)}</span>`).join(''):'<span class="muted">لسه محدش دخل...</span>';};
  OE.RACE.onJoined=rj;rj();
  el.querySelectorAll('.station form').forEach(f=>f.onsubmit=async e=>{e.preventDefault();const i=+f.dataset.i,m=el.querySelector('#stm'+i);
    if(x.digits(el.querySelector('#st'+i).value)!==x.gen.race.ans){x.fail(f,m,'غلط.');return;}
    const r=await OE.RACE.claim(names[i]);if(r.won)x.win(names[i]);else{m.textContent='سبقك '+(r.by||'حد');m.className='msg err';}});
 }};

/* ---------- phone station (#join) ---------- */
const J={code:'',name:'',stage:'',last:false,hints:0,winner:'',subs:[],sub:false,iWon:false,race:null};
try{const j=JSON.parse(sessionStorage.getItem('oe-join')||'null');if(j){J.code=j.code;J.name=j.name;}}catch(e){}
OE.RACE.renderJoin=function(){
  const app=document.getElementById('app'), D=OE.DBX;
  document.documentElement.dataset.g='office';
  const back=`<a href="#g-office" class="btn ghost sm">رجوع</a>`;
  if(D.state==='off'){app.innerHTML=`<section class="stack scene-in"><h2>محطة لاعب</h2><div class="board-empty">محطة الموبايل محتاجة لينك Claude وتسجيل دخول. ادخلوا من الشاشة الرئيسية.</div>${back}</section>`;return;}
  if(!D.db){app.innerHTML=`<section class="stack"><h2>محطة لاعب</h2><p class="muted">بنجهّز المحطة...</p></section>`;return;}
  if(!J.sub){
    app.innerHTML=`<section class="stack scene-in"><span class="eyebrow">اجتماع كان ممكن يبقى إيميل · سباق</span><h2>ادخل السباق</h2>
    <form class="panel stack" id="jf" autocomplete="off"><label for="jc" class="stack" style="gap:6px">كود اللعبة<input class="field mono" id="jc" maxlength="4" style="direction:ltr;text-align:center;letter-spacing:.3em;text-transform:uppercase" value="${esc(J.code)}"></label>
    <label for="jn" class="stack" style="gap:6px">اسمك<input class="field" id="jn" maxlength="20" value="${esc(J.name)}"></label><button class="btn big" type="submit">ادخل</button><div class="msg err" id="jm"></div></form>${back}</section>`;
    document.getElementById('jf').onsubmit=async e=>{e.preventDefault();
      const code=document.getElementById('jc').value.trim().toUpperCase().replace(/[^A-Z0-9]/g,''),name=document.getElementById('jn').value.trim();
      if(code.length!==4||!name){document.getElementById('jm').textContent='اكتب الكود واسمك.';return;}
      const g=await D.db.doc('games/'+code).get().catch(()=>null);
      if(!g||!g.exists){document.getElementById('jm').textContent='مفيش لعبة بالكود ده.';return;}
      J.code=code;J.name=name;try{sessionStorage.setItem('oe-join',JSON.stringify({code,name}))}catch(e){}
      try{await D.db.doc('games/'+code+'/players/'+OE.TAB).set({name});}catch(e){}
      J.sub=true;
      J.subs.push(D.db.doc('games/'+code).onSnapshot(s=>{if(s.exists){const d=s.data();J.last=!!d.last;J.hints=d.hints|0;J.race=d.race||null;}OE.RACE.renderJoin();},()=>{}));
      J.subs.push(D.db.doc('games/'+code+'/meta/winner').onSnapshot(s=>{J.winner=s.exists?s.data().name||'':'';OE.RACE.renderJoin();},()=>{}));
      OE.RACE.renderJoin();};
  }else if(J.winner){
    app.innerHTML=`<section class="end scene-in">${J.iWon?`<span class="trophy">كسبت!</span><h1>أسرع واحد دخل اجتماع كان ممكن يبقى إيميل</h1>`:`<h1>${esc(J.winner)} سبقك</h1><p class="lead">موضوع الاجتماع: التأكد من وصول الميل.</p>`}</section>`;
  }else if(!J.last||!J.race){
    app.innerHTML=`<section class="stack scene-in"><span class="eyebrow">كود ${esc(J.code)} · ${esc(J.name)}</span><h2>إنت جوه. استنى.</h2><p class="lead">أول ما الفريق يوصل الميتينج روم، السباق هيظهر هنا.</p></section>`;
  }else{
    const prev=document.getElementById('jp')?.value||'';
    app.innerHTML=`<section class="stack scene-in"><span class="eyebrow">كود ${esc(J.code)} · ${esc(J.name)}</span><h2>السباق بدأ!</h2>${rulesHTML(J.race)}
      ${R3B.hints.slice(0,J.hints).map(h=>`<div class="card" style="background:color-mix(in srgb,var(--hi) 25%,var(--surface));color:var(--ink)">${typeof h==='string'?h:h.text}</div>`).join('')}
      <form class="row" id="jpf" autocomplete="off"><input class="field" id="jp" inputmode="numeric" maxlength="4" style="flex:1;direction:ltr;text-align:center;letter-spacing:.4em;font-family:var(--f-mono);font-size:1.4rem" placeholder="••••" aria-label="باسورد"><button class="btn big" type="submit">Join</button></form><div class="msg" id="jpm"></div></section>`;
    document.getElementById('jp').value=prev;
    document.getElementById('jpf').onsubmit=async e=>{e.preventDefault();
      if(OE.H(OE.digits(document.getElementById('jp').value)+'|'+J.code)!==J.race.h){OE.sfx('bad');document.getElementById('jpm').textContent='غلط.';document.getElementById('jpm').className='msg err';return;}
      const r=await OE.RACE.claim(J.name,J.code);J.iWon=r.won;if(!r.won)J.winner=r.by||'حد تاني';OE.RACE.renderJoin();};
  }
};

OE.register({id:'office',short:'الإيميل',title:'اجتماع كان ممكن يبقى إيميل',theme:'office',color:'#2350c8',
 tagline:'لابتوب مقفول، فاكس من الثمانينات، واجتماع مالوش لازمة.',minutes:20,players:'٤ لاعبين',difficulty:3,cover,
 story:`<p>مروان غايب النهارده، وفي تاسك لازم يتقفل قبل نهاية الروند: ابعتوا الملف النهائي من الإيميل الموجود على لابتوبه.</p><p style="margin-top:8px">الجهاز مقفول، لكن مروان بينسى الباسورد كل شوية، فسايب تذكيرات على شاشة القفل. قدامكم ٢٠ دقيقة.</p>`,
 setupHTML:()=>`<div class="stack" style="gap:8px"><span style="font-weight:500">النهاية</span><div class="modes">
   <label class="mode"><input type="radio" name="omode" value="a" checked><span><b>المفتاح مع مين؟ · تعاون</b><span class="muted">الفريق كله يدخل مع بعض.</span></span></label>
   <label class="mode"><input type="radio" name="omode" value="b"><span><b>أول واحد يعمل Join يكسب · منافسة</b><span class="muted">أول غرفتين تعاون، والأخيرة سباق فردي.</span></span></label></div>
   <a href="#join" class="muted" style="font-size:.9rem">أنا لاعب في السباق، عايز أدخل من موبايلي</a></div>`,
 readSetup:()=>({mode:(document.querySelector('input[name=omode]:checked')||{}).value||'a'}),
 isRace:o=>o.mode==='b', generate,
 raceInfo:(S,H)=>({digs:S.gen.race.digs,rules:S.gen.race.rules,h:H(S.gen.race.ans+'|'+S.code)}),
 roomsFor:o=>[R1,R2,o.mode==='b'?R3B:R3A], rooms:[R1,R2,R3A],
 winHTML:x=>`${x.run.winner?`<span class="trophy">${esc(x.run.winner)}</span><h1>أسرع واحد دخل اجتماع كان ممكن يبقى إيميل</h1>`:`<span class="trophy">الأربعة دخلوا مع بعض</span><h1>${esc(x.run.team)} لحقوا الاجتماع</h1>`}
   <div class="mi boss"><div class="mh"><span>المدير</span><span>موضوع الاجتماع</span></div><p>"شكرًا إنكم جيتوا. كنت عايز أتأكد إن الميل وصل."</p></div><h2>اجتماع كان ممكن يبقى إيميل</h2>`,
 loseHTML:x=>`<h1>الوقت خلص</h1><p class="lead">الاجتماع بدأ من غيركم، والمدير بيسأل: "حد يعرف الميل وصل ولا لأ؟"</p>`,
});
document.getElementById('game-css').textContent+=css;
})();

/* لعنة الكاهن الأخير */
(function(){
const css=`
.pr-hall{background:radial-gradient(120% 80% at 50% 0,#1d3a30,#0b1210);border:2px solid #2a3d36;border-radius:16px;padding:16px;position:relative;overflow:hidden}
.pr-hall::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),transparent 0,#0000 30%,#000a 75%);pointer-events:none}
.pr-door{height:46px;border-radius:30px 30px 0 0;background:linear-gradient(#2a3d36,#14201c);border:2px solid #7be0b055;display:grid;place-items:center;color:#7be0b0;font-weight:700;margin:0 auto 10px;width:min(320px,80%);transition:box-shadow .6s}
.pr-door.open{box-shadow:0 0 30px #7be0b0;background:linear-gradient(#7be0b0,#1d3a30);color:#06150f}
.pr-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;direction:ltr;perspective:900px;max-width:460px;margin:auto;transform:rotateX(18deg);transform-origin:center bottom}
.pr-tile{aspect-ratio:1;border-radius:6px;border:1px solid #2a3d36;background:linear-gradient(135deg,#5a5547,#3c382e);cursor:pointer;display:grid;place-items:center;padding:4px;transition:transform .2s,box-shadow .3s}
.pr-tile:hover{transform:translateZ(8px);box-shadow:0 0 0 2px #c9a0ff88}
.pr-tile svg{width:100%;height:100%}
.pr-tile.on{box-shadow:0 0 0 3px #7be0b0,0 0 18px #7be0b0;background:linear-gradient(135deg,#2f6b55,#1d3a30)}
.pr-tile.safe{box-shadow:0 0 0 3px #c9a0ff,0 0 18px #c9a0ff}
.pr-tile.bad{animation:shake .4s;background:#7a1f1f}
.pr-start{font-size:.75rem;color:#c9a0ff;text-align:center;margin-top:8px}
.pr-flash{animation:prflash .6s}
@keyframes prflash{30%{box-shadow:inset 0 0 80px #ff2a2a}}
.pr-jars{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;direction:ltr;perspective:700px}
.pr-jar{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;background:none;border:0;color:inherit}
.pr-jar svg{width:100%;max-width:100px;transition:transform .5s}
.pr-jar:hover svg{transform:rotateY(25deg) rotateZ(-6deg)}
.pr-board{display:grid;gap:8px}
.pr-board label{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#14201c;border:1px solid #2a3d36;border-radius:10px;padding:8px 12px}
.pr-board select{background:#0b1210;color:#e3efe6;border:1px solid #7be0b0;border-radius:8px;font-family:var(--f-mono);font-size:1.1rem;padding:.15em .4em}
.pr-bowl{display:block;margin:auto;max-width:180px}
.pr-bowl .liq{transition:fill 1s,filter 1s;fill:#1d3a30}
.pr-bowl.lit .liq{fill:#c9a0ff;filter:drop-shadow(0 0 12px #c9a0ff)}
.pr-uv{background:#14201c;border:2px solid #2a3d36;border-radius:12px;padding:18px;text-align:center;font-family:var(--f-hand);font-size:1.25rem;line-height:2;color:#0000;transition:color 2s,text-shadow 2s}
.pr-uv.lit{color:#e9dcff;text-shadow:0 0 14px #c9a0ff}
.pr-wall{background:linear-gradient(#3c382e,#2a2620);border-radius:12px;padding:20px;border:2px solid #5a5547}
.pr-line{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:flex-end;margin-bottom:12px;font-family:var(--f-display);font-size:1.3rem;color:#d9cfb4}
.pr-slot{min-width:96px;border:0;border-bottom:3px dashed #7be0b088;background:none;color:#e3efe6;cursor:pointer;display:flex;flex-direction:column;align-items:center;padding:2px 6px;font:inherit}
.pr-slot .pat{font-size:.95rem;color:#93ab9e;letter-spacing:.06em}
.pr-slot .w{min-height:1.6em;color:#7be0b0}
.pr-slot.sel{border-bottom-color:#c9a0ff;background:#c9a0ff22;border-radius:6px 6px 0 0}
.pr-frags{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.pr-frag{background:#d9cfb4;color:#2a2416;border:0;border-radius:3px;padding:.3em .8em;font-family:var(--f-display);font-size:1.05rem;cursor:pointer;transform:rotate(var(--r,0deg));box-shadow:0 3px 6px #0006;transition:transform .2s}
.pr-frag:hover{transform:rotate(0) translateY(-3px)}
.pr-frag.used{opacity:.25;cursor:default}
.pr-seal{display:block;margin:auto;max-width:170px}
.pr-seal .ring{fill:none;stroke:#2a3d36;stroke-width:6;transition:stroke 1.5s,filter 1.5s}
.pr-seal.lit .ring{stroke:#7be0b0;filter:drop-shadow(0 0 14px #7be0b0)}
.pr-seal.flick .ring{animation:flick .7s}
@keyframes flick{30%{stroke:#7be0b0}60%{stroke:#2a3d36}}
.pr-gate{perspective:900px;display:flex;justify-content:center;gap:0;height:150px}
.pr-gate .l,.pr-gate .r{width:90px;height:150px;background:linear-gradient(#5a5547,#2a2620);border:2px solid #7be0b044;transition:transform 2s cubic-bezier(.4,.1,.2,1)}
.pr-gate .l{transform-origin:left center}.pr-gate .r{transform-origin:right center}
.pr-gate.open .l{transform:rotateY(-100deg)}.pr-gate.open .r{transform:rotateY(100deg)}
.pr-panel{perspective:700px}
.pr-panel .door{transform-origin:right;transition:transform 1s}
.pr-panel.open .door{transform:rotateY(-110deg)}
@media(max-width:700px){.pr-jars{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;
/* footprint: heel 'c' crescent / 's' star; lines 2|3; foot 'L'|'R' */
function foot(h,n,f){
  const m=f==='R'?' transform="translate(40 0) scale(-1 1)"':'';
  const lines=Array.from({length:n},(_,i)=>`<line x1="12" x2="27" y1="${20+i*6}" y2="${20+i*6}" stroke="#2a2416" stroke-width="2.6" stroke-linecap="round"/>`).join('');
  const heel=h==='c'?'<path d="M12 43A7.5 7.5 0 0 0 27 43A9 5 0 0 1 12 43Z" fill="#2a2416"/>':'<path d="M19.5 39l1.9 4.2h4.4l-3.6 2.8 1.4 4.4-4.1-2.7-4.1 2.7 1.4-4.4-3.6-2.8h4.4z" fill="#2a2416"/>';
  return `<svg viewBox="0 0 40 58" aria-hidden="true"><g${m}><path d="M15 12C8 14 6 25 10 35c2 5 2 9 2 13 0 8 15 8 15 0 0-6 4-12 5-21 1-11-7-17-17-15z" fill="#d9cfb4"/><circle cx="11" cy="6.5" r="4" fill="#d9cfb4"/><circle cx="19" cy="4.5" r="2.8" fill="#d9cfb4"/><circle cx="25" cy="5.5" r="2.4" fill="#d9cfb4"/><circle cx="30" cy="8.5" r="2.1" fill="#d9cfb4"/><circle cx="33.5" cy="12.5" r="1.8" fill="#d9cfb4"/>${lines}${heel}</g></svg>`;
}
const CODE={'ص':['c',3],'خ':['c',2],'ن':['s',3]};
const GRID=[['ن-ش','خ-ي','ن-ي','ص-ش','ص-ش'],['خ-ش','ص-ي','خ-ش','ص-ش','ص-ي'],['ص-ي','ص-ي','ص-ش','ص-ي','ن-ش'],['ص-ي','ص-ش','ن-ي','ص-ي','خ-ش'],['ص-ش','ص-ش','خ-ي','ن-ش','خ-ي']];
const tileArt=c=>{const [k,f]=c.split('-');const [h,n]=CODE[k];return foot(h,n,f==='ش'?'L':'R');};
const PATH=["ewgf4r","1jir5un","wb4f5v","joehu1","1oggmkz","4ejpkp","1w1tk73","1khchsz","k5brar"];
const CARD=`<div class="card"><div style="width:70px;margin:auto">${foot('c',3,'L')}</div><p class="hand">«في نعلي ثلاثة خطوط عرضية، وعند الكعب هلال. وضعت قدمي اليسرى عند سهم البداية. بعد اليسرى تأتي اليمنى، وبعد اليمنى تأتي اليسرى. انتقل إلى بلاطة ملاصقة فقط: للأمام أو الخلف أو أحد الجانبين. لا خطوات مائلة، ولا قفز، ولا رجوع إلى أثر سبق اجتيازه.»</p></div>`;
const cover=`<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="prg"><stop offset="0" stop-color="#7be0b0"/><stop offset="1" stop-color="#7be0b000"/></radialGradient></defs><circle cx="100" cy="90" r="80" fill="url(#prg)" opacity=".5"/><circle cx="100" cy="90" r="52" fill="none" stroke="#7be0b0" stroke-width="5"/><circle cx="100" cy="90" r="38" fill="none" stroke="#c9a0ff" stroke-width="2" stroke-dasharray="6 6"/><path d="M100 56l10 24h-20zM100 124l-10-24h20z" fill="#7be0b0"/><text x="100" y="98" text-anchor="middle" font-size="22" fill="#e3efe6">𓋹</text><path d="M30 180q40-30 70-6t70-6" stroke="#2a3d36" stroke-width="10" fill="none"/></svg>`;
function spots(el,list,x,after){
  el.innerHTML=`<div class="scene" style="--cols:4">${list.map(s=>`<button class="spot ${x.st['f_'+s.id]?(s.stash?'found':'empty'):''}" type="button" data-s="${s.id}"><span style="font-size:2.2rem">${s.art}</span><span class="lbl">${s.label}</span></button>`).join('')}</div>`;
  el.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{const s=list.find(z=>z.id===b.dataset.s);const first=!x.st['f_'+s.id];x.st['f_'+s.id]=1;x.save();
    if(s.stash){if(first){x.sfx('stone');x.toast(s.msg);}after&&after();}else{x.sfx('click');x.toast(s.e);b.classList.add('empty');}});
}
const R1={key:'k1',title:'آثار الأقدام',short:'الآثار',goal:'اتبعوا أثر الكاهن لحد الباب، من غير ما تدوسوا على أثر ملعون.',
 hints:['كل أثر عليه أكتر من علامة. علامة واحدة صح مش كفاية.','حتى الهلال ممكن يكون خدعة لو عدد الخطوط مختلف.',
  {prism:[foot('c',3,'L'),foot('c',3,'R'),foot('c',2,'L'),foot('s',3,'R')],text:'بعد اليسرى يمنى. أثر صح بنفس القدم اللي واقفين عليها مينفعش.'}],
 render(el,x){
  x.bag.add('k_card','بطاقة أثر الكاهن',CARD,'👣');
  x.st.step=x.st.step||0;x.st.trail=x.st.trail||[];
  const on=new Set(x.st.trail.map(p=>p.join(','))), safe=new Set([x.st.trail[2],x.st.trail[5]].filter(Boolean).map(p=>p.join(',')));
  el.innerHTML=`<div class="pr-hall" id="hall"><div class="pr-door ${x.st.done?'open':''}">${x.st.done?'الباب اتفتح':'باب الغرفة التانية'}</div>
   <div class="pr-grid">${GRID.map((row,r)=>row.map((c,ci)=>`<button class="pr-tile ${on.has((r+1)+','+(ci+1))?'on':''} ${safe.has((r+1)+','+(ci+1))?'safe':''}" type="button" data-r="${r+1}" data-c="${ci+1}" aria-label="بلاطة صف ${r+1} عمود ${ci+1}">${tileArt(c)}</button>`).join('')).join('')}</div>
   <div class="pr-start ltr">▲ start</div></div>
   <div class="row" style="justify-content:space-between"><span class="muted">خطوات: ${x.st.trail.length} · النقط الآمنة بتنوّر بنفسجي</span><button class="btn ghost sm" id="card" type="button">بطاقة الأثر</button></div>
   ${x.st.done?'<div class="row"><button class="btn big" id="nx" type="button">خدوا البردية وادخلوا</button></div>':''}<div class="msg" id="m"></div>`;
  const hall=el.querySelector('#hall');
  hall.onmousemove=e=>{const r=hall.getBoundingClientRect();hall.style.setProperty('--mx',(e.clientX-r.left)+'px');hall.style.setProperty('--my',(e.clientY-r.top)+'px');};
  el.querySelector('#card').onclick=()=>x.bag.open('k_card');
  const nx=el.querySelector('#nx');if(nx)nx.onclick=()=>x.solve(100);
  if(x.st.done)return;
  el.querySelectorAll('.pr-tile').forEach(b=>b.onclick=()=>{
    const r=+b.dataset.r,c=+b.dataset.c,i=x.st.trail.length;
    if(x.H(i+':'+r+','+c)===PATH[i]){x.st.trail.push([r,c]);x.sfx('drip');
      if(i===2||i===5)x.toast('نقطة آمنة.');
      if(x.st.trail.length===PATH.length){x.st.done=1;x.sfx('stone');x.bag.add('k_pap','بردية سائل الكشف',PAP,'📜');}
      x.rerender();}
    else{x.sfx('alarm');b.classList.add('bad');hall.classList.remove('pr-flash');void hall.offsetWidth;hall.classList.add('pr-flash');
      const back=i>=6?6:i>=3?3:0;x.st.trail=x.st.trail.slice(0,back);x.save();
      el.querySelector('#m').textContent=back?'أثر ملعون! رجعتوا لآخر نقطة آمنة.':'أثر ملعون! رجعتوا للبداية.';el.querySelector('#m').className='msg err';
      setTimeout(()=>x.rerender(),900);}
  });
 }};
const PAP=`<div class="card"><b>بردية سائل الكشف</b><p class="hand">اعرف ما يحرسه كل إناء:<br>الموجة تحفظ ما يجري بلا قدمين.<br>الطائر يحرس خلاصة زهرة تطفو فوق الماء.<br>العين تحفظ زيتًا يحمل دفء النهار.<br>الجبل يحرس محلول ما يبقى بعد تبخر الماء المالح.</p>
<p class="hand" style="margin-top:8px">ثم احسب القطرات:<br>للموجة ضعف ما للطائر.<br>وللعين ما للطائر، وزيادة قطرة واحدة.<br>وللجبل ما للعين، ناقص قطرتين.<br>ومجموع قطرات الأواني الأربعة خمس عشرة قطرة.<br>لكل إناء عدد صحيح من قطرة واحدة إلى تسع قطرات.</p>
<p class="hand" style="margin-top:8px">اكتب نصيب كل مكوّن أمام اسمه على لوحة التحضير. ترتيب الأواني على الطاولة ليس ترتيب الإجابة.</p></div>`;
const JS={eye:'<path d="M18 34q22-18 44 0q-22 18-44 0z" fill="none" stroke="#c9a0ff" stroke-width="3"/><circle cx="40" cy="34" r="6" fill="#c9a0ff"/>',
 mountain:'<path d="M14 46l16-24 10 12 8-8 18 20z" fill="#c9a0ff"/>',
 wave:'<path d="M14 30q6-8 12 0t12 0 12 0 12 0M14 42q6-8 12 0t12 0 12 0 12 0" stroke="#c9a0ff" stroke-width="3" fill="none"/>',
 bird:'<path d="M20 38q12-14 22-2q8-12 20-4q-10 2-14 10q-14 6-28-4z" fill="#c9a0ff"/>'};
const jar=k=>`<svg viewBox="0 0 80 110" aria-hidden="true"><path d="M24 8h32v10q16 12 14 44-2 34-30 40-28-6-30-40-2-32 14-44z" fill="#6b5a3e" stroke="#3c2f1e" stroke-width="2"/><rect x="22" y="4" width="36" height="8" rx="3" fill="#3c2f1e"/><g transform="translate(0 30)">${JS[k]}</g></svg>`;
const INSIDE={eye:'زيت دهبي دافي، ريحته شمس.',mountain:'بلورات بيضا بتلمع، طعمها مالح.',wave:'مية صافية بتتحرك لوحدها.',bird:'زهرة لوتس طافية في سائل فاتح.'};
const NAMES=[['nile','ماء النيل'],['lotus','خلاصة اللوتس'],['sunoil','زيت الشمس'],['salt','محلول الملح']];
const MSG='«خلف عين لا ترى،<br>وتحت شمس لا تحرق،<br>وداخل إناء لا يحمل ماء…<br>تجدون ما سقط من كلام الحماية.»';
const R2={key:'k2',title:'أواني الكاهن',short:'الأواني',goal:'حضّروا سائل الكشف بالكميات الصح.',
 hints:['أول جزء في البردية بيقولكم كل إناء بيحرس أنهي مكوّن.','سمّوا قطرات الطائر بحرف، واكتبوا الباقي على أساسه.',
  {prism:['س','٢س','س+١','س−١'],text:'الزيادة والنقصان بيلغوا بعض. المجموع كله مضاعف لحاجة واحدة.'}],
 render(el,x){
  x.st.v=x.st.v||{};
  el.innerHTML=`<div class="pr-hall stack"><b>الطاولة الحجرية</b><div class="pr-jars">${['eye','mountain','wave','bird'].map(k=>`<button class="pr-jar" type="button" data-j="${k}">${jar(k)}<span class="muted" style="font-size:.8rem">بصّوا جوه</span></button>`).join('')}</div></div>
   <div class="row" style="align-items:flex-start;gap:20px"><div class="pr-board" style="flex:1;min-width:240px"><b>لوحة التحضير</b>${NAMES.map(([k,n])=>`<label for="d_${k}"><span>${n}</span><select id="d_${k}">${['—',1,2,3,4,5,6,7,8,9].map(o=>`<option ${String(x.st.v[k])===String(o)?'selected':''}>${o}</option>`).join('')}</select></label>`).join('')}
   <button class="btn" id="go" type="button">تحضير</button><div class="msg" id="m"></div></div>
   <svg class="pr-bowl ${x.st.done?'lit':''}" viewBox="0 0 160 100" aria-hidden="true"><ellipse cx="80" cy="34" rx="70" ry="16" fill="#3c382e"/><path d="M10 34q6 60 70 60t70-60" fill="#5a5547"/><ellipse class="liq" cx="80" cy="36" rx="62" ry="12"/></svg></div>
   ${x.st.done?`<div class="pr-uv" id="uv">${MSG}</div><div class="row"><button class="btn big" id="nx" type="button">ادخلوا الغرفة التالتة</button></div>`:''}`;
  el.querySelectorAll('.pr-jar').forEach(b=>b.onclick=()=>{x.sfx('drip');x.toast(INSIDE[b.dataset.j]);});
  NAMES.forEach(([k])=>{const s=el.querySelector('#d_'+k);s.onchange=()=>{x.st.v[k]=s.value;x.save();x.sfx('drip');};});
  el.querySelector('#go').onclick=()=>{const v=NAMES.map(([k])=>el.querySelector('#d_'+k).value).join(',');
    if(x.check('rqf4f8',v)){x.st.done=1;x.sfx('magic');x.bag.add('k_msg','رسالة الكشف','<div class="card"><p class="hand">'+MSG+'</p></div>','✨');x.rerender();setTimeout(()=>{const u=el.querySelector('#uv');u&&u.classList.add('lit');},120);}
    else{x.fail(el.querySelector('.pr-bowl'),el.querySelector('#m'),'السائل فار وانطفى. الكميات غلط.');}};
  const u=el.querySelector('#uv');if(u)setTimeout(()=>u.classList.add('lit'),60);
  const nx=el.querySelector('#nx');if(nx)nx.onclick=()=>x.solve(100);
 }};
const FR={f1:'النور',f2:'الحماية',f3:'تنتشر',f4:'القلعة',f5:'تنكسر',f6:'القرية',f7:'النار',f8:'اللوعة',f9:'اللعنة',f10:'تعود',f11:'تسود',f12:'الحكاية'};
const STASH={eye:['f1','f2','f3','f4'],sun:['f5','f6','f7','f8'],jar:['f9','f10','f11','f12']};
const PAT=['ال□و□','ت□□س□','اللع□ة','تع□□','الحم□□ة','القر□ة'];
const R3={key:'k3',title:'خط الكاهن',short:'النقش',goal:'لمّوا الكلام اللي وقع، وكمّلوا نقش الحماية.',
 hints:['الرسالة بتوصف حاجات جامدة في الأوضة: عين، وشمس، وإناء.','كل حرف باقي في النقش لازم يفضل في مكانه. وعدد المربعات مهم.',
  {prism:['ال□و□','النور؟','النار؟','الحرف ٤'],text:'كل خانة فيها كلمتين شبه بعض. قارنوهم حرف بحرف مع اللي باقي في النقش.'}],
 render(el,x){
  x.st.slots=x.st.slots||[null,null,null,null,null,null];
  const have=Object.keys(STASH).filter(k=>x.st['f_k_'+k]).flatMap(k=>STASH[k]);
  x.st.mix=x.st.mix||{};have.forEach(f=>{if(x.st.mix[f]===undefined)x.st.mix[f]=Math.random()*10-5;});
  const L=[{id:'k_eye',label:'عين حجرية',art:'👁',stash:1,msg:'النقش اتفتح لجوه… في قصاصات!'},{id:'k_sun',label:'قرص شمس',art:'🌞',stash:1,msg:'درج صغير تحت القرص… فيه قصاصات!'},{id:'k_jar',label:'جرة فاضية',art:'⚱',stash:1,msg:'الجرة فاضية من المية… بس فيها حافظة قصاصات!'},
    {id:'k_wjar',label:'جرة مليانة مية',art:'🏺',e:'مية بس. والمية بتمسح الحبر.'},{id:'k_torch',label:'شعلة',art:'🔥',e:'نارها بتتهز من الهمس.'},{id:'k_statue',label:'تمثال حارس',art:'🗿',e:'عنيه مفتوحة. مش هي.'},{id:'k_pil',label:'عمود',art:'🏛',e:'علامات سودا بتزحف عليه.'},{id:'k_mat',label:'حصيرة',art:'🟫',e:'تراب.'}];
  const pos=[[0,1],[2,3],[4,5]];const lines=[['باسم',0,'،'],[1,2,'،'],['و',3,4,'إلى',5,'.']];
  const slotBtn=i=>`<button class="pr-slot ${x.st.sel===i?'sel':''}" type="button" data-i="${i}"><span class="pat">${PAT[i]}</span><span class="w">${x.st.slots[i]?FR[x.st.slots[i]]:''}</span></button>`;
  el.innerHTML=`<div id="sc"></div>
   <div class="pr-wall"><div class="row" style="justify-content:center;margin-bottom:10px"><svg class="pr-seal ${x.st.done?'lit':''}" id="seal" viewBox="0 0 120 120" aria-hidden="true"><circle class="ring" cx="60" cy="60" r="50"/><circle class="ring" cx="60" cy="60" r="34" stroke-dasharray="6 6"/><text x="60" y="68" text-anchor="middle" font-size="26" fill="#d9cfb4">𓋹</text></svg></div>
    ${lines.map(l=>`<div class="pr-line">${l.map(t=>typeof t==='number'?slotBtn(t):`<span>${t}</span>`).join('')}</div>`).join('')}
    <p class="muted" style="text-align:center;font-size:.9rem">«ست كلمات تعيد الختم. لكل مربع حرف غائب. اختاروا الكلمة التي توافق الحروف الباقية، وضعوها في موضعها. لا تمحوا حرفًا بقي، ولا تضيفوا خانة.»</p></div>
   <div class="pr-frags">${have.length?have.map(f=>`<button class="pr-frag ${x.st.slots.includes(f)?'used':''}" style="--r:${x.st.mix[f].toFixed(1)}deg" type="button" data-f="${f}">${FR[f]}</button>`).join(''):'<span class="muted">لسه ملقيتوش قصاصات.</span>'}</div>
   <p class="muted" style="text-align:center;font-size:.85rem">دوسوا على خانة في النقش، وبعدين على قصاصة. دوسوا على خانة مليانة تفضّوها.</p>
   <div class="row" style="justify-content:center"><button class="btn big" id="go" type="button">إعادة الختم</button></div><div class="msg" id="m" style="text-align:center"></div>
   <div class="pr-gate ${x.st.done?'open':''}" id="gate"><div class="l"></div><div class="r"></div></div>`;
  spots(el.querySelector('#sc'),L,x,()=>{['eye','sun','jar'].forEach(k=>{if(x.st['f_k_'+k])x.st['f_k_'+k]=1;});x.rerender();});
  el.querySelectorAll('.pr-slot').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(x.st.slots[i]){x.st.slots[i]=null;x.st.sel=i;}else x.st.sel=x.st.sel===i?null:i;x.sfx('click');x.rerender();});
  el.querySelectorAll('.pr-frag').forEach(b=>b.onclick=()=>{const f=b.dataset.f;if(x.st.slots.includes(f))return;if(x.st.sel===null||x.st.sel===undefined){x.toast('اختاروا خانة في النقش الأول.');return;}x.st.slots[x.st.sel]=f;x.st.sel=null;x.sfx('stone');x.rerender();});
  el.querySelector('#go').onclick=()=>{const seal=el.querySelector('#seal');
    if(x.st.slots.some(s=>!s)){x.fail(seal,el.querySelector('#m'),'النقش ناقص.');return;}
    if(x.check('1n4cn9n',x.st.slots.join(','))){x.st.done=1;x.save();seal.classList.add('lit');el.querySelector('#gate').classList.add('open');x.sfx('magic');
      setTimeout(()=>x.voice('صوت الكاهن من ورا البوابة','«عاد الختم… أنقذتم القرية. والطريق إليّ أصبح مفتوحًا.»',{av:'𓋹',onClose:()=>x.solve(0)}),2200);}
    else{seal.classList.remove('flick');void seal.offsetWidth;seal.classList.add('flick');x.fail(null,el.querySelector('#m'),'الختم ومض مرة… وانطفى.');}};
 }};
OE.register({id:'priest',short:'الكاهن',title:'لعنة الكاهن الأخير',theme:'priest',color:'#1d5a46',
 tagline:'الكاهن دخل القصر يحبس اللعنة… ومرجعش.',minutes:35,players:'٣–٦ لاعبين',difficulty:5,cover,
 story:`<p>من مئات السنين، ختم الحراس لعنة تحت قصر الملك. في ليلة واحدة انطفى نور الختم، وبدأت علامات سودا تظهر على أبواب البيوت. الكاهن الأخير دخل القصر يحبس اللعنة عند مصدرها… ومرجعش.</p>
 <p class="card" style="margin-top:12px"><span class="hand">«أنا لم أهرب. دخلت القصر لأمنع اللعنة من الوصول إليكم، لكنني لن أستطيع حبسها طويلًا. اتبعوا أثري، وأعيدوا صنع سائل الكشف، ثم أكملوا كلمات الحماية. إن عاد الختم، نجت القرية… وانفتح الطريق إليّ.»</span></p>`,
 rooms:[R1,R2,R3],
 winHTML:x=>`<span class="trophy">عاد الختم</span><h1>القرية نجت</h1><p class="lead">العلامات السودا اختفت، والهمس سكت، وبوابة القصر اتفتحت. ${OE.esc(x.run.team)} لقوا الطريق للكاهن.</p>`,
 loseHTML:()=>`<h1>اللعنة كسبت الليلة</h1><p class="lead">نور الختم انطفى خالص، والهمس بقى أعلى. القرية مستنية فريق تاني.</p>`,
});
document.getElementById('game-css').textContent+=css;
})();

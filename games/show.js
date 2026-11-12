/* The Last Game Show */
(function(){
const {esc}=OE;
const css=`
.sh-stage{position:relative;border-radius:18px;padding:22px;background:linear-gradient(180deg,#22104a,#0c0620);border:2px solid #ff3df255;box-shadow:0 0 40px #ff3df233 inset;overflow:hidden}
.sh-stage::before{content:"";position:absolute;inset:-40% -10% auto;height:160%;background:conic-gradient(from 200deg at 50% 0,transparent 0 40deg,#ffd40018 50deg,transparent 60deg 120deg,#3dffb018 130deg,transparent 140deg);animation:sweep 6s ease-in-out infinite alternate;pointer-events:none}
@keyframes sweep{to{transform:rotate(14deg)}}
.sh-bulbs{display:flex;justify-content:space-between;margin-bottom:10px}
.sh-bulbs i{width:10px;height:10px;border-radius:50%;background:#ffd400;box-shadow:0 0 10px #ffd400;animation:blink 1s infinite}
.sh-bulbs i:nth-child(even){animation-delay:.5s}
@keyframes blink{50%{opacity:.25}}
.sh-title{font-family:"Bungee",var(--f-display);color:#ffd400;text-shadow:0 0 12px #ff3df2,0 3px 0 #7a0a70;text-align:center;font-size:clamp(1.3rem,4vw,2rem);letter-spacing:.04em;direction:ltr}
.sh-pads{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;perspective:800px}
.sh-pad{aspect-ratio:1.4;border-radius:16px;border:0;cursor:pointer;font-size:2.4rem;color:#fff;background:radial-gradient(circle at 30% 25%,#ffffff55,transparent 40%),var(--pc);box-shadow:0 8px 0 #0008,0 0 24px var(--pc);transition:transform .12s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
.sh-pad small{font-size:.8rem;font-family:var(--f-body);font-weight:700}
.sh-pad:active,.sh-pad.hit{transform:translateY(6px) rotateX(14deg);box-shadow:0 2px 0 #0008,0 0 40px var(--pc)}
.sh-slots{display:flex;gap:8px;justify-content:center;direction:ltr}
.sh-slots span{width:52px;height:52px;border-radius:10px;border:2px dashed #ffffff55;display:grid;place-items:center;font-size:1.6rem}
.sh-eq{display:flex;gap:4px;align-items:flex-end;height:60px;justify-content:center}
.sh-eq i{width:8px;background:linear-gradient(#ff3df2,#ffd400);border-radius:3px;height:8px;transition:height .1s}
.sh-eq.on i{animation:eq .5s ease-in-out infinite alternate}
.sh-eq.on i:nth-child(3n){animation-duration:.35s}.sh-eq.on i:nth-child(4n){animation-duration:.6s}
@keyframes eq{from{height:8px}to{height:56px}}
.sh-big{font-family:"Bungee",var(--f-mono);font-size:5rem;color:#3dffb0;text-shadow:0 0 30px #3dffb0;text-align:center;animation:dropin .9s;line-height:1.1}
.sh-host{display:flex;gap:14px;align-items:flex-start}
.sh-host .av{width:70px;height:70px;border-radius:50%;flex:none;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#ffd400,#ff3df2);font-size:2rem;box-shadow:0 0 0 4px #ff3df255;animation:talk 1.4s ease-in-out infinite}
.sh-host .bub{background:#fff;color:#1a0018;border-radius:16px;border-start-start-radius:3px;padding:12px 16px;font-size:1.25rem;font-weight:700;animation:flipin .6s}
.sh-opts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;perspective:800px}
.sh-opt{min-width:110px;min-height:96px;border-radius:14px;border:2px solid #ffffff44;background:#ffffff10;color:#fff;cursor:pointer;font-size:1.6rem;font-weight:700;display:grid;place-items:center;transition:transform .2s;padding:10px}
.sh-opt:hover{transform:rotateY(-12deg) translateZ(10px);border-color:#ffd400}
.sh-prog{display:flex;gap:6px;justify-content:center}
.sh-prog i{width:30px;height:6px;border-radius:3px;background:#ffffff33}.sh-prog i.on{background:#3dffb0;box-shadow:0 0 8px #3dffb0}
.sh-board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;direction:ltr}
.sh-w{border-radius:10px;background:#0c0620;border:1px solid #ffffff22;min-height:68px;display:grid;place-items:center;font-family:"Bungee",sans-serif;font-size:1.05rem;letter-spacing:.03em;animation:flipin .6s both}
.sh-w.sw{border:0}
.sh-colors{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.sh-c{width:70px;height:70px;border-radius:50%;border:4px solid #fff3;cursor:pointer;box-shadow:0 6px 0 #0008}
.sh-c:active{transform:translateY(4px)}
.sh-pieces{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.sh-piece{width:84px;height:100px;border-radius:12px;background:linear-gradient(160deg,#ffd400,#ff8a00);color:#221a00;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Bungee",sans-serif;font-size:2rem;box-shadow:0 8px 0 #7a4a00;animation:flipin .7s both}
.sh-piece small{font-size:1.2rem}
.sh-prize{perspective:900px;display:grid;place-items:center;margin-block:10px}
.sh-box{width:160px;height:110px;position:relative;transform-style:preserve-3d}
.sh-box .b{position:absolute;inset:30px 0 0;background:linear-gradient(#ff3df2,#a0109a);border-radius:6px;box-shadow:0 10px 30px #ff3df277}
.sh-box .l{position:absolute;inset:0 -6px auto;height:36px;background:linear-gradient(#ffd400,#ff9d00);border-radius:6px;transform-origin:bottom right;transition:transform 1.1s cubic-bezier(.3,1.4,.4,1)}
.sh-box.open .l{transform:rotateZ(-50deg) translateY(-20px)}
.sh-box .rb{position:absolute;inset:30px 70px 0;background:#ffd400}
.sh-end{position:relative;min-height:260px;display:grid;place-items:center}
.sh-end .a,.sh-end .b,.sh-end .c{grid-area:1/1;text-align:center}
.sh-end .a{animation:shA 7s forwards}.sh-end .b{opacity:0;animation:shB 7s forwards}.sh-end .c{opacity:0;animation:shC 7s forwards}
.sh-end .blk{grid-area:1/1;inset:0;background:#000;opacity:0;animation:shK 7s forwards;width:100%;height:100%;border-radius:16px}
@keyframes shA{0%,30%{opacity:1}34%,100%{opacity:0}}
@keyframes shB{0%,34%{opacity:0}38%,58%{opacity:1}62%,100%{opacity:0}}
@keyframes shK{0%,60%{opacity:0}62%,88%{opacity:1}92%,100%{opacity:0}}
@keyframes shC{0%,90%{opacity:0;transform:scale(.6)}96%,100%{opacity:1;transform:none}}
@media(max-width:700px){.sh-board{grid-template-columns:repeat(3,minmax(0,1fr))}}
`;
const PADS=[{id:'bell',i:'🔔',l:'جرس',c:'#ff9d00'},{id:'clap',i:'👏',l:'تصفيق',c:'#ff3df2'},{id:'laugh',i:'😂',l:'ضحكة',c:'#00b3ff'},{id:'door',i:'🚪',l:'باب',c:'#7a5cff'},{id:'horn',i:'🎺',l:'بوق',c:'#ff4d6d'},{id:'meow',i:'🐱',l:'قطة',c:'#2bc48a'}];
const TUNE=['bell','laugh','clap','meow','door','wave','laugh','bird'];
const bulbs=`<div class="sh-bulbs" aria-hidden="true">${'<i></i>'.repeat(14)}</div>`;
const host=(t)=>`<div class="sh-host"><div class="av" aria-hidden="true">🎙</div><div class="bub">${t}</div></div>`;
const cover=`<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="shg" cx=".5" cy=".3"><stop offset="0" stop-color="#ffd400"/><stop offset="1" stop-color="#ff3df2"/></radialGradient></defs><circle cx="100" cy="92" r="70" fill="url(#shg)"/><circle cx="100" cy="92" r="58" fill="#1a0036"/>${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<circle cx="${100+Math.cos(a)*64}" cy="${92+Math.sin(a)*64}" r="4" fill="#fff"/>`}).join('')}<rect x="88" y="62" width="24" height="44" rx="12" fill="#c9ced8"/><rect x="96" y="106" width="8" height="26" fill="#c9ced8"/><text x="100" y="186" text-anchor="middle" font-family="Bungee" font-size="20" fill="#ffd400">LAST SHOW</text></svg>`;

const R1={key:'s1',title:'ودانكم مش هتنقذكم',short:'الأصوات',goal:'اعزفوا موسيقى البرنامج السرية على اللوحة.',
 hints:['مش كل اللي بتسمعوه موسيقى. في أصوات متحطوطة عشان تلخبطكم.',
  'اللحن السري بتاع الاستوديو، مش بتاع الشارع. دوّروا ورا الكواليس.',
  {prism:['٤','نغمات','وحدة','بتتكرر'],text:'اللحن ٤ نغمات بس، ونغمة منهم بتتكرر.'}],
 render(el,x){
  if(x.st.done)return piece(el,x,'2','🎧');
  x.st.seq=x.st.seq||[];
  el.innerHTML=`<div class="sh-stage stack">${bulbs}<div class="sh-title">DON'T TRUST YOUR EARS</div>
   ${host('"أنا هسمّعكم موسيقى البرنامج السرية، بس خلي بالكم... مش كل صوت هتسمعوه جزء من اللحن!"')}
   <div class="sh-eq" id="eq">${'<i></i>'.repeat(18)}</div>
   <div class="row" style="justify-content:center"><button class="btn" id="play" type="button">▶ شغّلوا التسجيل</button><span class="muted" style="font-size:.85rem">تقدروا تعيدوه من غير خصم</span></div>
   <div class="sh-pads">${PADS.map(p=>`<button class="sh-pad" type="button" data-p="${p.id}" style="--pc:${p.c}">${p.i}<small>${p.l}</small></button>`).join('')}</div>
   <div class="sh-slots" id="slots">${[0,1,2,3].map(i=>`<span>${x.st.seq[i]?PADS.find(p=>p.id===x.st.seq[i]).i:''}</span>`).join('')}</div><div class="msg" id="m" style="text-align:center"></div></div>
   <div id="bk"></div>`;
  backstage(el.querySelector('#bk'),x);
  let playing=false;
  el.querySelector('#play').onclick=()=>{if(playing)return;playing=true;const eq=el.querySelector('#eq');eq.classList.add('on');
    TUNE.forEach((s,i)=>setTimeout(()=>x.sfx(s),i*1500));setTimeout(()=>{eq.classList.remove('on');playing=false;},TUNE.length*1500);};
  el.querySelectorAll('.sh-pad').forEach(b=>b.onclick=()=>{x.sfx(b.dataset.p);b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),150);
    x.st.seq.push(b.dataset.p);
    const sl=el.querySelectorAll('#slots span');sl.forEach((s,i)=>s.textContent=x.st.seq[i]?PADS.find(p=>p.id===x.st.seq[i]).i:'');
    if(x.st.seq.length===4){const v=x.st.seq.join(',');x.st.seq=[];
      setTimeout(()=>{if(x.check('iw2qm6',v)){x.st.done=1;x.sfx('tada');x.rerender();}else{x.fail(el.querySelector('#slots'),el.querySelector('#m'),'الجمهور بيصفّر... مش ده اللحن.');sl.forEach(s=>s.textContent='');}},700);}
    x.save();});
 }};
function backstage(el,x){
  const L=[{id:'s_cue',label:'كروت المذيع',art:'🗂',card:`<div class="card"><p class="hand">"اللحن الأصلي بتاع البرنامج اتعمل من حاجتين بس: الجرس… والجمهور. أي حاجة تانية دوشة."</p></div>`,t:'كارت المذيع'},
   {id:'s_cam',label:'الكاميرا',art:'🎥',e:'الكاميرا شغالة. حد بيتفرج.'},{id:'s_light',label:'الكشاف',art:'💡',e:'سخن جدًا. ماتلمسوش.'},{id:'s_seat',label:'كراسي الجمهور',art:'🪑',e:'فاضية… بس سامعين ضحك؟'}];
  el.innerHTML=`<b>ورا الكواليس</b><div class="scene" style="--cols:4;margin-top:8px">${L.map(s=>`<button class="spot ${x.st['f_'+s.id]?(s.card?'found':'empty'):''}" type="button" data-s="${s.id}"><span style="font-size:2.2rem">${s.art}</span><span class="lbl">${s.label}</span></button>`).join('')}</div>`;
  el.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{const s=L.find(z=>z.id===b.dataset.s);x.st['f_'+s.id]=1;x.save();
    if(s.card){x.sfx('find');x.bag.add(s.id,s.t,s.card,'🗂');x.bag.open(s.id);b.classList.add('found');}else{x.sfx('click');x.toast(s.e);b.classList.add('empty');}});
}
function piece(el,x,d,icon){
  x.bag.add('piece_'+x.run.room,'قطعة من كود الجائزة',`<div class="sh-pieces"><div class="sh-piece"><small>${icon}</small>${d}</div></div>`,icon);
  el.innerHTML=`<div class="sh-stage stack" style="align-items:center">${bulbs}<div class="sh-title">PIECE UNLOCKED</div><div class="sh-big">${d}</div><p class="muted">القطعة اتحفظت في حقيبة الأدلة.</p><button class="btn big" id="nx" type="button">الجولة اللي بعدها</button></div>`;
  el.querySelector('#nx').onclick=()=>x.solve(100);
}
const STAGES=[{say:'اختاروا أكبر رقم!',opts:[['66','66'],['1','1'],['12','12']],h:'yvn2qe'},
 {say:'اضغطوا على المربع!',opts:[['square','<svg width="56" height="56" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="#ffd400"/></svg>'],['circle','<svg width="56" height="56" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#ffd400"/></svg>']],h:'16vxqjv'},
 {say:'اختاروا اللون الأحمر!',opts:[['red','<span style="display:block;width:56px;height:56px;border-radius:50%;background:#ff2e4d"></span>'],['blue','<span style="display:block;width:56px;height:56px;border-radius:50%;background:#2e7dff"></span>']],h:'e07zyv'},
 {say:'اضغطوا على كلمة LOSE!',opts:[['lose','LOSE'],['win','WIN']],h:'aeeaer'}];
const R2={key:'s2',title:'Reverse the Rules',short:'العكس',goal:'عدّوا الأربع مراحل. أي غلطة بترجعكم للأول.',
 hints:['المذيع عايز يكسب. انتوا عايزين تكسبوا.','اسم الجولة مكتوب قدامكم بالإنجليزي. اقروه كويس.',{prism:['⇄','⇄','⇄','⇄'],text:'كل تعليمة ليها عكس واحد بس على الشاشة. اتجاهلوا كلام المذيع.'}],
 render(el,x){
  if(x.st.done)return piece(el,x,'7','🔄');
  const i=x.st.i||0, s=STAGES[i];
  x.st.order=x.st.order||{};x.st.order[i]=x.st.order[i]||x.shuffle(s.opts.map(o=>o[0]));
  el.innerHTML=`<div class="sh-stage stack">${bulbs}<div class="sh-title">REVERSE THE RULES</div>
   <div class="sh-prog">${STAGES.map((_,k)=>`<i class="${k<i?'on':''}"></i>`).join('')}</div>
   ${host('"'+s.say+'"')}
   <div class="sh-opts">${x.st.order[i].map(k=>`<button class="sh-opt" type="button" data-o="${k}">${s.opts.find(o=>o[0]===k)[1]}</button>`).join('')}</div><div class="msg" id="m" style="text-align:center"></div></div>`;
  el.querySelectorAll('.sh-opt').forEach(b=>b.onclick=()=>{
    if(x.check(s.h,b.dataset.o)){x.sfx('ok');x.st.i=i+1;if(x.st.i>=STAGES.length){x.st.done=1;x.sfx('tada');}x.rerender();}
    else{x.sfx('laugh');x.st.i=0;x.st.order={};x.save();x.fail(el.querySelector('.sh-opts'),el.querySelector('#m'),'المذيع بيضحك… رجعتوا لأول مرحلة.');setTimeout(()=>x.rerender(),1200);}});
 }};
const INK={red:'#ff2e4d',blue:'#2e7dff',green:'#22d36b',yellow:'#ffd400'};
const BOARD=[['RED','blue'],['GREEN','red'],['YELLOW','blue'],['',  'yellow'],['BLUE','green'],['RED','yellow'],['GREEN','blue'],['','green'],['YELLOW','red'],['BLUE','red'],['','yellow'],['RED','blue'],['YELLOW','green']];
const R3={key:'s3',title:'Color Chaos',short:'الألوان',goal:'رتّبوا الألوان صح، وبعدها افتحوا صندوق الجوائز.',
 hints:['الكلمة بتكدب. الحبر لأ.','المربعات اللي مفيهاش كلام مش كلمات.',
  {prism:['<span style="color:#2e7dff">RED</span>','= أزرق','عدّ','رتّب'],text:'عدّوا لون الحبر بتاع الكلمات بس، ورتّبوا من الأكتر للأقل. والصندوق بيحب ترتيب الجولات.'}],
 render(el,x){
  if(x.st.done)return prize(el,x);
  x.st.pick=x.st.pick||[];
  el.innerHTML=`<div class="sh-stage stack">${bulbs}<div class="sh-title">COLOR CHAOS</div>
   ${host('"الألوان عمرها ما كانت المشكلة… المشكلة إنكم بتصدقوا أول حاجة عيونكم بتشوفها!"')}
   <div class="card"><p class="hand" style="text-align:center">اسمع كلامك أصدقك… أشوف أمورك أستعجب</p></div>
   <div class="sh-board">${BOARD.map(([w,c],k)=>w?`<div class="sh-w" style="color:${INK[c]};animation-delay:${k*.05}s">${w}</div>`:`<div class="sh-w sw" style="background:${INK[c]};animation-delay:${k*.05}s"></div>`).join('')}</div>
   <p style="text-align:center">رتّبوا الألوان من الأكتر ظهورًا للأقل:</p>
   <div class="sh-slots" id="slots">${[0,1,2,3].map(i=>`<span style="${x.st.pick[i]?`background:${INK[x.st.pick[i]]};border-style:solid`:''}"></span>`).join('')}</div>
   <div class="sh-colors">${Object.keys(INK).map(k=>`<button class="sh-c" type="button" data-c="${k}" style="background:${INK[k]}" aria-label="${k}"></button>`).join('')}</div><div class="msg" id="m" style="text-align:center"></div></div>`;
  el.querySelectorAll('.sh-c').forEach(b=>b.onclick=()=>{if(x.st.pick.includes(b.dataset.c))return;x.sfx('click');x.st.pick.push(b.dataset.c);
    if(x.st.pick.length===4){const v=x.st.pick.join(',');x.st.pick=[];if(x.check('1w7nwmd',v)){x.st.done=1;x.sfx('tada');x.rerender();return;}x.save();x.fail(el.querySelector('#slots'),el.querySelector('#m'),'عيونكم صدّقت الكلام.');setTimeout(()=>x.rerender(),900);return;}
    x.rerender();});
 }};
function prize(el,x){
  x.bag.add('piece_2','قطعة من كود الجائزة','<div class="sh-pieces"><div class="sh-piece"><small>🎨</small>5</div></div>','🎨');
  const pcs=x.shuffle([['🎧','2'],['🔄','7'],['🎨','5']]);
  el.innerHTML=`<div class="sh-stage stack" style="align-items:center">${bulbs}<div class="sh-title">GRAND PRIZE</div>
   <div class="sh-pieces">${pcs.map(p=>`<div class="sh-piece"><small>${p[0]}</small>${p[1]}</div>`).join('')}</div>
   <div class="sh-prize"><div class="sh-box" id="box"><div class="b"></div><div class="rb"></div><div class="l"></div></div></div>
   <div id="lk"></div><div class="msg" id="m"></div></div>`;
  el.querySelector('#lk').innerHTML=x.lockHTML('lkp',3,{label:'كود صندوق الجوائز'});
  x.wireLock('lkp',3,v=>{if(x.check('urzcgb',v)){el.querySelector('#box').classList.add('open');x.sfx('drum');setTimeout(()=>x.solve(0),1600);return true;}x.fail(el.querySelector('#box'),el.querySelector('#m'),'الصندوق مش مقتنع.');return false;});
}
OE.register({id:'show',short:'البرنامج',title:'The Last Game Show',theme:'show',color:'#7a0aa8',
 tagline:'برنامج مسابقات اختفى من سنين… ورجع عشانكم.',minutes:30,players:'٣–٦ لاعبين',difficulty:3,cover,
 story:`<p>من سنين، برنامج مسابقات اسمه The Last Game Show كان ملايين بيتفرجوا عليه. في ليلة الحلقة الأخيرة، المذيع اختفى، والبث اتقطع.</p><p style="margin-top:8px">بعد سنين، وصلكم إيميل: <span class="ltr">"Congratulations! You've been selected for the final episode."</span> دخلتوا الاستوديو… والباب اتقفل وراكم.</p>`,
 opening:x=>x.voice('المذيع','"أهلًا بأبطال الحلقة الأخيرة! قدامكم ٣٠ دقيقة تكسبوا ٣ جولات وتوصلوا للجائزة الكبرى. بس خليكم فاكرين… هنا مش دايمًا الإجابة الصح هي اللي هتكسبكم!"',{av:'🎙',btn:'يلا'}),
 rooms:[R1,R2,R3],
 winHTML:x=>`<div class="sh-end" style="width:100%"><div class="a"><div class="sh-title" style="font-size:2rem">CONGRATULATIONS!<br>YOU ARE THE LAST WINNERS!</div></div><div class="b">${host('"استنوا… هو أنا قلتلكم إنكم تقدروا تخرجوا؟!"')}</div><div class="blk"></div><div class="c"><div class="sh-title" style="font-size:2.4rem">JUST KIDDING!<br>YOU MADE IT!</div></div></div><span class="trophy">${esc(x.run.team)}</span>`,
 loseHTML:()=>`<h1>البث اتقطع</h1>${host('"للأسف… الحلقة الأخيرة لسه مخلصتش. ونسيت أقولكم: مفيش إعادة."')}`,
});
document.getElementById('game-css').textContent+=css;
})();

/* The Case of the Missing Birthday Cake */
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
  list=OE.trim(list,x);
  el.innerHTML=`${OE.sceneOpen('bg-cake',list,x)}${list.map((s,i)=>`<button style="${OE.slot(i,list.length)}" class="spot ${x.st['f_'+s.id]?(s.card?'found':'empty'):''}" type="button" data-s="${s.id}"><span class="art">${OE.art(s.art)}</span><span class="lbl">${s.label}</span></button>`).join('')}</div>`;
  el.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{const s=list.find(z=>z.id===b.dataset.s);x.st['f_'+s.id]=1;x.save();
    if(s.card){x.sfx('find');x.bag.add(s.id,s.t,s.card,s.icon||'🔎');x.bag.open(s.id);b.classList.add('found');}else{x.sfx('click');x.toast(s.e);b.classList.add('empty');}});
}
const R1={key:'c1',title:'The Crime Scene',short:'Hall',goal:'Open the evidence box.',
 hints:['The three papers complete each other. None of them has the time of the power cut.','First work out when the cake arrived.',
  {prism:['Party','− ?','+ ?','??:??'],text:'The box reads the time like the wall clock, not like the invitation.'}],
 render(el,x){
  el.innerHTML=`<div class="ck-room"><div class="ck-tape">CRIME SCENE · NO EATING · CRIME SCENE · NO EATING</div>
   <svg class="ck-plate" viewBox="0 0 220 90" aria-hidden="true"><ellipse cx="110" cy="60" rx="100" ry="22" fill="#fff" stroke="#f2c6d3" stroke-width="3"/><path d="M50 56q20-10 36 0t40-2 40 6" stroke="#ffd0dc" stroke-width="8" fill="none" stroke-linecap="round"/><g class="crumb"><circle cx="80" cy="50" r="3" fill="#8a4a2a"/><circle cx="140" cy="62" r="4" fill="#8a4a2a"/><circle cx="118" cy="48" r="2" fill="#8a4a2a"/></g></svg>
   <p style="text-align:center" class="muted">Wall clock: <span class="ck-clock" id="wc">${f24(x.gen.party-2)}</span></p></div>
   <div id="sc"></div>
   <div class="card tape"><b>On the evidence box</b><p class="hand">“If you find out when the power cut, you’ll know the first thread of the crime… and please don’t eat the evidence”</p></div>
   <div class="ck-box" id="bx"><div class="bx"><div class="ld"></div><div class="ky">🗝</div></div></div>
   <div class="row" style="justify-content:center"><div id="lk"></div></div><div class="msg" id="m" style="text-align:center"></div>`;
  spots(el.querySelector('#sc'),[
   {id:'c_inv',label:'Gift table',art:'🎁',t:'Birthday invitation',icon:'💌',card:'<div class="card"><p class="hand">You’re invited to a birthday… surprise!<br>The party is at '+f12(x.gen.party)+' pm. Don’t be late.</p></div>'},
   {id:'c_bak',label:'Fridge door',art:'🧲',t:'Baker’s note',icon:'🧾',card:'<div class="card"><p class="hand">The cake was delivered and put in the fridge '+XW[x.gen.X]+' before the party. Enjoy!</p></div>'},
   {id:'c_msg',label:'Phone on the sofa',art:'📱',t:'Message from the host',icon:'💬',card:'<div class="card"><p class="hand">Guys, the power’s out! The cake had only just arrived '+YW[x.gen.Y]+'ago… somebody find the flashlight.</p></div>'},
   {id:'c_bal',label:'Balloons',art:'🎈',e:'A balloon popped. Nobody even flinched.'},{id:'c_can',label:'Box of candles',art:'🕯',e:'Candles without a cake. Tragedy.'},
   {id:'c_sofa',label:'Under the sofa',art:'🛋',e:'A fork with cream on it. Someone was in a hurry.'},{id:'c_spk',label:'Speaker',art:'🔊',e:'A birthday playlist on mute.'},{id:'c_cat',label:'The cat',art:'🐈',e:'Innocent. This time.'}],x);
  el.querySelector('#lk').innerHTML=x.lockHTML('lkc1',4,{label:'Evidence box'});
  x.wireLock('lkc1',4,v=>{if(v===x.gen.cut){el.querySelector('#bx').classList.add('open');x.sfx('unlock');
    x.bag.add('c_note','A note from the box','<div class="card"><p class="hand">“Whoever took the cake was probably among you… and may still be playing the innocent!”</p></div>','🗝');
    setTimeout(()=>x.voice('A note inside the box','“Whoever took the cake was probably among you… and may still be playing the innocent!”',{av:'🗝',onClose:()=>x.solve(100)}),1500);return true;}
    x.fail(el.querySelector('#bx'),el.querySelector('#m'),'The box is locked. Try again.');return false;});
 }};
const PEOPLE=[{id:'omar',n:'Omar',m:1,e:'🧔',c:'#3a7bd5'},{id:'nada',n:'Nada',m:0,e:'👩',c:'#c94b9b'},{id:'karim',n:'Karim',m:1,e:'🧑',c:'#2bb673'},{id:'salma',n:'Salma',m:0,e:'👩‍🦱',c:'#e0a530'}];
const f24=t=>String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');
const f12=t=>{const h=Math.floor(t/60)-12,m=t%60;return m?h+':'+String(m).padStart(2,'0'):String(h)};
const XW={40:'40 minutes',45:'45 minutes',50:'50 minutes'},YW={15:'a quarter of an hour',20:'twenty minutes'};
const LN={choc:'Chocolate',cake:'Cake',cream:'Cream',straw:'Strawberry'};
function generate(){
  const R=OE.RND,party=R.pick([1140,1170,1200,1230,1260]),X=R.pick([40,45,50]),Y=R.pick([15,20]),C=party-X+Y,entry=C-5;
  const [early,quick,thief,late]=R.shuffle(PEOPLE),logs={},ex=R.shuffle(['I was getting ice','I was hanging the decorations','I was fixing the speakers','I was looking for the charger']);
  logs[early.id]='“I was in the hall ten minutes before the cake arrived. I stayed a quarter of an hour and left. '+ex[0]+'.”';
  logs[quick.id]=`“I came in right after ${early.n} left. I left two minutes before the power cut. ${ex[1]}.”`;
  logs[thief.id]=`“I came in ${Y===15?'five minutes':'ten minutes'} after ${quick.n} did. I stayed a quarter of an hour after the power cut. ${ex[2]}.”`;
  logs[late.id]='“I came in five minutes after the power cut, and left a quarter of an hour later. '+ex[3]+'.”';
  const order=R.shuffle(['choc','cake','cream','straw']),dg=R.digits(3,1,9),nums={},berries=R.int(1,5);order.filter(k=>k!=='straw').forEach((k,i)=>nums[k]=dg[i]);
  const recipe=R.shuffle([`${LN[order[0]]} at the base.`,`${LN[order[1]]} directly on top of ${LN[order[0]]}.`,`${LN[order[2]]} directly on top of ${LN[order[1]]}.`,`${LN[order[3]]} as the very last layer on top.`]);
  return {party,X,Y,cut:f24(C).replace(':',''),sus:PEOPLE.map(p=>({...p,log:logs[p.id]})),acc:thief.id+'@'+(Math.floor(entry/60)-12)+String(entry%60).padStart(2,'0'),thief:thief.n,order,nums,berries,recipe,fridge:order.map(k=>k==='straw'?berries:nums[k]).join('')};
}
const R2={key:'c2',title:'We’re All Innocent, Guys',short:'Cameras',goal:'Identify the suspect… and exactly when they entered.',
 hints:['None of them gave a time. They’re all talking relative to something else.','Put them on a timeline. The hall’s clues are still in your bag.',
  {prism:['Before','After','Not the time','Arrival'],text:'Three conditions on the screen. Only one person meets all three.'}],
 render(el,x){
  const SUS=x.gen.sus;
  el.innerHTML=`<div class="ck-cctv stack"><div class="row" style="justify-content:space-between"><span>CAM-02 · LIVING ROOM</span><span class="ck-rec">● REC</span></div>
   <p style="color:#fff;font-family:var(--f-body)">The cake was there until the power cut. After that it vanished.</p>
   <ul style="margin:0;padding-inline-start:1.2em;color:#fff;font-family:var(--f-body)"><li>Whoever took the cake came in before it vanished.</li><li>They left after it vanished.</li><li>They weren’t in the hall when the cake arrived.</li></ul>
   <div class="ck-sus">${SUS.map(s=>`<button class="ck-s" type="button" data-s="${s.id}"><span class="ph" style="--pc:${s.c}">${s.e}</span><b>${s.n}</b><small style="opacity:.7">Movement log</small></button>`).join('')}</div></div>
   <div class="panel stack"><b>Accusation report</b><div class="ck-acc">
    <label>Suspect<select class="field" id="who"><option value="">—</option>${SUS.map(s=>`<option value="${s.id}">${s.n}</option>`).join('')}</select></label>
    <label>Entered at<select class="field mono" id="hh"><option>6</option><option>7</option><option>8</option><option>9</option></select></label>
    <label>Minute<select class="field mono" id="mm">${Array.from({length:12},(_,i)=>`<option>${String(i*5).padStart(2,'0')}</option>`).join('')}</select></label>
    <button class="btn" id="go" type="button">Make the accusation</button></div><span class="muted" style="font-size:.85rem">A wrong accusation = 30 second penalty</span><div class="msg" id="m"></div></div>`;
  el.querySelectorAll('.ck-s').forEach(b=>b.onclick=()=>{const s=SUS.find(z=>z.id===b.dataset.s);x.sfx('click');x.bag.add('c_'+s.id,'Statement of '+s.n,`<div class="card"><p class="hand">${s.log}</p></div>`,s.e);x.bag.open('c_'+s.id);});
  el.querySelector('#go').onclick=()=>{const w=el.querySelector('#who').value,m=el.querySelector('#m');if(!w){x.fail(null,m,'Choose a suspect.');return;}
    const k=w+'@'+el.querySelector('#hh').value+el.querySelector('#mm').value;
    if(k===x.gen.acc){x.sfx('unlock');x.voice('Camera system','“Suspect identified successfully! But it seems they forgot that cameras never forget… even if they forgot to wipe the cream off their hands 😂”<br><br>🗝 You have the kitchen key.',{av:'📹',onClose:()=>x.solve(100)});}
    else{x.run.pen+=30;x.save();x.fail(el.querySelector('.ck-acc'),m,'“Looks like you rushed to judgment, Detective… go back and review the evidence!”');}};
 }};
const LAY={choc:{n:'Chocolate',c:'#5a3320',w:'200px',num:'9'},cake:{n:'Cake',c:'#e0b060',w:'170px',num:'4'},cream:{n:'Cream',c:'#f7a8c0',w:'140px',num:'7'},straw:{n:'Strawberry',c:'#e2264d',w:'110px',num:'🍓🍓'}};
const R3={key:'c3',title:'The Kitchen and the Cake Rescue Mission',short:'Kitchen',goal:'The fridge is locked with a code. Build the cake correctly and open it.',
 hints:['The recipe isn’t written in order. Order it yourselves, and don’t assume the cake is ordinary.','The code is read from the base upward.',{prism:['🍓','🍓','= ?','Count'],text:'One layer has no number written on it. Look at it carefully.'}],
 render(el,x){
  x.st.stack=x.st.stack||[];
  const num=k=>k==='straw'?'🍓'.repeat(x.gen.berries):String(x.gen.nums[k]);
  el.innerHTML=`<div id="sc"></div>
   <div class="ck-room"><div class="ck-stack"><div class="ck-tower" style="${x.st.built?'':'animation:none'}">${x.st.stack.map((k,i)=>`<button class="ck-lay" type="button" data-rm="${k}" style="--c:${LAY[k].c};--w:${200-i*28}px;font-size:${k==='straw'?'.8rem':'1.3rem'}" aria-label="شيل ${LAY[k].n}">${num(k)}</button>`).join('')||'<span class="muted">The plate is empty</span>'}</div></div>
   ${x.st.built?'':`<div class="ck-parts">${x.shuffle(Object.keys(LAY)).map(k=>`<button class="ck-part ${x.st.stack.includes(k)?'used':''}" type="button" data-k="${k}" style="--c:${LAY[k].c}"><span class="sw" style="font-size:${k==='straw'?'.6rem':'1rem'}">${num(k)}</span><span>${LAY[k].n}</span></button>`).join('')}</div>
   <p class="muted" style="text-align:center;font-size:.85rem">Click a layer to put it on top of the previous one. Click a layer in the cake to remove it.</p>
   <div class="row" style="justify-content:center"><button class="btn" id="bd" type="button" ${x.st.stack.length===4?'':'disabled'}>The cake is ready</button></div>`}</div>
   <div class="row" style="justify-content:center;gap:24px;align-items:center"><div class="ck-fridge" id="fr"><div class="in">🎂</div><div class="dr"><span class="hd"></span>❄</div></div><div id="lk"></div></div><div class="msg" id="m" style="text-align:center"></div>`;
  spots(el.querySelector('#sc'),[
   {id:'c_rec',label:'Cookbook',art:'📖',t:'The recipe',icon:'📖',card:'<div class="card"><p class="hand">“To make a proper cake, not just a random mixture like what Omar makes in the kitchen:”<br>'+x.gen.recipe.map(t=>'• '+t).join('<br>')+'</p></div>'},
   {id:'c_sink',label:'Sink',art:'🚰',e:'A cake knife, washed in a hurry.'},{id:'c_oven',label:'Oven',art:'♨',e:'Cold. Nobody baked anything.'},{id:'c_apr',label:'Apron',art:'🥼',e:'It has a cream fingerprint. Looks like '+x.gen.thief+'.'}],x);
  el.querySelectorAll('.ck-part').forEach(b=>b.onclick=()=>{if(x.st.stack.includes(b.dataset.k))return;x.st.stack.push(b.dataset.k);x.sfx('drip');x.rerender();});
  if(!x.st.built)el.querySelectorAll('.ck-lay').forEach(b=>b.onclick=()=>{x.st.stack=x.st.stack.filter(k=>k!==b.dataset.rm);x.sfx('click');x.rerender();});
  const bd=el.querySelector('#bd');if(bd)bd.onclick=()=>{if(x.st.stack.join(',')===x.gen.order.join(',')){x.st.built=1;x.sfx('magic');x.rerender();}else{x.fail(el.querySelector('.ck-stack'),el.querySelector('#m'),'The cake collapsed. That’s an Omar mixture.');x.st.stack=[];setTimeout(()=>x.rerender(),900);}};
  el.querySelector('#lk').innerHTML=x.lockHTML('lkc3',4,{label:'Fridge code'});
  x.wireLock('lkc3',4,v=>{if(!x.st.built){x.fail(el.querySelector('#fr'),el.querySelector('#m'),'Build the cake first.');return false;}
    if(v===x.gen.fridge){el.querySelector('#fr').classList.add('open');x.sfx('unlock');
     setTimeout(()=>x.voice('Message from '+x.gen.thief,'“Guys, I hid the cake to surprise the birthday guest and put a photo of him sleeping on it… but I didn’t expect you to turn the birthday into a police station! And by the way, I was only going to eat a small piece”',{av:'🧑',onClose:()=>x.solve(0)}),1900);return true;}
    x.fail(el.querySelector('#fr'),el.querySelector('#m'),'The fridge is buzzing. Wrong code.');return false;});
 }};
OE.register({id:'cake',short:'Cake',title:'The Missing Birthday Cake Case',theme:'cake',color:'#e2457a',
 tagline:'The party is in 20 minutes. And the cake… is missing.',minutes:20,players:'3–6 detectives',difficulty:4,cover,
 story:`<p>The party starts in 20 minutes, and the birthday guest is on the way, but there’s a disaster… the cake is gone!</p><p style="margin-top:8px">The last person to see it says they left it in its place, the others each have a different story, and someone is clearly hiding a secret. Find out who, when, and where.</p>`,
 rooms:[R1,R2,R3], generate,
 winHTML:x=>`<span class="trophy">Case solved</span><h1>Congratulations, detectives!</h1><p class="lead">You saved the birthday before the guest arrived… but there’s a question more important than all the evidence: which of you licked the cream off the serving plate?</p>`,
 loseHTML:x=>`<h1>The birthday guest has arrived</h1><p class="lead">The candles are lit… over an empty plate. And everyone is looking at ${x.gen.thief||'each other'}.</p>`,
});
document.getElementById('game-css').textContent+=css;
})();

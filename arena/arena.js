// Arena tab: side-by-side pages generated with (left) vs without (right) taste.md. Data comes from arena/arena_data.js (window.ARENA).
(()=>{
const D=window.ARENA; if(!D) return;
const MODELS={deepseek:'DeepSeek V4.1 Flash',haiku:'Claude Haiku 5.5',luna:'GPT-6 Luna'};
const P=D.prompts, $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pc=v=>Math.round(v*100)+'%';
const store={get(){try{return JSON.parse(localStorage.getItem('arenaVotes')||'{}')}catch(e){return {}}},set(v){try{localStorage.setItem('arenaVotes',JSON.stringify(v))}catch(e){}}};
let votes=store.get(), i=0, model='deepseek', dev={A:'desktop',B:'desktop'};

document.head.insertAdjacentHTML('beforeend',`<style>
.ar-tabs{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:60;display:flex;padding:4px;gap:4px;background:var(--panel);box-shadow:0 0 0 1px rgba(143,198,255,.18),0 6px 24px rgba(0,0,0,.35);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--line);border-radius:999px}
.ar-tabs a{padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--starlight);text-decoration:none;font-family:var(--font-ui)}
.ar-tabs a:hover{background:rgba(143,198,255,.10)} .ar-tabs a.on{background:var(--ice);color:#0b1220} .ar-sep{width:1px;margin:6px 4px;background:var(--line-strong)} .ar-tabs a.ar-ext{font-weight:500;font-size:13px;padding:8px 16px;color:var(--dim);border:1px solid var(--line)} .ar-tabs a.ar-ext:hover{color:var(--starlight);border-color:rgba(143,198,255,.45)}
#arena{position:fixed;inset:0;z-index:50;overflow:auto;background:radial-gradient(ellipse at 50% 30%,#0b1120,#050710 70%);display:none;padding:62px 0 32px}
body.arena-on #arena{display:block}
.ar-w{max-width:1520px;margin:0 auto;padding:0 24px}
.ar-top{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px}
.ar-top h1{font-family:var(--font-display);font-size:22px;font-weight:700}
.ar-top p{font-size:12px;color:var(--dim);margin-top:4px;max-width:640px;line-height:1.55}
.ar-ctl{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.ar-b{border:1px solid var(--line-strong);background:var(--panel);color:var(--dim);border-radius:999px;padding:6px 13px;font-size:11.5px;cursor:pointer;font-family:var(--font-ui);transition:background .2s,color .2s}
.ar-b:hover{color:var(--starlight)} .ar-b.on{background:var(--ice-soft);color:var(--ice);border-color:rgba(143,198,255,.45)}
.ar-b:disabled{opacity:.35;cursor:default}
.ar-jv{padding:8px 0;border-top:1px solid var(--line)} .ar-jv:first-of-type{border-top:0} .ar-jh{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12.5px} .ar-jh em{font-style:normal;font-size:11px;font-weight:600;padding:2px 9px;border-radius:999px} .ar-jh em.taste{background:rgba(95,191,133,.16);color:#7fd3a0} .ar-jh em.base{background:rgba(224,102,102,.16);color:#ef8f8f} .ar-jh em.tie{background:rgba(160,170,190,.16);color:var(--dim)} .ar-jv p{margin:5px 0 0;font-size:11.5px;line-height:1.5;color:var(--dim)}
.ar-gr{display:grid;grid-template-columns:1fr auto 36px;align-items:center;gap:10px;padding:5px 0;font-size:12.5px;color:var(--dim)} .ar-gr.cur{color:var(--starlight)} .ar-gr b{display:flex;gap:4px} .ar-gr i{width:10px;height:10px;border-radius:50%;background:#555e70} .ar-gr i.taste{background:#5fbf85} .ar-gr i.base{background:#e06666} .ar-gr .v{text-align:right;font-family:var(--font-mono,monospace)}
.ar-next{background:var(--ice-soft);color:var(--ice);border-color:rgba(143,198,255,.55);font-size:13.5px;font-weight:600;padding:9px 20px} .ar-next:hover{background:var(--ice);color:#0b1220}
.ar-sep{width:1px;height:20px;background:var(--line)}
.ar-card{background:var(--panel);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--line);border-radius:var(--r)}
.ar-pr{padding:14px 16px;display:flex;gap:16px;align-items:flex-start;margin-bottom:14px}
.ar-pr .tx{flex:1;min-width:0;transition:opacity .25s,transform .25s}
.ar-pr .tx.out{opacity:0;transform:translateX(-10px)}
.ar-meta{display:flex;gap:6px;margin-bottom:7px;font-family:var(--font-data);font-size:10px;color:var(--faint)}
.ar-meta span{border:1px solid var(--line);border-radius:4px;padding:1px 6px}
.ar-pr q{display:block;font-size:13.5px;line-height:1.6;color:var(--starlight);max-height:4.8em;overflow:auto;quotes:none;white-space:pre-wrap}
.ar-main{display:grid;grid-template-columns:1fr 1fr 300px;gap:14px}
.ar-pane{overflow:hidden;animation:arIn .45s ease both}.ar-pane+.ar-pane{animation-delay:.07s}
@keyframes arIn{from{opacity:0;transform:translateY(14px)}}
.ar-ph{display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid var(--line-soft)}
.ar-lab{perspective:600px;flex:1;height:22px}
.ar-lab .in{position:relative;height:100%;transition:transform .7s cubic-bezier(.3,1.4,.5,1);transform-style:preserve-3d}
.ar-lab.rev .in{transform:rotateX(180deg)}
.ar-lab .f{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;font-family:var(--font-display);font-weight:700;font-size:15px;line-height:22px}
.ar-lab .bk{transform:rotateX(180deg)} .ar-lab .bk.t{color:var(--ice)} .ar-lab .bk.n{color:var(--dim)}
.ar-ph .ar-b{padding:3px 9px;font-size:10.5px}
.ar-stage{position:relative;height:clamp(360px,56vh,720px);overflow:hidden;background:#fff}
.ar-stage iframe{position:absolute;top:0;left:0;border:0;background:#fff;transform-origin:0 0}
.ar-stage.mob{background:#0a0f1f}.ar-stage.mob iframe{border-radius:14px;box-shadow:0 0 0 1px var(--line-strong)}
.ar-stage img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.ar-pg{opacity:0;transition:opacity .45s}.ar-pg.in{opacity:1}
.ar-gen{position:absolute;inset:0;z-index:2;background:#0a0f1f;padding:16px 18px;overflow:hidden;transition:opacity .45s}.ar-gen.out{opacity:0}
.ar-gen .bar{height:2px;background:var(--line);overflow:hidden;margin-bottom:14px}.ar-gen .bar i{display:block;height:100%;width:40%;background:var(--ice);animation:arBar 1.1s ease-in-out infinite}
@keyframes arBar{from{transform:translateX(-100%)}to{transform:translateX(250%)}}
.ar-gen pre{font-family:var(--font-data);font-size:10px;line-height:1.6;color:var(--faint);white-space:pre-wrap;word-break:break-all;animation:arCode 14s linear infinite;-webkit-mask-image:linear-gradient(#000 60%,transparent)}
@keyframes arCode{to{transform:translateY(-50%)}}
.ar-gen span{position:absolute;left:18px;bottom:14px;font-size:11.5px;color:var(--ice)}
.ar-stage .no{position:absolute;inset:0;display:grid;place-items:center;color:var(--faint);font-size:12px;background:#0a0f1f}
.ar-vote{grid-column:1/3;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;padding:4px 0}
.ar-vote .ar-b{padding:9px 22px;font-size:13px}
.ar-res{grid-column:1/3;text-align:center;font-size:12.5px;color:var(--dim);min-height:20px}
.ar-res b{color:var(--ice);font-weight:600}
.ar-side{grid-row:1/4;grid-column:3;padding:14px;align-self:start;font-size:11.5px;color:var(--dim);line-height:1.55}
.ar-side .sm-sec{margin:14px 0 8px}.ar-side .sm-sec:first-child{margin-top:0}
.ar-row{display:grid;grid-template-columns:96px 1fr 38px;gap:8px;align-items:center;margin:6px 0;font-size:11px}
.ar-row .v{font-family:var(--font-data);color:var(--starlight);text-align:right}
.ar-bar{position:relative;height:8px;border-radius:4px;background:rgba(148,178,255,.08);overflow:hidden}
.ar-bar i{position:absolute;top:0;bottom:0;left:0;background:var(--ice);opacity:.75;transition:width .9s cubic-bezier(.2,.8,.2,1);width:0}
.ar-bar u{position:absolute;top:2px;bottom:2px;border-left:1px solid var(--starlight);border-right:1px solid var(--starlight);opacity:.6}
.ar-bar s{position:absolute;top:-2px;bottom:-2px;left:50%;border-left:1px dashed var(--faint)}
.ar-big{font-family:var(--font-display);font-size:30px;font-weight:700;color:var(--starlight);line-height:1.1}
.ar-big small{font-family:var(--font-data);font-size:10.5px;color:var(--dim);font-weight:400;margin-left:6px}
.ar-cmp{width:100%;border-collapse:collapse;font-size:11px}
.ar-cmp td{padding:3px 0;border-bottom:1px solid var(--line-soft)}.ar-cmp td+td{text-align:center;font-family:var(--font-data);width:52px}
.ar-cmp .y{color:var(--lime)}.ar-cmp .x{color:var(--rose)}
.ar-note{font-size:10.5px;color:var(--faint);margin-top:8px}
.ar-warn{color:var(--ember);font-size:11px;margin-bottom:10px}
.ar-fs{position:fixed;inset:0;z-index:70;background:#050710;display:none;flex-direction:column}
.ar-fs.on{display:flex}.ar-fs .h{display:flex;justify-content:space-between;align-items:center;padding:8px 14px;font-size:12px;color:var(--dim)}
.ar-fs iframe{flex:1;border:0;background:#fff}
@media (max-width:1100px){.ar-main{grid-template-columns:1fr 1fr}.ar-side{grid-column:1/3;grid-row:auto}}
@media (max-width:760px){.ar-main{grid-template-columns:1fr}.ar-vote,.ar-res,.ar-side{grid-column:1}.ar-pr{flex-direction:column}.ar-w{padding:0 16px}}
</style>`);

document.body.insertAdjacentHTML('beforeend',`
<nav class="ar-tabs"><a href="#starmap" data-t="starmap">Starmap</a><a href="#arena" data-t="arena">Arena</a><span class="ar-sep"></span><a class="ar-ext" href="report.html" target="_blank" rel="noopener">Report ↗</a><a class="ar-ext" href="architecture.html" target="_blank" rel="noopener">Architecture ↗</a></nav>
<section id="arena"><div class="ar-w">
 <div class="ar-top"><div><div class="sm-eyebrow">taste.md arena · ${P.length} real prompts × 3 models</div><h1>Same prompt, same model — left with taste.md, right without.</h1>
  <p>Only the system prompt differs: the left page had taste.md, the right did not. All three models answered every prompt; switch models above.</p></div>
  <div class="ar-ctl" id="arM"></div></div>
 ${D.placeholder?'<div class="ar-warn">Placeholder data: the real generations are not wired in yet.</div>':''}
 <div class="ar-card ar-pr"><div class="tx" id="arTx"></div>
  <div class="ar-ctl"><button class="ar-b ar-next" id="arNext">Next prompt →</button></div></div>
 <div class="ar-main" id="arMain"></div>
</div></section>
<div class="ar-fs" id="arFs"><div class="h"><span id="arFsT"></span><button class="ar-b" id="arFsX">Close ✕</button></div><iframe sandbox="allow-scripts"></iframe></div>`);

const key=()=>P[i].prompt_id+'|'+model;
const cond=s=>s==='A'?'taste':'base';   // fixed: left = with taste.md, right = without
const page=s=>P[i].models[model]?.[cond(s)]||{};

function controls(){
  $('#arM').innerHTML=Object.entries(MODELS).map(([k,v])=>`<button class="ar-b ${k===model?'on':''}" data-m="${k}">${v}</button>`).join('')
   ;
}
function prompt(){
  const p=P[i];
  $('#arTx').innerHTML=`<div class="ar-meta"><span>${esc(p.prompt_id)}</span><span>${esc(MODELS[model])}</span><span>${esc(p.subcategory)}</span><span>${esc(p.lang)}</span></div><q>${esc(p.prompt)}</q>`;
}
function pane(s){
  const c=cond(s);
  return `<div class="ar-card ar-pane" data-s="${s}"><div class="ar-ph">
   <div class="ar-lab rev"><div class="in"><span class="f bk ${c==='taste'?'t':'n'}">${c==='taste'?'With taste.md':'Without taste.md'}</span></div></div>
   ${['desktop','mobile','shot'].map(d=>`<button class="ar-b ${dev[s]===d?'on':''}" data-d="${d}">${d==='shot'?'Screenshot':d[0].toUpperCase()+d.slice(1)}</button>`).join('')}
   <button class="ar-b" data-fs title="Open full screen">⤢</button></div>
   <div class="ar-stage ${dev[s]==='mobile'?'mob':''}"></div></div>`;
}
function fill(s,wait=1300){
  const st=$(`.ar-pane[data-s="${s}"] .ar-stage`), pg=page(s), t0=Date.now(), gen=document.createElement('div');
  gen.className='ar-gen'; gen.innerHTML=`<div class="bar"><i></i></div><pre>${esc((pg.html||'<!doctype html>\n<html>\n<head>\n').slice(0,1600).repeat(2))}</pre><span>Generating with ${esc(MODELS[model])}…</span>`;
  st.replaceChildren(gen);
  if(!pg.html&&!pg.shot){gen.querySelector('span').textContent=`${MODELS[model]} is still generating this page…`; return}
  let el, fin=false;
  if(dev[s]==='shot'||!pg.html){el=document.createElement('img'); el.alt='Model '+s+' screenshot'; el.src=pg.shot}
  else{el=document.createElement('iframe'); el.setAttribute('sandbox','allow-scripts'); el.title='Model '+s; el.srcdoc=pg.html;
    const fit=()=>{const W=st.clientWidth,H=st.clientHeight,mob=dev[s]==='mobile',w=mob?390:1280,k=Math.min(1,(W-(mob?24:0))/w);
      el.style.width=w+'px'; el.style.height=(mob?H-24:H)/k+'px'; el.style.left=mob?(W-w*k)/2+'px':'0'; el.style.top=mob?'12px':'0'; el.style.transform=`scale(${k})`;};
    fit(); new ResizeObserver(fit).observe(st);}
  el.classList.add('ar-pg'); st.prepend(el);
  const done=()=>{if(fin)return; fin=true; setTimeout(()=>{el.classList.add('in'); gen.classList.add('out'); setTimeout(()=>gen.remove(),450)},Math.max(0,wait-(Date.now()-t0)))};
  el.onload=done; el.onerror=done; setTimeout(done,5000);
}
function bars(rows){return rows.map(r=>`<div class="ar-row"><span>${r.name}</span><div class="ar-bar"><s></s>${r.lo!=null?`<u style="left:${r.lo*100}%;width:${(r.hi-r.lo)*100}%"></u>`:''}<i data-w="${r.rate*100}"></i></div><span class="v">${pc(r.rate)}</span></div>`).join('')}
function side_(){
  const p=P[i], rs=p.reasons?.[model], cm=p.compliance?.[model], S=D.summary||{}, o=S.overall||{};
  const myk=Object.keys(votes), mine=myk.length?myk.reduce((a,k)=>a+votes[k],0)/myk.length:null;
  return `<div class="ar-card ar-side">
   <div class="sm-sec">All prompts · with-taste wins</div>
   ${o.rate!=null?`<div class="ar-big">${pc(o.rate)}<small>95% CI ${pc(o.lo)}–${pc(o.hi)}${o.n?` · n=${o.n}`:''}</small></div>${bars(Object.keys(MODELS).filter(k=>S.models?.[k]).map(k=>({name:MODELS[k],...S.models[k]})))}<div class="ar-note">Blind pairwise judging by 3 models across all 30 evaluated prompts; 95% CI by prompt-cluster bootstrap.</div>`:''}
   <div class="sm-sec">This prompt · all three generators</div>
   ${Object.keys(MODELS).map(g=>{const v=p.reasons?.[g]||{},ks=Object.values(v),w=ks.filter(x=>x.pick==='taste').length+ks.filter(x=>x.pick==='tie').length/2;return `<div class="ar-gr${g===model?' cur':''}"><span>${esc(MODELS[g])}</span><b>${ks.map(x=>`<i class="${x.pick}"></i>`).join('')}</b><span class="v">${ks.length?`${w}/${ks.length}`:'–'}</span></div>`}).join('')}
   <div class="ar-note">Judges preferring the with-taste page, per generator model. </div>
   <div class="sm-sec">taste.md rule checks</div>
   ${cm?`<table class="ar-cmp"><tr><td></td><td>without</td><td>with</td></tr>${Object.keys(cm.taste||cm.base||{}).map(r=>`<tr><td>${esc(r)}</td>${['base','taste'].map(c=>`<td class="${cm[c]?.[r]?'y':'x'}">${cm[c]?(cm[c][r]?'✓':'✗'):'–'}</td>`).join('')}</tr>`).join('')}</table>`:'<div class="ar-note">No rule checks for this pair.</div>'}
   <div class="sm-sec">This prompt · blind judges</div>
   ${rs&&Object.keys(rs).length?`<div class="ar-note" style="margin:0 0 8px">${esc(MODELS[model])} pair; each judge saw both pages in random order.</div>${Object.entries(rs).map(([k,v])=>`<div class="ar-jv"><div class="ar-jh"><span>${esc(MODELS[k]||k)}</span><em class="${v.pick}">${v.pick==='taste'?'With taste':v.pick==='base'?'Without taste':'Tie'}</em></div><p>${esc(v.reason||'')}</p></div>`).join('')}`:'<div class="ar-note">No judge verdicts for this pair.</div>'}
   <div class="sm-sec">Your votes</div>
   <div>${mine==null?'No votes yet.':`${myk.length} vote${myk.length>1?'s':''} · with-taste chosen <b style="color:var(--ice)">${pc(mine)}</b> (ties count half)`}</div>
  </div>`;
}
function render(anim){
  const m=$('#arMain'), voted=votes[key()]!=null;
  m.innerHTML=pane('A')+pane('B')+`
   <div class="ar-vote">${[['A','With taste is better'],['tie','Tie'],['B','Without is better']].map(([v,t])=>`<button class="ar-b" data-v="${v}" ${voted?'disabled':''}>${t}</button>`).join('')}</div>
   <div class="ar-res" id="arRes">${voted?result():'Look at both pages, then vote.'}</div>`+side_();
  if(!anim) m.querySelectorAll('.ar-pane').forEach(e=>e.style.animation='none');
  fill('A'); fill('B');
  requestAnimationFrame(()=>requestAnimationFrame(()=>m.querySelectorAll('.ar-bar i').forEach(e=>e.style.width=e.dataset.w+'%')));
}
function result(){const v=votes[key()];return v===.5?'Tie recorded.':v===1?'You picked the page made <b>with taste.md</b>.':'You picked the page made <b>without taste.md</b>.'}
function go(n){const t=$('#arTx');t.classList.add('out');setTimeout(()=>{i=n;prompt();t.classList.remove('out');render(true)},220)}

$('#arena').addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b) return;
  if(b.dataset.m){model=b.dataset.m;controls();prompt();render(true)}
  else if(b.id==='arNext'){go((i+1)%P.length)}
  else if(b.dataset.d){const s=b.closest('.ar-pane').dataset.s;dev[s]=b.dataset.d;b.parentNode.querySelectorAll('[data-d]').forEach(x=>x.classList.toggle('on',x===b));
    const st=b.closest('.ar-pane').querySelector('.ar-stage');st.classList.toggle('mob',dev[s]==='mobile');fill(s,350)}
  else if(b.dataset.fs!=null){const s=b.closest('.ar-pane').dataset.s,pg=page(s),fs=$('#arFs');
    if(!pg.html){if(pg.shot)window.open(pg.shot);return}
    fs.querySelector('iframe').srcdoc=pg.html;$('#arFsT').textContent=cond(s)==='taste'?'With taste.md':'Without taste.md';fs.classList.add('on')}
  else if(b.dataset.v){const v=b.dataset.v,w=v==='tie'?.5:(cond(v)==='taste'?1:0);votes[key()]=w;store.set(votes);
    $('#arMain').querySelectorAll('[data-v]').forEach(x=>{x.disabled=true;x.classList.toggle('on',x===b)});
    $('#arRes').innerHTML=result();const sd=$('.ar-side');sd.outerHTML=side_();$('.ar-side').querySelectorAll('.ar-bar i').forEach(e=>e.style.width=e.dataset.w+'%')}
});
$('#arFsX').onclick=()=>{$('#arFs').classList.remove('on');$('#arFs iframe').srcdoc=''};

function route(){const on=location.hash==='#arena';document.body.classList.toggle('arena-on',on);
  document.querySelectorAll('.ar-tabs a').forEach(a=>a.classList.toggle('on',a.dataset.t===(on?'arena':'starmap')));
  if(on&&!$('#arMain').children.length){controls();prompt();render(true)}}
addEventListener('hashchange',route);
addEventListener('keydown',e=>{if(document.body.classList.contains('arena-on')){e.stopImmediatePropagation();if(e.key==='Escape')$('#arFsX').click()}},true);
route();
})();

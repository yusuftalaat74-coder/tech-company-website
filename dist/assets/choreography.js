(()=>{
'use strict';
if(!window.Motion)return;
const {animate,inView,hover,press,scroll}=window.Motion;
const root=document.documentElement;
const active=new Set();
const transient=new WeakMap();
const stages=new Map();
const disabled=()=>root.classList.contains('motion-paused');
root.classList.add('motion-enhanced');
function track(element,keyframes,options={},owner=null){
 if(!options.repeat&&transient.has(element)){
  const previous=transient.get(element);previous.player.complete();active.delete(previous);
 }
 const player=animate(element,keyframes,options),entry={player,owner,loop:options.repeat};active.add(entry);
 if(!options.repeat)transient.set(element,entry);
 if(!options.repeat)player.then(()=>{active.delete(entry);if(transient.get(element)===entry)transient.delete(element);});
 if(disabled()||document.hidden||(owner&&!stages.get(owner)))player.pause();
 return player;
}
function sync(){for(const {player,owner,loop}of active){if(disabled()&&!loop){player.complete();continue;}if(disabled()||document.hidden||(owner&&!stages.get(owner)))player.pause();else player.play();}}
document.addEventListener('motionchange',sync);document.addEventListener('visibilitychange',sync);
// Animate complete text blocks, preserving Arabic letter joining and accessibility.
const reveals=document.querySelectorAll('.reveal,.hero-copy>* , .page-hero>* , .platform-card,.engagement-grid article,.regional-grid article,.values-grid>div,.detail-section h2,.faq-section h2,.contact-section form,.footer-top>div,.project-cta>*');
reveals.forEach((element,index)=>{
 element.dataset.motionReveal='';
 inView(element,()=>{if(disabled())return;track(element,{opacity:[0,1],y:[element.matches('h1,h2')?32:22,0],filter:['blur(3px)','blur(0px)']},{duration:.72,delay:(index%3)*.065,ease:[.22,1,.36,1]});},{amount:.08});
});
// Spring feedback for cards and actions, with equivalent keyboard focus feedback.
const interactive='.button,.platform-card,.sector-card,.concept-art,.work-art,.catalog-filters button';
function lift(el,on){if(disabled())return;track(el,{y:on?-5:0,scale:on?1.012:1},{type:'spring',stiffness:310,damping:24});}
hover(interactive,el=>{lift(el,true);return()=>lift(el,false);});
document.querySelectorAll(interactive).forEach(el=>{el.dataset.motionInteractive='';el.addEventListener('focusin',()=>lift(el,true));el.addEventListener('focusout',()=>lift(el,false));});
press('.button,.catalog-filters button,.demo-trigger',el=>{if(!disabled())track(el,{scale:.97},{duration:.12});return()=>{if(!disabled())track(el,{scale:1},{type:'spring',stiffness:450,damping:24});};});
hover('.text-link,.service-row',el=>{const arrow=el.querySelector('.icon');if(!arrow||disabled())return;track(arrow,{x:root.dir==='rtl'?-4:4,rotate:-8},{type:'spring',stiffness:240,damping:18});return()=>{if(!disabled())track(arrow,{x:0,rotate:0},{type:'spring',stiffness:240,damping:18});};});
const progress=document.createElement('div');progress.className='motion-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let stopScroll;
function connectScroll(){stopScroll?.();if(disabled())return;stopScroll=scroll(p=>{progress.style.transform=`scaleX(${p})`;});}
connectScroll();document.addEventListener('motionchange',connectScroll);
// Native dialog content gets a short spring entrance, including its live tabs.
const dialog=document.querySelector('#concept-dialog');
if(dialog)new MutationObserver(()=>{if(dialog.open&&!disabled())track(dialog,{opacity:[0,1],y:[18,0],scale:[.975,1]},{duration:.3,ease:[.16,1,.3,1]});}).observe(dialog,{attributes:true,attributeFilter:['open']});
const menu=document.querySelector('#mobile-nav');
if(menu)new MutationObserver(()=>{if(!menu.hidden&&!disabled())track(menu,{opacity:[0,1],y:[-8,0]},{duration:.24});}).observe(menu,{attributes:true,attributeFilter:['hidden']});
// Filter and tab changes animate newly presented content, without changing its semantics.
document.querySelectorAll('.catalog-filters button').forEach(button=>button.addEventListener('click',()=>{
 if(disabled())return;
 document.querySelectorAll('.platform-card:not([hidden])').forEach((card,i)=>track(card,{opacity:[0,1],y:[12,0]},{duration:.35,delay:i*.04,ease:'easeOut'}));
}));
const demoContent=document.querySelector('#demo-content');
if(demoContent)new MutationObserver(()=>{if(dialog?.open&&!disabled())track(demoContent,{opacity:[0,1],y:[8,0]},{duration:.25});}).observe(demoContent,{childList:true});
hover('.brand',el=>{const mark=el.querySelector('.brand-mark');if(!mark||disabled())return;track(mark,{rotate:78},{type:'spring',stiffness:160,damping:14});return()=>{if(!disabled())track(mark,{rotate:-12},{type:'spring',stiffness:160,damping:14});};});
// Native scrolling keeps dragging and touch independent of the illustration timelines.
document.querySelectorAll('[data-carousel]').forEach(section=>{
 const grid=section.querySelector('.motion-grid'),originals=[...grid.children],count=originals.length;
 if(count<2){section.querySelector('.carousel-controls').hidden=true;return;}
 originals.forEach(tile=>{const clone=tile.cloneNode(true);clone.dataset.clone='';clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;clone.querySelectorAll('a,button').forEach(el=>el.tabIndex=-1);grid.append(clone);});
 let index=0,localPause=false,visible=false,hovered=false,focused=false,busy=false,drag=null,dragged=false,release,lastInteraction=0,touching=false;
 const step=()=>originals[0].getBoundingClientRect().width+parseFloat(getComputedStyle(grid).gap);
 const update=()=>{section.querySelector('.carousel-position').textContent=String(index+1).padStart(2,'0')+' / '+String(count).padStart(2,'0');};
 function settle(force=false){if(drag||(busy&&!force))return;const unit=step();let n=Math.round(grid.scrollLeft/unit);if(n>=count){n%=count;grid.scrollLeft=n*unit;}index=n%count;busy=false;update();}
 function move(delta,manual=false){
  if(busy||drag)return;busy=true;let n=Math.round(grid.scrollLeft/step());
  if(delta<0&&n===0){grid.scrollLeft=count*step();n=count;}
  grid.scrollTo({left:(n+delta)*step(),behavior:disabled()?'instant':'smooth'});
  clearTimeout(release);release=setTimeout(()=>settle(true),750);
  if(manual)section.querySelector('.carousel-status').textContent=originals[(n+delta+count)%count].getAttribute('aria-label');
 }
 section.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>move(Number(button.dataset.slide),true)));
 const pause=section.querySelector('[data-carousel-pause]');pause.addEventListener('click',()=>{localPause=!localPause;pause.setAttribute('aria-pressed',String(localPause));pause.setAttribute('aria-label',pause.dataset[localPause?'play':'pause']);pause.textContent=localPause?'▶':'Ⅱ';});
 grid.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft'].includes(e.key))return;e.preventDefault();move(e.key==='ArrowRight'?1:-1,true);});
 grid.addEventListener('scrollend',()=>settle());
 grid.addEventListener('scroll',()=>{if(drag||busy)return;clearTimeout(release);release=setTimeout(()=>settle(),180);},{passive:true});
 grid.addEventListener('pointerdown',e=>{touching=true;lastInteraction=Date.now();if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,scroll:grid.scrollLeft,id:e.pointerId};dragged=false;});
 grid.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>6){dragged=true;grid.classList.add('is-dragging');grid.setPointerCapture(drag.id);}if(dragged){e.preventDefault();grid.scrollLeft=drag.scroll-dx;}});
 function endDrag(){touching=false;lastInteraction=Date.now();if(!drag)return;drag=null;grid.classList.remove('is-dragging');settle();}
 window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
 grid.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false;}},true);
 grid.addEventListener('dragstart',e=>e.preventDefault());
 section.addEventListener('mouseenter',()=>hovered=true);section.addEventListener('mouseleave',()=>hovered=false);
 section.addEventListener('focusin',()=>focused=true);section.addEventListener('focusout',()=>queueMicrotask(()=>focused=section.contains(document.activeElement)));
 inView(section,()=>{visible=true;return()=>visible=false;});
 setInterval(()=>{if(visible&&!disabled()&&!document.hidden&&!localPause&&!hovered&&!focused&&!touching&&Date.now()-lastInteraction>6000)move(1);},6000);
 new ResizeObserver(()=>{if(!drag&&!busy)grid.scrollLeft=index*step();}).observe(grid);update();
});
const walkers=[];
let previousTime=0;
function walkFrame(now){
 requestAnimationFrame(walkFrame);if(now-previousTime<30)return;previousTime=now;
 for(const w of walkers){
  if(disabled()||document.hidden||!stages.get(w.stage)){w.lastX=null;continue;}
  const x=new DOMMatrixReadOnly(getComputedStyle(w.procession).transform).m41;
  if(w.lastX!==null){const delta=w.lastX-x;if(delta>=0&&delta<w.stage.clientWidth*.5)w.phase+=delta/w.scale/window.AfricaGait.stride;}
  w.lastX=x;
  w.legs.forEach((el,i)=>{const pose=window.AfricaGait.leg(w.phase+i*.5,i?87:108);el.querySelector('.leg-outline').setAttribute('d',pose.path);el.querySelector('.foot-outline').setAttribute('d',pose.foot);});
 }
}
requestAnimationFrame(walkFrame);
// Each procession moves physically from right to left. Only the page inside scrolls vertically.
document.querySelectorAll('.story-stage').forEach(stage=>{
 stages.set(stage,false);
 const cycle=parseFloat(getComputedStyle(stage.parentElement).getPropertyValue('--vignette-cycle'))||14;
 const loop={duration:cycle,repeat:Infinity,ease:'linear'};
 const run=(el,frames,opts={})=>track(el,frames,{...loop,...opts},stage);
 inView(stage,()=>{stages.set(stage,true);sync();return()=>{stages.set(stage,false);sync();};},{amount:.12});
 if(stage.classList.contains('tile-sketch')){
  const path=stage.querySelector('.scribble-line'),pencil=stage.querySelector('.quick-pencil');
  // Irregular crossing strokes: a new scribble on each visit, completed in 180 ms.
  const points=Array.from({length:19},(_,i)=>[36+Math.random()*365,62+Math.random()*205]);
  path.setAttribute('d',points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '));
  const flash=.18/cycle,vanish=.24/cycle;
  run(stage.querySelector('.quick-sketch'),{opacity:[1,1,0,0]},{times:[0,flash,vanish,1]});
  run(path,{strokeDasharray:[1,1],strokeDashoffset:[1,0,0]},{times:[0,flash,1]});
  const times=points.map((_,i)=>i/(points.length-1)*flash).concat([vanish,1]);
  run(pencil,{left:points.map(p=>`${p[0]/440*100}%`).concat(['110%','110%']),top:points.map(p=>`${p[1]/330*100-26}%`).concat(['-12%','-12%']),rotate:points.map(()=>25+Math.random()*40).concat([40,40]),opacity:points.map(()=>1).concat([0,0])},{times});
  run(stage.querySelector('.flash-window'),{opacity:[0,0,1,1,0],scale:[.96,.96,1,1,1]},{times:[0,flash,.3/cycle,.975,1]});
 }
 if(stage.classList.contains('tile-couture')){
  const procession=stage.querySelector('.push-procession');
  run(procession,{x:['105%','-115%']});
  const walker={stage,procession,phase:0,lastX:null,scale:1,legs:[...stage.querySelectorAll('.model-leg')]};
  const resize=()=>walker.scale=stage.querySelector('.fashion-line').clientHeight/518||1;
  new ResizeObserver(resize).observe(stage);resize();walkers.push(walker);
 }
 if(stage.classList.contains('tile-aircargo')){
  // West Wings' Towed choreography: spring delivery, release the rope, bank away.
  const delivery=stage.querySelector('.air-procession');
  run(delivery,{x:['125%','-4%','1%','0%','0%','0%'],y:[-42,3,-1,0,0,0],rotate:[3,-.8,.2,0,0,0],opacity:[1,1,1,1,1,0]},{times:[0,.95/cycle,1.2/cycle,1.65/cycle,.96,1],ease:'easeOut'});
  run(stage.querySelector('.tow-rope'),{scaleX:[1,1,0,0],opacity:[.8,.8,0,0]},{times:[0,1.05/cycle,1.4/cycle,1]});
  run(stage.querySelector('.cargo-carrier'),{x:['0%','0%','-650%','-650%'],y:[0,-3,-260,-260],rotate:[0,0,28,28],opacity:[1,1,0,0]},{times:[0,1.05/cycle,2.6/cycle,1],ease:[.55,0,.75,.2]});
 }
 const img=stage.querySelector('.page-scroll'),viewport=stage.querySelector('.page-viewport');
 let browsing,scrollbar,lastDistance=-1;
 function browse(){
  const distance=Math.max(0,img.clientHeight-viewport.clientHeight);
  if(Math.abs(distance-lastDistance)<1)return;lastDistance=distance;
  for(const old of [browsing,scrollbar])if(old){old.stop();for(const item of active)if(item.player===old)active.delete(item);}
  browsing=run(img,{y:[0,0,-distance*.46,-distance*.46,-distance,-distance,0]},{duration:24,times:[0,.09,.39,.47,.78,.86,1],ease:'easeInOut'});
  scrollbar=run(stage.querySelector('.preview-scrollbar'),{y:[0,0,viewport.clientHeight*.55,viewport.clientHeight*.55,0]},{duration:24,times:[0,.09,.78,.86,1],ease:'easeInOut'});
 }
 img.addEventListener('load',browse);if(img.complete)browse();new ResizeObserver(browse).observe(viewport);
});
})();

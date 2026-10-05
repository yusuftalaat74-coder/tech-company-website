(()=>{
'use strict';
const config=JSON.parse(document.getElementById('motion-data')?.textContent||'{}');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=!config.enabled||reduced.matches;
const root=document.documentElement;
const controls=[...document.querySelectorAll('[data-motion-toggle]')];
function setPaused(value){paused=value;root.classList.toggle('motion-paused',paused);controls.forEach(b=>{b.setAttribute('aria-pressed',String(paused));b.setAttribute('aria-label',paused?config.copy.play:config.copy.pause);b.textContent=paused?'▶':'Ⅱ';});document.dispatchEvent(new Event('motionchange'));}
controls.forEach(b=>b.addEventListener('click',()=>setPaused(!paused)));
reduced.addEventListener('change',()=>setPaused(reduced.matches||!config.enabled));setPaused(paused);
const canvas=document.querySelector('[data-globe]');
if(canvas){
 const ctx=canvas.getContext('2d');let points=[],angle=-.3,orbit=0,last=0,visible=true,size=0;
 const rad=Math.PI/180;
 const projected=(lon,lat,r=1)=>{const a=lon*rad+angle,b=lat*rad;let x=Math.cos(b)*Math.sin(a),z=Math.cos(b)*Math.cos(a),y=-Math.sin(b);const tilt=-.15;return {x:x*r,y:(y*Math.cos(tilt)-z*Math.sin(tilt))*r,z:(y*Math.sin(tilt)+z*Math.cos(tilt))*r};};
 function resize(){size=canvas.clientWidth;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=size*dpr;canvas.height=size*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
 function draw(){if(!size)return;const c=size/2,r=size*.32;ctx.clearRect(0,0,size,size);
  const orbitPoints=[];for(let ring=0;ring<2;ring++){for(let i=0;i<=220;i++){let a=i/220*Math.PI*2+orbit*(ring?-.75:1),x=Math.cos(a)*r*1.37,y=Math.sin(a)*r*.44,z=Math.sin(a);let tilt=(ring?-.65:.52)+Math.sin(orbit*.32+(ring?1.4:0))*.2;orbitPoints.push({x:c+x*Math.cos(tilt)-y*Math.sin(tilt),y:c+x*Math.sin(tilt)+y*Math.cos(tilt),z,ring,i});}}
  function rings(front){if(!config.orbits)return;ctx.lineWidth=ringWidth();for(let k=0;k<2;k++){ctx.beginPath();let started=false;for(const p of orbitPoints.filter(p=>p.ring===k)){if((p.z>0)!==front){started=false;continue;}if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);}ctx.strokeStyle=k?(config.accent||'#f15a2b')+'80':(config.accent||'#d64520');ctx.stroke();}}
  function ringWidth(){return Math.max(1.4,size*.006);}
  rings(false);
  let shadow=ctx.createRadialGradient(c,c+r*.82,0,c,c+r*.82,r*.9);shadow.addColorStop(0,'#18231e30');shadow.addColorStop(1,'#18231e00');ctx.fillStyle=shadow;ctx.beginPath();ctx.ellipse(c,c+r*1.19,r*.85,r*.13,0,0,Math.PI*2);ctx.fill();
  let sphere=ctx.createRadialGradient(c-r*.4,c-r*.45,r*.04,c,c,r);sphere.addColorStop(0,'#526059');sphere.addColorStop(.4,'#283831');sphere.addColorStop(.85,'#13231e');sphere.addColorStop(1,'#081a14');ctx.fillStyle=sphere;ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#b8c8b526';ctx.lineWidth=.65;
  for(let lat=-60;lat<=60;lat+=30){ctx.beginPath();let started=false;for(let lon=-180;lon<=180;lon+=3){const p=projected(lon,lat);if(p.z<=0){started=false;continue;}if(!started){ctx.moveTo(c+p.x*r,c+p.y*r);started=true;}else ctx.lineTo(c+p.x*r,c+p.y*r);}ctx.stroke();}
  for(let lon=-180;lon<180;lon+=30){ctx.beginPath();let started=false;for(let lat=-90;lat<=90;lat+=3){const p=projected(lon,lat);if(p.z<=0){started=false;continue;}if(!started){ctx.moveTo(c+p.x*r,c+p.y*r);started=true;}else ctx.lineTo(c+p.x*r,c+p.y*r);}ctx.stroke();}
  for(const [lon,lat]of points){const p=projected(lon,lat);if(p.z<=0)continue;ctx.fillStyle=`rgba(233,239,218,${.3+.7*p.z})`;ctx.beginPath();ctx.arc(c+p.x*r,c+p.y*r,Math.max(.55,size*.0024)*(0.5+p.z*.5),0,Math.PI*2);ctx.fill();}
  rings(true);
  if(config.orbits){for(let k=0;k<2;k++){const p=orbitPoints.find(p=>p.ring===k&&p.i===(k?150:20));ctx.shadowColor='#f15a2b';ctx.shadowBlur=12;ctx.fillStyle=config.accent||'#ff8754';ctx.beginPath();ctx.arc(p.x,p.y,size*.011,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}}
 }
 const observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible)draw();});observer.observe(canvas);
 new ResizeObserver(resize).observe(canvas);
 fetch(canvas.dataset.land).then(r=>{if(!r.ok)throw Error('Map unavailable');return r.json();}).then(p=>{points=p;draw();}).catch(()=>canvas.classList.add('map-unavailable'));
 function frame(now){requestAnimationFrame(frame);if(now-last<32)return;const dt=Math.min((now-last)/1000,.06);last=now;if(!visible||document.hidden||paused)return;if(config.globe)angle+=dt*.16*(config.globeSpeed||1);orbit+=dt*.38;draw();}
 document.addEventListener('motionchange',draw);resize();requestAnimationFrame(frame);
}
const stages=[...document.querySelectorAll('.story-stage')];
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('scene-visible',e.isIntersecting)),{threshold:.12});stages.forEach(s=>observer.observe(s));
document.querySelectorAll('[data-story-tab]').forEach(button=>button.addEventListener('click',()=>{
 const host=button.closest('[data-story-gallery]');host.querySelectorAll('[data-story-tab]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));host.querySelectorAll('[data-story-panel]').forEach(p=>{p.hidden=p.dataset.storyPanel!==button.dataset.storyTab;});
}));
document.querySelectorAll('[data-story-tab]').forEach(button=>button.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=[...button.parentElement.querySelectorAll('[data-story-tab]')],i=tabs.indexOf(button);const j=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[j].click();tabs[j].focus();}));
document.querySelectorAll('[data-story-replay]').forEach(button=>button.addEventListener('click',()=>{const stage=button.closest('[data-story-panel]').querySelector('.story-stage');stage.getAnimations({subtree:true}).forEach(a=>a.currentTime=0);}));
})();

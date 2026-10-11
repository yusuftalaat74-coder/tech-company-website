(()=>{
'use strict';
const data=JSON.parse(document.getElementById('site-data').textContent),ar=data.locale==='ar',d=data.demo;
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const menu=$('.menu-toggle'),nav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.hidden=!open;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){closeMenu();menu.focus();}});
window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu();});
$$('a',nav).forEach(a=>a.addEventListener('click',closeMenu));
$('.back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
const dialog=$('#concept-dialog');let lastDemoTrigger=null;
const clinicRows=['09:00','09:30','10:00','10:30'].map((time,i)=>[time,(ar?['أمارا ك.','ثيو م.','لينا ن.','آدم س.']:['Amara K.','Theo M.','Lina N.','Adam S.'])[i],d.visits[i%2],d.statuses[i===0?0:1]]);
const fleetRows=['DL-028','DL-029','DL-030','DL-031'].map((id,i)=>[id,d.routes[i],d.vehicle+' '+['04','07','12','02'][i],i%2?'delivered':'transit']);
const table=(headers,rows)=>`<div class="demo-table-wrap"><table class="demo-table"><thead><tr>${headers.map(x=>`<th scope="col">${escape(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>`<td>${i===row.length-1?`<span class="status-pill">${escape(x)}</span>`:escape(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
function renderClinic(tab='overview'){
 const content=$('#demo-content');
 content.innerHTML=`<div class="demo-tabs" aria-label="${d.clinicView}">${data.demoTab.map((t,i)=>`<button data-clinic-tab="${i===0?'overview':'appointments'}" aria-pressed="${tab===(i===0?'overview':'appointments')}">${t}</button>`).join('')}</div>${tab==='overview'?`<div class="demo-summary">${d.clinicStats.map((s,i)=>[s,['24','08','03'][i]]).map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div><div class="demo-chart" role="img" aria-label="${d.chart}">${[40,72,55,94,67,38,23].map(h=>`<span style="height:${h}%"></span>`).join('')}</div><div class="demo-chart-label">${d.days.map(x=>`<span>${x}</span>`).join('')}</div>`:table(d.clinicHeaders,clinicRows)}`;
 $$('[data-clinic-tab]',content).forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.clinicTab;renderClinic(v);$(`[data-clinic-tab="${v}"]`,content).focus();}));
}
function renderFleet(filter='all'){
 const labels=['all','transit','delivered'],rows=fleetRows.filter(r=>filter==='all'||r[3]===filter),content=$('#demo-content');
 content.innerHTML=`<div class="demo-summary">${d.fleetStats.map((s,i)=>[s,['18','94%','32'][i]]).map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div><div class="demo-tabs" aria-label="${d.filter}">${data.demoFilter.map((t,i)=>`<button data-fleet-filter="${labels[i]}" aria-pressed="${filter===labels[i]}">${t}</button>`).join('')}</div>${table(d.fleetHeaders,rows.map(r=>[...r.slice(0,3),r[3]==='transit'?data.demoFilter[1]:data.demoFilter[2]]))}<p class="form-note" role="status">${d.showing}: ${rows.length} / ${fleetRows.length}</p>`;
 $$('[data-fleet-filter]',content).forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.fleetFilter;renderFleet(v);$(`[data-fleet-filter="${v}"]`,content).focus();}));
}
$$('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
 lastDemoTrigger=button;const isClinic=button.dataset.demo==='clinic';$('#demo-title').textContent=data.demoNames[isClinic?0:1];isClinic?renderClinic():renderFleet();dialog.showModal();document.body.classList.add('modal-open');$('.dialog-close').focus();
}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastDemoTrigger?.focus();});
const languagePicker=$('.language-picker');
 document.addEventListener('click',e=>{if(!languagePicker.contains(e.target))languagePicker.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&languagePicker.open){languagePicker.open=false;$('summary',languagePicker).focus();}});
 $$('[data-sector-filter]').forEach(button=>button.addEventListener('click',()=>{
  const sector=button.dataset.sectorFilter;
  $$('[data-sector-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;$$('.platform-card').forEach(card=>{card.hidden=sector!=='all'&&card.dataset.sector!==sector;if(!card.hidden)count++;});
  $('#catalog-count').textContent=count+' '+data.results;
 }));
 const form=$('#project-form');let brief='';
if(form){
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const values=Object.fromEntries(new FormData(form));
  const keys=['name','email','company','service','stage','idea','country','platform'];
  const fields=data.briefFields.map((label,i)=>[label,keys[i]]);
  values.platform=data.products.find(p=>p.id===values.platform)?.name||'';
  brief=`${data.brand.name} — ${data.briefTitle}\n\n`+fields.filter(([,k])=>values[k]).map(([label,key])=>`${label}: ${values[key].trim()}`).join('\n\n');
  $('#brief-preview').textContent=brief;form.hidden=true;$('#brief-result').hidden=false;$('#brief-result').focus();
  const email=$('#email-brief');if(email)email.href=`mailto:${encodeURIComponent(data.brand.email)}?subject=${encodeURIComponent(data.brand.name+' — '+values.service)}&body=${encodeURIComponent(brief)}`;
 });
 $('#edit-brief').addEventListener('click',()=>{$('#brief-result').hidden=true;form.hidden=false;$('input',form).focus();});
 $('#download-brief').addEventListener('click',()=>{const blob=new Blob(['\ufeff'+brief],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='project-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 const params=new URLSearchParams(location.search);
 const chosen=data.products.find(p=>p.id===params.get('platform'));if(chosen){form.elements.platform.value=chosen.id;form.elements.service.value=data.businessService;}
 const reference=params.get('reference');if(reference&&reference.length<=100){form.elements.idea.value=data.scopePrompt+' '+reference;}
 if(params.get('intent')==='partnership'){form.elements.idea.value=data.partnerPrompt;}
 const requested=params.get('service');if(requested){const option=[...form.elements.service.options].find(x=>x.value===requested);if(option)form.elements.service.value=requested;}
}
})();

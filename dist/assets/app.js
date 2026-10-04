(()=>{
'use strict';
const data=JSON.parse(document.getElementById('site-data').textContent),ar=data.locale==='ar';
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
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('js-motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.07});
 $$('.reveal').forEach(el=>observer.observe(el));
}
const dialog=$('#concept-dialog');let lastDemoTrigger=null;
const clinicRows=[['09:00',ar?'أمارا ك.':'Amara K.',ar?'استشارة':'Consultation',ar?'تم الحضور':'Checked in'],['09:30',ar?'ثيو م.':'Theo M.',ar?'متابعة':'Follow-up',ar?'قادم':'Upcoming'],['10:00',ar?'لينا ن.':'Lina N.',ar?'استشارة':'Consultation',ar?'قادم':'Upcoming'],['10:30',ar?'آدم س.':'Adam S.',ar?'متابعة':'Follow-up',ar?'قادم':'Upcoming']];
const fleetRows=[['DL-028',ar?'مسار المدينة':'City route',ar?'مركبة 04':'Vehicle 04','transit'],['DL-029',ar?'مسار الشمال':'North route',ar?'مركبة 07':'Vehicle 07','delivered'],['DL-030',ar?'مسار الساحل':'Coastal route',ar?'مركبة 12':'Vehicle 12','transit'],['DL-031',ar?'مسار المركز':'Central route',ar?'مركبة 02':'Vehicle 02','delivered']];
const table=(headers,rows)=>`<div class="demo-table-wrap"><table class="demo-table"><thead><tr>${headers.map(x=>`<th scope="col">${escape(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>`<td>${i===row.length-1?`<span class="status-pill">${escape(x)}</span>`:escape(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
function renderClinic(tab='overview'){
 const content=$('#demo-content');
 content.innerHTML=`<div class="demo-tabs" aria-label="${ar?'عرض العيادة':'Clinic view'}">${data.demoTab.map((t,i)=>`<button data-clinic-tab="${i===0?'overview':'appointments'}" aria-pressed="${tab===(i===0?'overview':'appointments')}">${t}</button>`).join('')}</div>${tab==='overview'?`<div class="demo-summary">${(ar?[['المواعيد','24'],['تم الحضور','08'],['الغرف المتاحة','03']]:[['Appointments','24'],['Checked in','08'],['Available rooms','03']]).map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div><div class="demo-chart" role="img" aria-label="${ar?'مخطط تجريبي للمواعيد خلال الأسبوع':'Sample appointments across the week'}">${[40,72,55,94,67,38,23].map(h=>`<span style="height:${h}%"></span>`).join('')}</div><div class="demo-chart-label">${(ar?['الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت','الأحد']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map(x=>`<span>${x}</span>`).join('')}</div>`:table(ar?['الوقت','الاسم التجريبي','الزيارة','الحالة']:['Time','Sample patient','Visit','Status'],clinicRows)}`;
 $$('[data-clinic-tab]',content).forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.clinicTab;renderClinic(v);$(`[data-clinic-tab="${v}"]`,content).focus();}));
}
function renderFleet(filter='all'){
 const labels=['all','transit','delivered'],rows=fleetRows.filter(r=>filter==='all'||r[3]===filter),content=$('#demo-content');
 content.innerHTML=`<div class="demo-summary">${(ar?[['مركبات نشطة','18'],['توصيل في الموعد','94%'],['شحنات في الطريق','32']]:[['Active vehicles','18'],['On-time deliveries','94%'],['In transit','32']]).map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div><div class="demo-tabs" aria-label="${ar?'تصفية الشحنات':'Filter deliveries'}">${data.demoFilter.map((t,i)=>`<button data-fleet-filter="${labels[i]}" aria-pressed="${filter===labels[i]}">${t}</button>`).join('')}</div>${table(ar?['شحنة تجريبية','المسار','المركبة','الحالة']:['Sample delivery','Route','Vehicle','Status'],rows.map(r=>[...r.slice(0,3),r[3]==='transit'?data.demoFilter[1]:data.demoFilter[2]]))}<p class="form-note" role="status">${ar?`${rows.length} من ${fleetRows.length} شحنات تجريبية`:`Showing ${rows.length} of ${fleetRows.length} sample deliveries`}</p>`;
 $$('[data-fleet-filter]',content).forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.fleetFilter;renderFleet(v);$(`[data-fleet-filter="${v}"]`,content).focus();}));
}
$$('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
 lastDemoTrigger=button;const isClinic=button.dataset.demo==='clinic';$('#demo-title').textContent=data.demoNames[isClinic?0:1];isClinic?renderClinic():renderFleet();dialog.showModal();document.body.classList.add('modal-open');$('.dialog-close').focus();
}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastDemoTrigger?.focus();});
const form=$('#project-form');let brief='';
if(form){
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const values=Object.fromEntries(new FormData(form));
  const fields=ar?[['الاسم','name'],['البريد','email'],['الشركة','company'],['الخدمة','service'],['مرحلة المشروع','stage'],['الفكرة','idea']]:[['Name','name'],['Email','email'],['Company','company'],['Service','service'],['Project stage','stage'],['Project idea','idea']];
  brief=`${data.brand.name} — ${ar?'موجز المشروع':'PROJECT BRIEF'}\n\n`+fields.filter(([,k])=>values[k]).map(([label,key])=>`${label}: ${values[key].trim()}`).join('\n\n');
  $('#brief-preview').textContent=brief;form.hidden=true;$('#brief-result').hidden=false;$('#brief-result').focus();
  const email=$('#email-brief');if(email)email.href=`mailto:${encodeURIComponent(data.brand.email)}?subject=${encodeURIComponent(data.brand.name+' — '+values.service)}&body=${encodeURIComponent(brief)}`;
 });
 $('#edit-brief').addEventListener('click',()=>{$('#brief-result').hidden=true;form.hidden=false;$('input',form).focus();});
 $('#download-brief').addEventListener('click',()=>{const blob=new Blob(['\ufeff'+brief],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='project-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 const requested=new URLSearchParams(location.search).get('service');if(requested){const option=[...form.elements.service.options].find(x=>x.value===requested);if(option)form.elements.service.value=requested;}
}
})();

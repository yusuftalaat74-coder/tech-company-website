import {offerCopy, offerPlans, testimonials, launchActive} from './offers.mjs';

const usd = n => '$' + n.toLocaleString('en-US');

// h = {esc, br, icon, eyebrow, heading, brand, locale}
const waLink = (brand, text) => brand.whatsapp ? `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}` : '';

function planRow(h, c, plan, active) {
  const {esc} = h;
  const half = Math.round(plan.official / 2);
  const from = plan.from ? `<small>${esc(c.from)}</small> ` : '';
  const per = plan.perBranch ? ` <small>${esc(c.perBranch)}</small>` : '';
  const setup = active
    ? `<span class="offer-price-launch">${from}<bdi>${usd(half)}</bdi></span><s class="offer-price-regular" aria-label="${esc(c.regular)}"><bdi>${usd(plan.official)}</bdi></s>`
    : `<span class="offer-price-launch">${from}<bdi>${usd(plan.official)}</bdi></span>`;
  return `<li class="offer-plan"><span class="offer-plan-name">${esc(c.plans[plan.key])}</span><span class="offer-plan-setup">${setup}</span><span class="offer-plan-monthly">+ <bdi>${usd(plan.monthly)}</bdi> ${esc(c.monthly)}${per}</span></li>`;
}

export function offerCard(h, id, {standalone = false} = {}) {
  const {esc, icon, brand, locale, link} = h;
  const c = offerCopy[locale], spec = offerPlans.find(p => p.id === id), s = c.sectors[id], active = launchActive();
  const wa = waLink(brand, s.wa);
  const ctaHref = wa || link('contact');
  return `<article class="offer-card${standalone ? ' offer-card-standalone' : ''}" id="offer-${id}">
<div class="offer-card-top"><span class="offer-icon">${icon(spec.icon)}</span><div><h3>${esc(s.name)}</h3><p class="offer-product"><bdi>${esc(s.product)}</bdi></p></div>${active ? `<span class="offer-badge">${esc(c.badge)}</span>` : ''}</div>
<p class="offer-promise">${esc(s.promise)}</p>
<ul class="offer-items">${s.items.map(i => `<li>${icon('check')}${esc(i)}</li>`).join('')}</ul>
<p class="offer-proof">${icon('spark')}<span>${esc(s.proof)}</span></p>
<ul class="offer-plans">${spec.plans.map(p => planRow(h, c, p, active)).join('')}</ul>
<p class="offer-delivery"><span>${esc(c.delivery)}</span><strong>${esc(s.delivery)}</strong></p>
<a class="button primary offer-cta" href="${ctaHref}"${wa ? ' target="_blank" rel="noopener"' : ''} data-lead="${id}">${esc(s.cta)}${icon('diagonal')}</a>
${standalone && !h.home ? `<a class="text-link offer-all" href="${link('')}#offers">${esc(c.allPrices)}${icon('arrow')}</a>` : ''}
</article>`;
}

export function offersSection(h) {
  const {esc, eyebrow, br, icon, locale} = h;
  const c = offerCopy[locale], active = launchActive();
  return `<section class="section offers-section" id="offers"><div class="section-heading reveal"><div>${eyebrow(active ? c.eyebrow : c.hero.eyebrow)}<h2>${br(c.title)}</h2></div><p class="section-intro">${esc(c.desc)}</p></div>
<div class="offer-grid">${offerPlans.map(p => offerCard({...h, home: true}, p.id)).join('')}</div>
<p class="offer-note">${esc(active ? c.note : c.afterNote)}</p>
<div class="offer-steps"><h3>${esc(c.stepsTitle)}</h3><ol>${c.steps.map(([t, d], i) => `<li><span>0${i + 1}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join('')}</ol></div>
</section>`;
}

export function testimonialsSection(h) {
  const {esc, locale} = h;
  const items = testimonials.filter(t => t.approved && (t.quote[locale] || t.quote.en));
  if (!items.length) return '';
  return `<section class="section testimonials-section"><div class="testimonial-grid">${items.map(t => `<figure class="testimonial"><blockquote>“${esc(t.quote[locale] || t.quote.en)}”</blockquote><figcaption>${esc(t.name || '')}${t.role ? ' · ' + esc(t.role) : ''} <bdi>${esc(t.client)}</bdi></figcaption></figure>`).join('')}</div></section>`;
}

export function faqSection(h) {
  const {esc, locale} = h;
  const c = offerCopy[locale];
  return `<section class="section offer-faq" id="faq"><h2>${esc(c.faqTitle)}</h2><div>${c.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section>`;
}

export function offerHero(h, asset) {
  const {esc, icon, brand, locale} = h;
  const c = offerCopy[locale].hero;
  const wa = brand.whatsapp ? waLink(brand, ({ar: 'مرحبًا AFRICA TECH، أريد معرفة المزيد.', en: 'Hello AFRICA TECH, I would like to know more.', fr: 'Bonjour AFRICA TECH, je souhaite en savoir plus.', pt: 'Olá AFRICA TECH, gostaria de saber mais.'})[locale]) : '';
  return {eyebrow: c.eyebrow, lines: c.lines, desc: c.desc,
    buttons: `<a class="button primary" href="#offers">${esc(c.primary)}${icon('diagonal')}</a>${wa ? `<a class="button secondary" href="${wa}" target="_blank" rel="noopener" data-lead="hero">${esc(c.secondary)}${icon('whatsapp')}</a>` : ''}`};
}

// Optional analytics. Rendered only when IDs are configured in the brand settings.
export function analyticsTags(brand) {
  let out = '';
  if (brand.metaPixelId && /^\d{6,20}$/.test(brand.metaPixelId)) {
    out += `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${brand.metaPixelId}');fbq('track','PageView');</script>`;
  }
  if (brand.ga4Id && /^G-[A-Z0-9]{4,20}$/.test(brand.ga4Id)) {
    out += `<script async src="https://www.googletagmanager.com/gtag/js?id=${brand.ga4Id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${brand.ga4Id}');</script>`;
  }
  // Every WhatsApp click counts as a lead in both tools.
  out += `<script>document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="wa.me/"]');if(!a)return;var src=a.getAttribute('data-lead')||'whatsapp';if(window.fbq)fbq('track','Lead',{content_name:src});if(window.gtag)gtag('event','generate_lead',{method:'whatsapp',source:src});});</script>`;
  return out;
}

import {motionCopy} from '../src/motion-content.mjs';
import {readFile} from 'node:fs/promises';
import brand from '../src/brand.mjs';
import {ui,services,sectors} from '../src/content.mjs';
import {expansion} from '../src/expansion.mjs';
export const defaults={brand,ui,services,sectors,expansion,motionCopy};
export async function loadContent(){try{return JSON.parse(await readFile('content/site.json','utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return structuredClone(defaults);}}
export function validateContent(data){
 if(!data||typeof data!=='object'||!data.brand||!data.ui)throw Error('Invalid site content');
 const b=data.brand;
 if(typeof b.name!=='string'||b.name.length<1||b.name.length>100)throw Error('Invalid company name');
 for(const k of ['accent','accentBright','surface','ink'])if(!/^#[a-f0-9]{6}$/i.test(b[k]))throw Error('Invalid colour');
 if(b.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))throw Error('Invalid email');
 if(b.whatsapp&&!/^\d{7,15}$/.test(b.whatsapp))throw Error('Invalid WhatsApp number');
 for(const k of ['siteUrl','bookingUrl'])if(b[k]&&!/^https:\/\/[^\s]+$/.test(b[k]))throw Error('Links must use HTTPS');
 if(!Array.isArray(b.locales)||b.locales.some(l=>!['ar','en','fr','pt'].includes(l))||!b.locales.includes(b.defaultLocale))throw Error('Invalid languages');
 if(!b.motion||!Array.isArray(b.motion.scenes)||!Array.isArray(b.motion.partners))throw Error('Invalid motion settings');
 if(b.motion.duration<6||b.motion.duration>30||b.motion.globeSpeed<.1||b.motion.globeSpeed>3)throw Error('Motion speed outside range');
 if(new Set(b.motion.scenes.map(s=>s.id)).size!==b.motion.scenes.length)throw Error('Duplicate scene IDs');
 for(const s of b.motion.scenes){if(!/^[a-z0-9-]+$/.test(s.id)||!['beauty','flight','dining','studio'].includes(s.type)||!/^#[a-f0-9]{6}$/i.test(s.color))throw Error('Invalid scene');}
 for(const item of [...b.motion.scenes,...b.motion.partners])for(const k of ['url','image','logo'])if(item[k]&&!/^(https:\/\/[^\s]+|\/assets\/uploads\/[a-zA-Z0-9._-]+)$/.test(item[k]))throw Error('Image and website URLs must be HTTPS or uploaded files');
 for(const l of ['en','ar','fr','pt'])if(!data.ui[l]||!data.expansion[l])throw Error('Missing translation');
 if(data.services.length!==defaults.services.length||data.sectors.length!==defaults.sectors.length)throw Error('Service and sector route counts cannot be changed here');
 data.services.forEach((s,i)=>{if(s.slug!==defaults.services[i].slug)throw Error('Keep service routes unchanged');});data.sectors.forEach((s,i)=>{if(s.slug!==defaults.sectors[i].slug)throw Error('Keep sector routes unchanged');});
 return data;
}

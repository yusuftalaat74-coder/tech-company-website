import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
async function walk(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk('dist'),html=files.filter(f=>f.endsWith('.html')),failures=[];
for(const file of html){const text=await readFile(file,'utf8');
 for(const [,url]of text.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(url))continue;
  let target=path.resolve(path.dirname(file),url.split(/[?#]/)[0]);
  try{let s=await stat(target);if(s.isDirectory())await stat(path.join(target,'index.html'));}catch{failures.push(`${file}: missing ${url}`);}
 }
 if(!/<html lang="(en|ar)"/.test(text))failures.push(`${file}: missing language`);
 if(file.includes('/ar/')&&!text.includes('dir="rtl"'))failures.push(`${file}: missing RTL`);
 const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(ids.length!==new Set(ids).size)failures.push(`${file}: duplicate IDs`);
 if(/undefined|\[object Object\]/.test(text))failures.push(`${file}: invalid rendered content`);
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`Checked ${html.length} HTML files: all local links and assets resolve; languages, RTL and IDs verified.`);

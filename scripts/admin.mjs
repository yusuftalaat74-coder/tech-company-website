import http from 'node:http';
import path from 'node:path';
import {readFile,writeFile,mkdir,copyFile,rename,stat,unlink} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {spawn} from 'node:child_process';
import {loadContent,validateContent} from './content-store.mjs';
const port=Number(process.env.ADMIN_PORT||4188),host='127.0.0.1',origin=`http://${host}:${port}`,token=randomBytes(32).toString('hex');let busy=false;
function run(command,args){return new Promise((resolve,reject)=>{const p=spawn(command,args,{cwd:process.cwd(),env:process.env});let out='';p.stdout.on('data',d=>out+=d);p.stderr.on('data',d=>out+=d);p.on('error',reject);p.on('close',code=>code===0?resolve(out):reject(Error(out.slice(-1500))))})}
async function jsonBody(req,limit=9*1024*1024){let bytes=0,chunks=[];for await(const c of req){bytes+=c.length;if(bytes>limit)throw Error('Request too large');chunks.push(c)}return JSON.parse(Buffer.concat(chunks).toString())}
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data))}
async function save(data){
 validateContent(data);await mkdir('content',{recursive:true});await mkdir('.admin-backups',{recursive:true});
 let previous=null;try{previous=await readFile('content/site.json');await writeFile(`.admin-backups/content-${Date.now()}.json`,previous);}catch(e){if(e.code!=='ENOENT')throw e}
 await writeFile('content/site.json.tmp',JSON.stringify(data,null,2)+'\n');await rename('content/site.json.tmp','content/site.json');
 try{await run(process.execPath,['scripts/build.mjs']);await run(process.execPath,['scripts/check.mjs']);}
 catch(e){if(previous)await writeFile('content/site.json',previous);else await unlink('content/site.json');await run(process.execPath,['scripts/build.mjs']);throw Error('لم يتم حفظ التعديل؛ تمت استعادة النسخة السابقة. '+e.message);}
}

const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{
 if(req.headers.host!==`${host}:${port}`){res.writeHead(403);res.end('Forbidden host');return}
 const url=new URL(req.url,origin);
 if(url.pathname.startsWith('/api/')){
  if(req.method==='GET'&&url.pathname==='/api/content'){json(res,200,{content:await loadContent(),token});return}
  if(req.method!=='POST'||req.headers.origin!==origin||req.headers['x-admin-token']!==token||!req.headers['content-type']?.startsWith('application/json')){json(res,403,{error:'غير مسموح'});return}
  if(busy){json(res,409,{error:'يوجد حفظ أو نشر قيد التنفيذ'});return}
  const body=await jsonBody(req);
  if(url.pathname==='/api/upload'){
   const b=Buffer.from(body.data||'','base64');if(b.length>6*1024*1024)throw Error('Image exceeds 6 MB');
   let ext;if(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))ext='png';else if(b[0]===255&&b[1]===216&&b[2]===255)ext='jpg';else if(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP')ext='webp';else throw Error('Only PNG, JPEG and WebP are accepted');
   await mkdir('assets/uploads',{recursive:true});const name=randomBytes(12).toString('hex')+'.'+ext;await writeFile('assets/uploads/'+name,b);await mkdir('dist/assets/uploads',{recursive:true});await copyFile('assets/uploads/'+name,'dist/assets/uploads/'+name);json(res,200,{url:'/assets/uploads/'+name});return;
  }
  if(!['/api/save','/api/publish'].includes(url.pathname)){json(res,404,{error:'Not found'});return}
  busy=true;try{await save(body);if(url.pathname==='/api/publish'){
   const remote=(await run('git',['remote','get-url','origin'])).trim();if(remote!=='https://github.com/yusuftalaat74-coder/tech-company-website.git')throw Error('Unexpected repository: check publication configuration');
   await run('git',['add','src','assets','dist','content','admin','scripts','package.json','README.md','.gitignore']);
   const staged=await run('git',['diff','--cached','--name-only']);if(staged.trim())await run('git',['commit','-m','Update website content from dashboard']);await run('git',['push','origin','main']);json(res,200,{message:'تم رفع التحديث إلى GitHub. سيظهر على الموقع بعد اكتمال نشر GitHub Pages.'});
  }else json(res,200,{message:'تم الحفظ وبناء المعاينة بنجاح. لم يتم تغيير الموقع العام.'});}finally{busy=false}return;
 }
 let base,relative;if(url.pathname.startsWith('/admin')){base=path.resolve('admin');relative=url.pathname.slice(6)||'/index.html'}else if(url.pathname.startsWith('/preview/')){base=path.resolve('dist');relative=url.pathname.slice(8)}else if(url.pathname.startsWith('/assets/')){base=path.resolve('dist/assets');relative=url.pathname.slice(7)}else if(url.pathname==='/'){res.writeHead(302,{Location:'/admin/'});res.end();return}else{res.writeHead(404);res.end('Not found');return}
 let file=path.resolve(base,'.'+decodeURIComponent(relative));if(!file.startsWith(base+path.sep)&&file!==base)throw Error('Invalid path');if((await stat(file)).isDirectory())file=path.join(file,'index.html');res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN'});res.end(await readFile(file));
 }catch(e){json(res,e.code==='ENOENT'?404:400,{error:e.message})}
}).listen(port,host,()=>console.log(`Dashboard: ${origin}/admin/ (local only)`));

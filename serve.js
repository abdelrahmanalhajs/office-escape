// tiny static server for local preview: node serve.js
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'docs'),T={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);
  if(!f.startsWith(root))return r.writeHead(403).end();
  fs.readFile(f,(e,d)=>{if(e)return r.writeHead(404).end('not found');r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream','cache-control':'no-store'});r.end(d);});
}).listen(process.env.PORT||4173);

import fs from 'node:fs';
import vm from 'node:vm';
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html'))){
 let rendered='';
 const mock={classList:{add(){},remove(){},toggle(){return false}},setAttribute(){},addEventListener(){},querySelector(){return mock},getBoundingClientRect(){return {}},close(){},showModal(){}};
 const doc={getElementById(){return {set innerHTML(v){rendered=v}}},querySelector(){return mock},querySelectorAll(){return []},body:mock};
 vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),{location:{pathname:'/'+file},document:doc});
 if(!rendered.includes('<main>')||!rendered.includes('0612593998')||!rendered.includes('0842492255'))throw Error(file);
 for(const m of rendered.matchAll(/href="([^"]+\.html)"/g))if(!fs.existsSync('dist/'+m[1]))throw Error('Missing '+m[1]);
 console.log(file+' render and internal links OK');
}

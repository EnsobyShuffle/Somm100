import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const cache=new Map();
export function moduleUrl(path){
 const absolute=path instanceof URL?path:new URL(path,import.meta.url),key=absolute.href;
 if(cache.has(key))return cache.get(key);
 let code;
 if(key.endsWith('.json'))code='export default '+readFileSync(absolute,'utf8');
 else{
  code=ts.transpileModule(readFileSync(absolute,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
  code=code.replace(/(\bfrom\s*|\bimport\s*)(['"])(\.[^'"]+)\2/g,(_,prefix,quote,spec)=>{
   let child=new URL(spec,absolute);if(!existsSync(fileURLToPath(child))){child=new URL(spec+'.ts',absolute);if(!existsSync(fileURLToPath(child)))child=new URL(spec+'.tsx',absolute)}
   return prefix+JSON.stringify(moduleUrl(child));
  });
 }
 const value='data:text/javascript;base64,'+Buffer.from(code).toString('base64');cache.set(key,value);return value;
}
export const loadTypeScript=path=>import(moduleUrl(path));

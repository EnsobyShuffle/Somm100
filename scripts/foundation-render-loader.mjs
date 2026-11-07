// Test-only Node adapter. App logic and React hooks are never replaced.
import {readFile,access} from 'node:fs/promises';
import {transformWithOxc} from 'vite';
export async function load(url, context, nextLoad) {
  if (url.startsWith('file:') && /\.tsx?$/.test(url)) {
    const {code}=await transformWithOxc(await readFile(new URL(url),'utf8'),new URL(url).pathname);
    return {format:'module',source:code,shortCircuit:true};
  }
  if (url.startsWith('file:') && url.endsWith('.css')) {
    return {format:'module', source:'export default {};', shortCircuit:true};
  }
  if (url.startsWith('file:') && url.endsWith('.json')) {
    return {format:'module', source:`export default ${await readFile(new URL(url), 'utf8')};`, shortCircuit:true};
  }
  return nextLoad(url, context);
}

// Match the bundler's extensionless local JavaScript imports in quiz wrappers.
export async function resolve(specifier, context, nextResolve) {
  if (/^\.\.?\//.test(specifier) && !specifier.split('/').at(-1).includes('.')) {
    for(const extension of ['.js','.tsx','.ts','.mjs']) {
      try {await access(new URL(specifier+extension,context.parentURL));}
      catch {continue;}
      return nextResolve(specifier+extension,context);
    }
  }
  return nextResolve(specifier, context);
}

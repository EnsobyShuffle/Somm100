// Test-only Node adapter. App logic and React hooks are never replaced.
import {readFile} from 'node:fs/promises';
export async function load(url, context, nextLoad) {
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
  if (specifier.startsWith('./') && !specifier.split('/').at(-1).includes('.')) {
    return nextResolve(specifier + '.js', context);
  }
  return nextResolve(specifier, context);
}

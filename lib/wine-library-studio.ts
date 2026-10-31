export const studioStorageKey='somm100-wine-library-studio-v1';
export const studioKinds=['region','appellation','producer','wine','grape'] as const;
export type StudioEntry={id:string;kind:string;values:Record<string,string>;completed:boolean;updatedAt:string};
export type StudioState={entries:StudioEntry[];libraryDone:Record<string,boolean>};
export function readStudio(raw:string|null):StudioState {
 if(!raw)return {entries:[],libraryDone:{}};
 const data=JSON.parse(raw), entries=Array.isArray(data)?data:data?.entries, done=Array.isArray(data)?{}:data?.libraryDone??{};
 if(!Array.isArray(entries)||!done||typeof done!=='object'||Array.isArray(done))throw new Error('Invalid workspace');
 const normalized=entries.map((e,i)=>{
  if(!e||!studioKinds.includes(e.kind)||!e.values||typeof e.values!=='object'||Array.isArray(e.values)||!Object.values(e.values).every(v=>typeof v==='string')||typeof e.values.name!=='string'||typeof e.completed!=='boolean'||typeof e.updatedAt!=='string')throw new Error('Invalid entry');
  return {...e,id:typeof e.id==='string'&&e.id?e.id:`legacy-${i}`} as StudioEntry;
 });
 if(new Set(normalized.map(e=>e.id)).size!==normalized.length)throw new Error('Duplicate entry');
 if(Object.values(done).some(v=>typeof v!=='boolean'))throw new Error('Invalid completion state');
 return {entries:normalized,libraryDone:done};
}
export function writeStudio(storage:Pick<Storage,'setItem'>,state:StudioState) {
 // Validate before replacing the saved workspace. Callers retain their form if saving fails.
 readStudio(JSON.stringify(state));
 storage.setItem(studioStorageKey,JSON.stringify(state));
}
export function upsertStudioEntry(entries:StudioEntry[],entry:StudioEntry):StudioEntry[]{
 return entries.some(e=>e.id===entry.id)?entries.map(e=>e.id===entry.id?entry:e):[entry,...entries];
}

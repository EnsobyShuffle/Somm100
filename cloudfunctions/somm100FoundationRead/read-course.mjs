import {createHash} from 'node:crypto';
import {validatePublishedCourse} from './contract.mjs';

export async function readCourse(identity, config, download) {
  if (!identity?.uid || identity.isAnonymous !== false) return {status:401};
  const enrolled = (config.SOMM100_FOUNDATION_UIDS || '').split(/[\s,]+/).filter(Boolean);
  if (!enrolled.includes(identity.uid)) return {status:403};
  const file = config.SOMM100_FOUNDATION_RELEASE_FILE;
  const digest = config.SOMM100_FOUNDATION_RELEASE_SHA256;
  if (!file?.startsWith('cloud://') || !/^[0-9a-f]{64}$/.test(digest || '')) return {status:503};
  try {
    const bytes = await download(file);
    if (createHash('sha256').update(bytes).digest('hex') !== digest) return {status:503};
    const data = JSON.parse(bytes.toString('utf8'));
    if (!validatePublishedCourse(data)) return {status:503};
    return {status:200, course:{schema:data.schema, audience:data.audience, approved:true, entries:data.entries}};
  } catch {
    return {status:503};
  }
}

import cloudbase from '@cloudbase/js-sdk/app';
import {registerAuth} from '@cloudbase/js-sdk/auth';
import {registerFunctions} from '@cloudbase/js-sdk/functions';

registerAuth(cloudbase);
registerFunctions(cloudbase);
const app = cloudbase.init({
  env: import.meta.env.VITE_SOMM100_COURSE_ENV,
  accessKey: import.meta.env.VITE_SOMM100_COURSE_PUBLISHABLE_KEY,
  region: 'ap-shanghai',
});
const auth = app.auth();
export function signIn() {
  return auth.toDefaultLoginPage({redirect_uri: window.location.href});
}
export function onSessionChange(refresh: () => void) {
  const {data} = auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') refresh();
  });
  return () => data.subscription.unsubscribe();
}
export async function loadCourse() {
  const {data, error} = await auth.getSession();
  if (error) throw new Error('Session unavailable');
  if (!data?.session) return {status:401};
  const {result} = await app.callFunction({name:'somm100FoundationRead', data:{}});
  return result as {status:number; course?:unknown};
}

// Event function. Caller identity comes exclusively from CloudBase's invocation context.
const cloudbase = require('@cloudbase/node-sdk');

exports.main = async () => {
  const env = process.env.TCB_ENV || process.env.SCF_NAMESPACE;
  if (!env) return {status:503};
  const app = cloudbase.init({env});
  const {readCourse} = await import('./read-course.mjs');
  return readCourse(app.auth().getUserInfo(), process.env, async fileID => {
    const result = await app.downloadFile({fileID});
    return result.fileContent;
  });
};

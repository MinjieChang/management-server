const formidable = require('formidable');
const url = require('url');
const path = require('path');
const compact = require('lodash/compact');
const {
  createTalk,
  getTalkByAuthorId,
  getTalks,
  removeTalkById,
} = require('../dao/talk');
const { assertTruth, removeUndefined, removeFiles } = require('../util');
const logger = require('../util/logger');

// var timeago = require("timeago.js");
// var gm = require("gm");

// 处理上传的图片
const uploadDir = `${process.cwd()}/public/upload/`;
exports.uploadPic = async ({ req }) => {
  logger.info('上传文件', req);
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  const result = await new Promise(resolve => {
    form.parse(req, (err, fileds, files) => {
      if (
        files.file.type !== 'image/jpeg' &&
        files.avatar.type !== 'image/png'
      ) {
        resolve({ success: 0 });
      }
      const purepath = path.basename(url.parse(files.file.path).pathname);
      resolve({ success: 1, picPath: purepath });
    });
  });
  return result;
};

// 发帖
exports.submitShuoShuo = async ({ text, userId, pathArr }) => {
  const savedTalk = await createTalk({
    author: userId,
    text,
    pathArr,
  });
  assertTruth({
    value: savedTalk && savedTalk.author,
    message: 'server error',
  });
  return { id: savedTalk._id };
};

exports.getTalksByAuthorId = async ({ authorId }) => {
  const talks = await getTalkByAuthorId(authorId);
  assertTruth({
    value: talks,
    message: 'db read error',
  });
  return { data: talks };
};

exports.init = async ({ query: { skip, limit, ...rest } }) => {
  const match = removeUndefined({
    author: rest.author,
  });
  const talks = await getTalks({ skip, limit, match });
  assertTruth({
    value: talks,
    message: 'server error',
  });
  return { talks };
};

// 删帖
exports.removeTalk = async ({ id, pathArr }) => {
  const removedTalk = await removeTalkById(id);
  logger.info(`to removed files is: ${pathArr}`);
  if (pathArr && pathArr.length) {
    const pwd = path.join(__dirname, '../public/upload');
    const paths = compact(pathArr).map(filename => `${pwd}/${filename}`);
    logger.info(`to removed paths is: ${paths}`);
    removeFiles(paths);
  }
  assertTruth({
    value: removedTalk,
    message: 'db error remove failed',
  });
  return { id: removedTalk._id };
};

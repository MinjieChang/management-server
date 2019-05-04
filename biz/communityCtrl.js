const formidable = require('formidable');
const url = require('url');
const path = require('path');
const compact = require('lodash/compact');
const {
  createTalk,
  getTalkById,
  getTalks,
  removeTalkById,
  collectTalkById,
  likeTalkById,
} = require('../dao/talk');
const {
  createComment,
  findCommentsByTalkId,
  findCommentById,
} = require('../dao/comment');
const { createReply, findReplysByCommentId } = require('../dao/reply');
const { findOneById } = require('../dao/account');
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

exports.getTalkById = async ({ id }) => {
  const talk = await getTalkById(id);
  assertTruth({
    value: talk,
    message: 'db read error',
  });
  return { talk };
};

exports.init = async ({ query: { accountId, skip, limit, ...rest } }) => {
  const match = removeUndefined({
    author: rest.author,
  });
  const talks = await getTalks({ accountId, skip, limit, match });
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

// 收藏
exports.collectTalk = async ({ accountId, talkId, status }) => {
  logger.info(
    `collect talk accountId:${accountId}, talkId:${talkId}, status:${status}`,
  );
  const query = await collectTalkById({ accountId, talkId, status });
  assertTruth({
    value: query,
    message: 'db error, collect talk failed',
  });
  const { ok } = query;
  return { ok };
};

// 点赞
exports.likeTalk = async ({ accountId, talkId, status }) => {
  logger.info(
    `like talk accountId:${accountId}, talkId:${talkId}, status:${status}`,
  );
  const query = await likeTalkById({ accountId, talkId, status });
  assertTruth({
    value: query,
    message: 'db error, like talk failed',
  });
  const { ok } = query;
  return { ok };
};

// 评论
exports.commentTalk = async ({ talkId, commenterId, content }) => {
  logger.info(
    `commentTalk talkId is:${talkId}, commenterId is ${commenterId}, content is ${content}`,
  );
  const comment = await createComment({ talkId, commenterId, content });
  assertTruth({
    value: comment,
    message: 'db error, create comment failed',
  });
  const { _id } = comment;
  return { _id };
};

// 获取评论
exports.getTalkComments = async ({ talkId }) => {
  logger.info(`getTalkComments talkId is:${talkId}`);
  const comments = await findCommentsByTalkId(talkId);
  assertTruth({
    value: comments,
    message: 'db error, find comments failed',
  });
  return { comments };
};

// 回复评论
exports.replyComment = async ({
  talkId,
  commentId,
  accountId,
  beReplierId,
  replyContent,
}) => {
  logger.info(`replyComment commentId is:${commentId}`);
  // 判断有无此评论
  const comment = await findCommentById(commentId);
  assertTruth({
    value: comment,
    message: 'db error, find comment failed',
  });
  const result = await createReply({
    talkId,
    commentId,
    accountId,
    beReplierId,
    replyContent,
  });
  assertTruth({
    value: result,
    message: 'db error, update replys failed',
  });
  console.log(result, 'result+++++++');
  const { _id } = result;
  return _id;
};

// 获取评论下的回复
exports.getReplys = async ({ commentId }) => {
  const replys = await findReplysByCommentId(commentId);
  assertTruth({
    value: replys,
    message: 'db error, find replys failed',
  });
  console.log(replys);
  return replys;
};

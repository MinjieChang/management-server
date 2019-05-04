const validate = require('express-validation');
const express = require('express');
const communityCtrl = require('../biz/communityCtrl');
const { checkLogin } = require('../middleware/check.js');
const {
  addTalks,
  getById,
  removeById,
  collectTalk,
  likeTalk,
  commentTalk,
  getTalkComments,
  replyComment,
  getReplys,
} = require('./validation/community');
const { createRouteHandler } = require('../util');

const communityRouter = new express.Router();
// 上传图片
communityRouter.post(
  '/uploadPic',
  createRouteHandler(({ req }) => communityCtrl.uploadPic({ req })),
);
// 发表说说
communityRouter.post(
  '/submitTalk',
  checkLogin,
  validate(addTalks),
  createRouteHandler(({ body }) => communityCtrl.submitShuoShuo({ ...body })),
);
// 初始获取说说
communityRouter.get(
  '/init',
  createRouteHandler(({ query }) => communityCtrl.init({ query })),
);

// 通过id获取
communityRouter.get(
  '/getTalkById',
  validate(getById),
  createRouteHandler(({ query: { id } }) => communityCtrl.getTalkById({ id })),
);
// 删除说说
communityRouter.delete(
  '/removeTalk',
  validate(removeById),
  createRouteHandler(({ body: { id, pathArr } }) =>
    communityCtrl.removeTalk({ id, pathArr }),
  ),
);
// 收藏
communityRouter.post(
  '/collectTalk',
  validate(collectTalk),
  createRouteHandler(({ body }) => communityCtrl.collectTalk({ ...body })),
);

// 点赞
communityRouter.post(
  '/likeTalk',
  validate(likeTalk),
  createRouteHandler(({ body }) => communityCtrl.likeTalk({ ...body })),
);

// 评论
communityRouter.post(
  '/commentTalk',
  validate(commentTalk),
  createRouteHandler(({ body }) => communityCtrl.commentTalk({ ...body })),
);

// 获取评论
communityRouter.get(
  '/getTalkComments',
  validate(getTalkComments),
  createRouteHandler(({ query }) =>
    communityCtrl.getTalkComments({ ...query }),
  ),
);

// 回复评论
communityRouter.post(
  '/replyComment',
  validate(replyComment),
  createRouteHandler(({ body }) => communityCtrl.replyComment({ ...body })),
);

// 获取评论下的回复
communityRouter.get(
  '/getReplys',
  validate(getReplys),
  createRouteHandler(({ query }) => communityCtrl.getReplys({ ...query })),
);

module.exports = communityRouter;

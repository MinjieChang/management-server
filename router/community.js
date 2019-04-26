const validate = require('express-validation');
const express = require('express');
const communityCtrl = require('../biz/communityCtrl');
const { checkLogin } = require('../middleware/check.js');
const { addTalks, getById, removeById } = require('./validation/community');
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
  createRouteHandler(({ body, session }) =>
    communityCtrl.submitShuoShuo({ ...body, ...session }),
  ),
);
// 初始获取说说
communityRouter.get('/init', createRouteHandler(() => communityCtrl.init()));

// 通过id获取
communityRouter.get(
  '/getTalksById',
  validate(getById),
  createRouteHandler(({ query: { authorId } }) =>
    communityCtrl.getTalksByAuthorId({ authorId }),
  ),
);
// 删除说说
communityRouter.post(
  '/removeTalk',
  validate(removeById),
  createRouteHandler(({ body: { id } }) => communityCtrl.removeTalk({ id })),
);

module.exports = communityRouter;

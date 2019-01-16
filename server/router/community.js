const validate = require('express-validation');
const express = require('express');
const communityCtrl = require('../biz/communityCtrl');
const { checkLogin } = require('../middleware/check.js');
const { addTalks } = require('./validation/community');

const communityRouter = new express.Router();
// 上传图片
communityRouter.post('/uploadPic', communityCtrl.uploadPic);
// 发表说说
communityRouter.post(
  '/submitShuoShuo',
  // checkLogin,
  // validate(addTalks),
  communityCtrl.submitShuoShuo,
);
// 初始获取说说
communityRouter.get('/init', communityCtrl.init);
// 删除说说
communityRouter.post('/removeTalk', communityCtrl.removeTalk);

module.exports = communityRouter;

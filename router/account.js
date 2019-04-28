const express = require('express');
const validate = require('express-validation');
const accountCtrl = require('../biz/accountCtrl');
const { login, register } = require('./validation/account');
const { createRouteHandler } = require('../util');
const { checkLogin, checkNotLogin } = require('../middleware/check.js');

const accountRouter = new express.Router();

// 注册
accountRouter.post(
  '/register',
  validate(register),
  createRouteHandler(
    ({ body: { email, password, confirm, nickname, signature } }) =>
      accountCtrl.register({ email, password, confirm, nickname, signature }),
  ),
);
// 用户登录
accountRouter.post(
  '/login',
  // checkNotLogin,
  validate(login),
  createRouteHandler(({ body: { email, password }, session }) =>
    accountCtrl.login({ email, password, session }),
  ),
);
// 退出
accountRouter.post(
  '/logout',
  createRouteHandler(({ session }) => accountCtrl.logout({ session })),
);
// 邮箱验证
accountRouter.patch(
  '/emailConfirm',
  createRouteHandler(({ body: { email } }) =>
    accountCtrl.emailConfirm({ email }),
  ),
);
// 获取用户信息
accountRouter.get(
  '/accountInfo',
  createRouteHandler(({ query: { id } }) => accountCtrl.getAccountInfo({ id })),
);

module.exports = accountRouter;

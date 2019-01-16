const express = require('express');
const validate = require('express-validation');
const accountCtrl = require('../biz/accountCtrl');
const { login, register } = require('./validation/account');
const { createRouteHandler } = require('../util');
const { checkLogin } = require('../middleware/check.js');

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
  validate(login),
  createRouteHandler(({ body: { email, password }, session }) =>
    accountCtrl.login({ email, password, session }),
  ),
);
// 退出
accountRouter.get(
  '/logOut',
  createRouteHandler(({ session }) => accountCtrl.logOut({ session })),
);
// 退出后刷新页面
accountRouter.get(
  '/refresh',
  checkLogin,
  createRouteHandler(({ session }) => accountCtrl.refresh({ session })),
);
// 邮箱验证
accountRouter.patch(
  '/emailConfirm',
  createRouteHandler(({ body: { email } }) =>
    accountCtrl.emailConfirm({ email }),
  ),
);

module.exports = accountRouter;

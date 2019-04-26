/* eslint-disable no-param-reassign */
const formidable = require('formidable');
const crypto = require('crypto');
const { create, findOneByEmail } = require('../dao/account');
const { ERROR_CODE } = require('../constant');
const { assertTruth } = require('../util');
const getRandomName = require('../util/randomName');

// 验证邮箱是否被注册过
exports.emailConfirm = async ({ email }) => {
  const user = await findOneByEmail(email);
  assertTruth({
    value: !user,
    message: 'email is already existed',
  });
  return { data: true };
};

// 注册接口
exports.register = async ({ email, password, confirm, nickname, phone }) => {
  const user = await findOneByEmail(email);
  assertTruth({
    value: !user,
    message: 'email is already existed',
  });
  assertTruth({
    value: password === confirm,
    message: 'confirm donot match password',
  });
  const pwd = crypto
    .createHash('sha256')
    .update(`${password}cmj`)
    .digest('hex');
  const name = nickname || getRandomName();
  const savedUser = await create({
    email,
    password: pwd,
    name,
    phone,
  });
  assertTruth({
    value: savedUser && savedUser.email,
    errorMessage: 'server error, please retry later',
  });
  return { id: savedUser._id };
};

exports.login = async ({ email, password, session }) => {
  const doc = await findOneByEmail(email);
  assertTruth({
    value: doc,
    errorMessage: 'email not found',
  });
  const pwd = crypto
    .createHash('sha256')
    .update(`${password}cmj`)
    .digest('hex'); // 加密密码

  const { password: dbPwd, avatar, name, signature, _id } = doc;

  assertTruth({
    value: pwd === dbPwd,
    errorCode: ERROR_CODE.INVALID_PASSWORD,
    errorMessage: 'invalid password or email',
  });

  session.doLogin = true;
  session.email = email;
  session.user = doc;
  return { user: { avatar, email, name, signature, _id } };
};

// 每次请求都会携带session
exports.refresh = async ({ session }) => {
  const { email } = session;
  const user = await findOneByEmail(email);
  assertTruth({
    value: user && user.email,
    errorCode: ERROR_CODE.FORBIDDEN,
    errorMessage: 'forbidden',
  });
  return { data: true, user };
};

// 退出
exports.logOut = ({ session }) => {
  session.doLogin = false;
  return { data: true };
};

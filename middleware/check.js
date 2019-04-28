const { ERROR_CODE } = require('../constant');

exports.checkLogin = (req, res, next) => {
  if (!req.session.doLogin) {
    return res.json({
      errorCode: ERROR_CODE.FORBIDDEN,
      errorMessage: 'YOU ARE NOT LOGIN',
    });
  }
  next();
};

exports.checkNotLogin = (req, res, next) => {
  if (req.session.doLogin) {
    return res.json({
      errorCode: ERROR_CODE.FORBIDDEN,
      errorMessage: 'YOU ARE LOGIN',
    });
  }
  next();
};

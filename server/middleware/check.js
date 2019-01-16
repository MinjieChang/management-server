const { ERROR_CODE } = require('../constant');

exports.checkLogin = (req, res, next) => {
  if (!req.session.doLogin) {
    return res.json({
      errorCode: ERROR_CODE.NOT_FOUND,
      errorMessage: 'YOU ARE NOT LOGIN',
    });
  }
  next();
};

exports.checkNotLogin = (req, res, next) => {
  if (req.session.doLogin) {
    return res.json({
      errorCode: ERROR_CODE.UNKNOWN,
      errorMessage: 'YOU ARE LOGIN',
    });
  }
  next();
};

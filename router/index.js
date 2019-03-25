const accountRouter = require('./account');
// 社区动态
const communityRouter = require('./community');
// 员工信息
const staffRoter = require('./staff');

module.exports = function router(app) {
  app.use('/api/account', accountRouter);
  app.use('/api/community', communityRouter);
  app.use('/api/staff', staffRoter);
};

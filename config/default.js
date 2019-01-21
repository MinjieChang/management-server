module.exports = {
  port: 8000,
  session: {
    secret: 'managenent',
    key: 'managenent',
    maxAge: 2592000000,
  },
  mongodb: 'mongodb://127.0.0.1:27017/staffManagement',
};

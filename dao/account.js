const User = require('../models/User');

exports.create = user => {
  const u = new User(user).save();
  return u;
};

exports.findOneByEmail = email => User.findOne({ email }).exec();

exports.findOneById = id => User.findById(id).exec();

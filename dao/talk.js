const Talk = require('../models/Talk');

exports.createTalk = talk => {
  const u = new Talk(talk).save();
  return u;
};

// 通过id获取
exports.getTalkById = id => Talk.findById(id).exec();

// 通过author获取
exports.getTalkByAuthorId = id => Talk.find({ author: id }).exec();

// 获取所有
exports.getTalks = () => Talk.find().exec();

exports.removeTalkById = id => Talk.findByIdAndRemove(id).exec();

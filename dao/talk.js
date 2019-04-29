const Talk = require('../models/Talk');
const User = require('../models/User');

exports.createTalk = talk => {
  const u = new Talk(talk).save();
  return u;
};

// 通过id获取
exports.getTalkById = id => Talk.findById(id).exec();

// 通过author获取
exports.getTalkByAuthorId = id => Talk.find({ author: id }).exec();

// 获取所有
// exports.getTalks = () => Talk.find().exec();
exports.getTalks = ({ skip, limit, match }) =>
  Talk.aggregate()
    .match(match)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lookup({
      from: User.collection.collectionName,
      localField: 'author',
      foreignField: '_id',
      as: 'author',
    })
    .addFields({ author: { $arrayElemAt: ['$author', 0] } })
    .project({
      'author.password': 0,
      'author.__v': 0,
      __v: 0,
    })
    .exec();

exports.removeTalkById = id => Talk.findByIdAndRemove(id).exec();

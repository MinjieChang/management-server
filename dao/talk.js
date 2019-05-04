const Talk = require('../models/Talk');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createTalk = talk => {
  const u = new Talk(talk).save();
  return u;
};

// 通过id获取
exports.getTalkById = id => Talk.findById(id).exec();

// 通过talk获取
exports.getTalkByAuthorId = id => Talk.findById(id).exec();

// 获取所有
exports.getTalks = ({ accountId, skip, limit, match }) =>
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
    .lookup({
      from: Comment.collection.collectionName,
      localField: '_id',
      foreignField: 'talkId',
      as: 'commentsAmount',
    })
    .addFields({ commentsAmount: { $size: '$commentsAmount' } })
    .addFields({
      liked: {
        $filter: {
          input: '$likers',
          as: 'liker',
          cond: { $eq: ['$$liker', accountId] },
        },
      },
      collected: {
        $filter: {
          input: '$collectors',
          as: 'collector',
          cond: { $eq: ['$$collector', accountId] },
        },
      },
    })
    .addFields({
      liked: {
        $cond: {
          if: { $and: [{ $isArray: '$liked' }, { $size: '$liked' }] },
          then: true,
          else: false,
        },
      },
      likedAmount: {
        $cond: {
          if: { $and: [{ $isArray: '$likers' }, { $size: '$likers' }] },
          then: { $size: '$likers' },
          else: 0,
        },
      },
      collected: {
        $cond: {
          if: { $and: [{ $isArray: '$collected' }, { $size: '$collected' }] },
          then: true,
          else: false,
        },
      },
    })
    .project({
      'author.password': 0,
      'author.__v': 0,
      __v: 0,
      likers: 0,
      collectors: 0,
    })
    .exec();

exports.removeTalkById = id => Talk.findByIdAndRemove(id).exec();

exports.collectTalkById = ({ accountId, talkId, status }) => {
  if (status === false)
    return Talk.updateOne(
      { _id: talkId },
      { $pull: { collectors: accountId } },
    );
  return Talk.updateOne({ _id: talkId }, { $push: { collectors: accountId } });
};

exports.likeTalkById = ({ accountId, talkId, status }) => {
  if (status === false)
    return Talk.updateOne({ _id: talkId }, { $pull: { likers: accountId } });
  return Talk.updateOne({ _id: talkId }, { $push: { likers: accountId } });
};

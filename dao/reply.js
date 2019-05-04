const Reply = require('../models/Reply');
const User = require('../models/User');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

exports.createReply = reply => new Reply(reply).save();

// 通过replyId查找
exports.findOneById = id => Reply.findById(id).exec();

// 找某个comment下的回复
// exports.findReplysByCommentId = commentId =>
//   Reply.find({ commentId })
//     .sort({ createdAt: -1 })
//     .exec();

exports.findReplysByCommentId = commentId =>
  Reply.aggregate()
    .match({ commentId: mongoose.Types.ObjectId(commentId) })
    .sort({ createdAt: -1 })
    .lookup({
      from: User.collection.collectionName,
      localField: 'beReplierId',
      foreignField: '_id',
      as: 'beReplyer',
    })
    .addFields({ beReplyer: { $arrayElemAt: ['$beReplyer', 0] } })
    .lookup({
      from: User.collection.collectionName,
      localField: 'accountId',
      foreignField: '_id',
      as: 'replyer',
    })
    .addFields({ replyer: { $arrayElemAt: ['$replyer', 0] } })
    .project({
      'replyer.name': 1,
      'beReplyer.name': 1,
      replyContent: 1,
    })
    .exec();

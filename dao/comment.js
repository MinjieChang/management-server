const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.createComment = comment => Comment.create(comment);

exports.findCommentsByTalkId = talkId =>
  Comment.aggregate()
    .match({ talkId: mongoose.Types.ObjectId(talkId) })
    .sort({ createdAt: -1 })
    .lookup({
      from: User.collection.collectionName,
      localField: 'commenterId',
      foreignField: '_id',
      as: 'commenter',
    })
    .addFields({ commenter: { $arrayElemAt: ['$commenter', 0] } })
    .project({
      'commenter.password': 0,
    })
    .exec();

exports.findCommentById = commentId => Comment.findById(commentId).exec();

// exports.updateReplysById = ({ commentId, talkId, accountId, replyContent }) =>
//   Comment.updateOne(
//     { _id: commentId },
//     { $push: { replys: { talkId, accountId, replyContent } } },
//   ).exec();

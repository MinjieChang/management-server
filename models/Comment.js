const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    talkId: { type: mongoose.Schema.Types.ObjectId, required: true },
    commenterId: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    // replys: [
    //   {
    //     talkId: { type: mongoose.Schema.Types.ObjectId, required: true },
    //     commentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    //     accountId: { type: mongoose.Schema.Types.ObjectId, required: true },
    //     replyContent: { type: String, required: true },
    //   },
    // ],
  },
  { timestamps: true },
);

// commentSchema.index({ talkId: 1 }, { unique: true });
commentSchema.index({ _id: -1 }, { unique: true });
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

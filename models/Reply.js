// 评论回复集合

const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    commentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    talkId: { type: mongoose.Schema.Types.ObjectId, required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, required: true },
    beReplierId: { type: mongoose.Schema.Types.ObjectId, required: true },
    replyContent: { type: String },
  },
  {
    timestamps: true,
  },
);

replySchema.index({ _id: -1 }, { unique: true });
module.exports = mongoose.model('Reply', replySchema);

const mongoose = require('mongoose');

// schema就是规定的字段。
const talkSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: {
      type: String,
      required: true,
    },
    pathArr: {
      type: Array,
    },
    pv: { type: Number, default: 0 },
    collectors: [{ type: String }],
    likers: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

// 按创建时间降序查看用户talk
talkSchema.index({ _id: -1 }, { unique: true });
module.exports = mongoose.model('Talk', talkSchema);

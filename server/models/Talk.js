const mongoose = require('mongoose');

// schema就是规定的字段。
const talkSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  text: {
    type: String,
    required: true,
  },
  pathArr: {
    type: Array,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
});

// 按创建时间降序查看用户talk
// talkSchema.index({ author: 1, _id: -1 }, { unique: true });
module.exports = mongoose.model('Talk', talkSchema);

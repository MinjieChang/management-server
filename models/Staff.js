const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

staffSchema.index({ _id: -1 }, { unique: true });
module.exports = mongoose.model('Staff', staffSchema);

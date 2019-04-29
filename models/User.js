const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  isVip: {
    type: Boolean,
  },
});

// function lastModifiedPlugin(schema, options) {
//   schema.add({ lastMod: Date });

//   schema.pre('save', next => {
//     this.lastMod = new Date();
//     next();
//   });

//   if (options && options.index) {
//     schema.path('lastMod').index(options.index);
//   }
// }
// userSchema.plugin(lastModifiedPlugin, { index: true });

userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = User;

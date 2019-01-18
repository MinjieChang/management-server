const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);

function addCreatedAt(schema, options) {
  schema.add({ created_at: Date });

  schema.pre('save', next => {
    this.created_at = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('created_at').index(options.index);
  }
}

module.exports = function connectMongodb() {
  // TODO 全局插件无效
  mongoose.plugin(addCreatedAt);
  mongoose.connect(config.mongodb);
};

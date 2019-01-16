const Talk = require('../models/Talk');

exports.create = talk => {
  const u = new Talk(talk).save();
  return u;
};

const joi = require('joi');
const joiObjectId = require('joi-objectid');

module.exports = {
  searchTalks: {
    query: {
      skip: joi.number().integer(),
      limit: joi.number().integer(),
    },
  },
  addTalks: {
    body: {
      // author: joiObjectId(joi)().required(),
      userId: joiObjectId(joi)().required(),
      text: joi.string().required(),
      pathArr: joi.array(),
    },
  },
  getById: {
    query: {
      userId: joiObjectId(joi)().required(),
    },
  },
  removeById: {
    body: {
      id: joiObjectId(joi)().required(),
      pathArr: joi.array(),
    },
  },
  collectTalk: {
    body: {
      talkId: joiObjectId(joi)().required(),
      accountId: joiObjectId(joi)().required(),
      status: joi.boolean(),
    },
  },
  likeTalk: {
    body: {
      talkId: joiObjectId(joi)().required(),
      accountId: joiObjectId(joi)().required(),
      status: joi.boolean(),
    },
  },
};

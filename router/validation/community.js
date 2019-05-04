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
      id: joiObjectId(joi)().required(),
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
  commentTalk: {
    body: {
      talkId: joiObjectId(joi)().required(),
      commenterId: joiObjectId(joi)().required(),
      content: joi.string().required(),
    },
  },
  getTalkComments: {
    query: {
      talkId: joiObjectId(joi)().required(),
    },
  },
  replyComment: {
    body: {
      talkId: joiObjectId(joi)().required(),
      commentId: joiObjectId(joi)().required(),
      accountId: joiObjectId(joi)().required(),
      beReplierId: joiObjectId(joi)().required(),
      replyContent: joi.string().required(),
    },
  },
  getReplys: {
    query: {
      commentId: joiObjectId(joi)().required(),
    },
  },
};

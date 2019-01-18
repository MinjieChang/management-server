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
      email: joi.string().required(),
      text: joi.string().required(),
    },
  },
  getById: {
    query: {
      authorId: joiObjectId(joi)().required(),
    },
  },
  removeById: {
    body: {
      id: joiObjectId(joi)().required(),
    },
  },
};

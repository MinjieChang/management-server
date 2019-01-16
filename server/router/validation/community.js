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
      skip: joi.number().integer(),
      limit: joi.number().integer(),
      author: joiObjectId(joi)().required(),
      email: joi.string().required(),
      text: joi.string().required(),
    },
  },
};

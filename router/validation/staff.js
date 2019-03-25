const joi = require('joi');
const joiObjectId = require('joi-objectid');

module.exports = {
  staffAdd: {
    body: {
      name: joi.string().required(),
      birth: joi.date().required(),
      age: joi.number().integer(),
      sex: joi.string().required(),
      department: joi.string().required(),
      hireDate: joi.date().required(),
      icon: joi.string(),
      address: joi.string().required(),
      phone: joi.string().required(),
      email: joi
        .string()
        .email()
        .required(),
    },
  },
  staffDelete: {
    body: {
      id: joiObjectId(joi)().required(),
    },
  },
  batchDelete: {
    body: {
      staffIds: joi
        .array()
        .items(joiObjectId(joi)().required())
        .required(),
    },
  },
  staffUpdate: {
    params: {
      id: joiObjectId(joi)().required(),
    },
    body: {
      name: joi.string(),
      birth: joi.date(),
      age: joi.number(),
      sex: joi.string(),
      department: joi.string(),
      hireDate: joi.date(),
      icon: joi.string(),
      address: joi.string(),
      phone: joi.string(),
      email: joi.string().email(),
    },
  },
  staffGet: {
    query: {
      skip: joi.number().integer(),
      limit: joi.number().integer(),
      id: joiObjectId(joi)(),
    },
  },
};

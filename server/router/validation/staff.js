const joi = require('joi');
const joiObjectId = require('joi-objectid');

module.exports = {
  staffAdd: {
    body: {
      name: joi.string().required(),
      birth: joi.date().required(),
      age: joi.number().integer(),
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
};

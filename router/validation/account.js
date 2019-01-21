const joi = require('joi');
const joiObjectId = require('joi-objectid');
const PasswordComplexity = require('joi-password-complexity');

module.exports = {
  register: {
    body: {
      email: joi
        .string()
        .email()
        .required(),
      password: new PasswordComplexity({
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 0,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      }).required(),
      confirm: new PasswordComplexity({
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 0,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      }).required(),
      nickname: joi.string(),
    },
  },
  login: {
    body: {
      email: joi
        .string()
        .email()
        .required(),
      password: new PasswordComplexity({
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 0,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      }).required(),
    },
  },
};

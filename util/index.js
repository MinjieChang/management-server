const fs = require('fs');
const mongoose = require('mongoose');
const { PhoneNumberUtil } = require('google-libphonenumber');
const { omitBy, isUndefined } = require('lodash');
const { ERROR_CODE } = require('../constant');
const { ClientError } = require('./errors');
const logger = require('./logger');

const createErrorObj = (errorCode, errorMessage) => ({
  errorCode,
  errorMessage,
});

const castError = (error = {}) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return createErrorObj(ERROR_CODE.DUP, error.message);
  }
  return createErrorObj(error.errorCode, error.errorMessage);
};

const createRouteHandler = fn => async (req, res) => {
  const { query, body, params, session, files, fileds } = req;
  try {
    const result = await fn({
      query,
      body,
      params,
      session,
      files,
      fileds,
      req,
    });
    if (result) {
      res.json({ data: result });
    }
  } catch (error) {
    res.json(castError(error));
  }
};

const assertTruth = ({
  value,
  errorCode = ERROR_CODE.INVALID_PARAM,
  message,
}) => {
  if (!value) {
    throw new ClientError(errorCode, message);
  }
};

const toObjectId = _id => mongoose.Types.ObjectId(_id);
const objIdToStr = _id => mongoose.Types.ObjectId(_id).toString();

const phoneValid = phoneStr => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phone = phoneUtil.parse(phoneStr);
    return phoneUtil.isValidNumber(phone);
  } catch (err) {
    return false;
  }
};

const removeUndefined = obj => omitBy(obj, isUndefined);

const removeFalsy = obj =>
  omitBy(obj, v => v === null || v === '' || v === [] || v === false);

const removeFiles = files => {
  files.forEach(file => {
    if (fs.statSync(file).isFile()) {
      try {
        fs.unlinkSync(file);
      } catch (error) {
        logger.info(
          `remove file false error is: ${error.message}, file is: ${file}`,
        );
      }
    }
  });
};

module.exports = {
  createErrorObj,
  castError,
  createRouteHandler,
  assertTruth,
  toObjectId,
  objIdToStr,
  phoneValid,
  removeUndefined,
  removeFalsy,
  removeFiles,
};

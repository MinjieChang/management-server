const { ERROR_CODE } = require('../constant');
const { ClientError } = require('./errors');

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

const createRouteHandler = fn => async (req, res, next) => {
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

module.exports = {
  createErrorObj,
  castError,
  createRouteHandler,
  assertTruth,
};

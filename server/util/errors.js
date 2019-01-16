class ClientError extends Error {
  constructor(errorCode, message) {
    super(errorCode);
    this.errorCode = errorCode;
    this.errorMessage = message;
  }
}

module.exports = {
  ClientError,
};

const {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require('./constants');

module.exports.finalErrorHandler = (err, res) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;

  return res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR_CODE
        ? DEFAULT_ERROR_MESSAGE
        : message,
    });
};

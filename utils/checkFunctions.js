const {
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  INVALID_ID_MESSAGE,
  NOT_FOUND_DATA_MESSAGE,
} = require('./constants');

module.exports.checkValidationError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_DATA_MESSAGE });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports.checkTheCastError = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INVALID_ID_MESSAGE });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports.checkDoesDataExist = (data, res, answer) => {
  if (!data) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_DATA_MESSAGE });
  }
  return res.send(answer);
};

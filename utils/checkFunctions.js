const {
  INCORRECT_DATA_MESSAGE,
  INVALID_ID_MESSAGE,
  NOT_FOUND_DATA_MESSAGE,
} = require('./constants');

const IncorrectDataError = require('../errors/incorrect-data-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.checkValidationOrCastError = (err, next) => {
  if (err.name === 'ValidationError') {
    return next(new IncorrectDataError(INCORRECT_DATA_MESSAGE));
  }
  if (err.name === 'CastError') {
    return next(new IncorrectDataError(INVALID_ID_MESSAGE));
  }
  return next(err);
};

module.exports.checkDoesDataExist = (data, res, answer) => {
  if (!data) {
    throw new NotFoundError(NOT_FOUND_DATA_MESSAGE);
  }
  return res.send(answer);
};

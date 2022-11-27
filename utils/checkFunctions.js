const {
  INCORRECT_DATA_ERROR_CODE, DEFAULT_ERROR_CODE, NOT_FOUND_ERROR_CODE,
} = require('./constants');

module.exports.checkValidationError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
};

module.exports.checkTheCastError = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Невалидный id' });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
};

module.exports.checkDoesDataExist = (data, res, answer) => {
  if (!data) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая информация не найдена' });
  }
  return res.send(answer);
};

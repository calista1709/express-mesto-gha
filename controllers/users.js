const User = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE, INCORRECT_DATA_ERROR_CODE, STATUS_CREATED,
} = require('../utils/constants');

const checkDoesUserExist = (user, res) => {
  if (!user) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
  }
  return res.send(user);
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Информация не найдена' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      checkDoesUserExist(user, res);
    })
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' }));
};

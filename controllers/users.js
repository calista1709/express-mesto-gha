const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  STATUS_CREATED,
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
  SALT_NUMBER,
  SECRET_KEY,
  EXPIRES_IN_VALUE,
  AUTH_ERROR_CODE,
  AUTH_ERROR_MESSAGE,
} = require('../utils/constants');
const {
  checkValidationError,
  checkTheCastError,
  checkDoesDataExist,
} = require('../utils/checkFunctions');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => checkDoesDataExist(user, res, user))
    .catch((err) => checkTheCastError(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => checkDoesDataExist(user, res, user))
    .catch((err) => checkTheCastError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_DATA_MESSAGE });
    return;
  }

  bcrypt.hash(password, SALT_NUMBER)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.status(STATUS_CREATED).send(user);
        })
        .catch((err) => checkValidationError(err, res));
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => checkValidationError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => checkValidationError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: EXPIRES_IN_VALUE });
      res.send({ token });
    })
    .catch(() => res.status(AUTH_ERROR_CODE).send({ message: AUTH_ERROR_MESSAGE }));
};

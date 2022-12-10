const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  STATUS_CREATED,
  INCORRECT_DATA_MESSAGE,
  SALT_NUMBER,
  SECRET_KEY,
  EXPIRES_IN_VALUE,
  AUTH_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
} = require('../utils/constants');
const {
  checkValidationOrCastError,
  checkDoesDataExist,
} = require('../utils/checkFunctions');

const IncorrectDataError = require('../errors/incorrect-data-error');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => checkDoesDataExist(user, res, user))
    .catch((err) => checkValidationOrCastError(err, next));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => checkDoesDataExist(user, res, user))
    .catch((err) => checkValidationOrCastError(err, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    throw new IncorrectDataError(INCORRECT_DATA_MESSAGE);
  }

  bcrypt.hash(password, SALT_NUMBER)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.status(STATUS_CREATED).send(user);
        })
        // eslint-disable-next-line consistent-return
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError(CONFLICT_ERROR_MESSAGE));
          }
          checkValidationOrCastError(err, next);
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => checkValidationOrCastError(err, next));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => checkValidationOrCastError(err, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: EXPIRES_IN_VALUE });
      res.send({ token });
    })
    .catch(() => next(new AuthError(AUTH_ERROR_MESSAGE)));
};

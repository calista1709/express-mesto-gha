const Card = require('../models/card');
const {
  STATUS_CREATED,
  DELETE_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_DATA_MESSAGE,
} = require('../utils/constants');
const {
  checkValidationOrCastError,
  checkDoesDataExist,
} = require('../utils/checkFunctions');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => checkValidationOrCastError(err, next));
};

module.exports.deleteCardById = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  Card.findById(req.params.cardId, (err, card) => {
    if (err) {
      return next(err);
    }
    if (!card) {
      return next(new NotFoundError(NOT_FOUND_DATA_MESSAGE));
    }
    if (!card.owner._id.equals(req.user._id)) {
      return next(new ForbiddenError(FORBIDDEN_MESSAGE));
    }
    card.remove(() => res.send({ message: DELETE_MESSAGE }));
  });
};

module.exports.addLikeToCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => checkDoesDataExist(card, res, card))
    .catch((err) => checkValidationOrCastError(err, next));
};

module.exports.deleteLikeFromCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => checkDoesDataExist(card, res, card))
    .catch((err) => checkValidationOrCastError(err, next));
};

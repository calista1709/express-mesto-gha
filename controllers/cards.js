const Card = require('../models/card');
const {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  STATUS_CREATED,
  DELETE_MESSAGE,
  FORBIDDEN_ERROR_CODE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_DATA_MESSAGE,
} = require('../utils/constants');
const {
  checkValidationError,
  checkTheCastError,
  checkDoesDataExist,
} = require('../utils/checkFunctions');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => checkValidationError(err, res));
};

module.exports.deleteCardById = (req, res) => {
  // eslint-disable-next-line consistent-return
  Card.findById(req.params.cardId, (err, card) => {
    if (err) {
      return res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
    }
    if (!card) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_DATA_MESSAGE });
    }
    if (!card.owner._id.equals(req.user._id)) {
      return res.status(FORBIDDEN_ERROR_CODE).send({ message: FORBIDDEN_MESSAGE });
    }
    card.remove(() => res.send({ message: DELETE_MESSAGE }));
  });
};

module.exports.addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => checkDoesDataExist(card, res, card))
    .catch((err) => checkTheCastError(err, res));
};

module.exports.deleteLikeFromCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => checkDoesDataExist(card, res, card))
    .catch((err) => checkTheCastError(err, res));
};

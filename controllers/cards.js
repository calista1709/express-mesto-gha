const Card = require('../models/card');
const {
  DEFAULT_ERROR_CODE,
  STATUS_CREATED,
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
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => checkValidationError(err, res));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => checkDoesDataExist(card, res, { message: 'Пост удален' }))
    .catch((err) => checkTheCastError(err, res));
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

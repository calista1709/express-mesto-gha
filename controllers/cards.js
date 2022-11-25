const Card = require('../models/card');
const {
  NOT_FOUND_ERROR_CODE, INCORRECT_DATA_ERROR_CODE, STATUS_CREATED, DEFAULT_ERROR_CODE,
} = require('../utils/constants');

const checkDoesCardExist = (card, res, answer) => {
  if (!card) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пост не найден' });
  }
  return res.send(answer);
};

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
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      checkDoesCardExist(card, res, { message: 'Пост удален' });
    })
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkDoesCardExist(card, res, card);
    })
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteLikeFromCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkDoesCardExist(card, res, card);
    })
    .catch(() => res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

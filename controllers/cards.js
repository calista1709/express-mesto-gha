const Card = require('../models/card');

const checkDoesCardExist = (card, res) => {
  console.log(card);
  if (!card) {
    return res.status(404).send({ message: 'Запрашиваемый пост не найден' });
  }
  return res.status(200).send(card);
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(404).send({ message: 'Информация не найдена' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.status(200).send({ message: 'Пост удален' }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkDoesCardExist(card, res);
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteLikeFromCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkDoesCardExist(card, res);
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

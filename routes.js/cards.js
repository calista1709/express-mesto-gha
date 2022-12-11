const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');
const {
  createCardCelebrate,
  cardAndOwnerCelebrate,
} = require('../utils/celebrate');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCardCelebrate, createCard);
cardsRouter.delete('/cards/:cardId', cardAndOwnerCelebrate, deleteCardById);
cardsRouter.put('/cards/:cardId/likes', cardAndOwnerCelebrate, addLikeToCard);
cardsRouter.delete('/cards/:cardId/likes', cardAndOwnerCelebrate, deleteLikeFromCard);

module.exports = cardsRouter;

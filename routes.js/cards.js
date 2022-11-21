const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCardById);
cardsRouter.put('/cards/:cardId/likes', addLikeToCard);
cardsRouter.delete('/cards/:cardId/likes', deleteLikeFromCard);

module.exports = cardsRouter;

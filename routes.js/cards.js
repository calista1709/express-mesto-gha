const cardsRouter = require('express').Router();
const { getAllCards, createCard, deleteCardById } = require('../controllers/cards');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCardById);

module.exports = cardsRouter;

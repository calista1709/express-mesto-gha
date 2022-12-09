const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes.js/users');
const cardsRouter = require('./routes.js/cards');
const { NOT_FOUND_ERROR_CODE, NOT_FOUND_MESSAGE } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_MESSAGE });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

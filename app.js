const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes.js/users');
const cardsRouter = require('./routes.js/cards');
const { NOT_FOUND_ERROR_CODE } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '637b5e16bf7ab33ead099014',
  };

  next();
});
app.use(bodyParser.json());
app.use(usersRouter);
app.use(cardsRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Данной страницы не существует' });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes.js/users');
const cardsRouter = require('./routes.js/cards');
const {
  NOT_FOUND_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const { signInCelebrate, signUpCelebrate, authCelebrate } = require('./utils/celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.post('/signin', signInCelebrate, login);
app.post('/signup', signUpCelebrate, createUser);
app.use(authCelebrate, auth);
app.use(usersRouter);
app.use(cardsRouter);
app.use('*', () => {
  throw new NotFoundError(NOT_FOUND_MESSAGE);
});
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR_CODE
        ? DEFAULT_ERROR_MESSAGE
        : message,
    });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

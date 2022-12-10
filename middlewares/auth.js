const jwt = require('jsonwebtoken');
const { SECRET_KEY, AUTH_ERROR_MESSAGE } = require('../utils/constants');
const AuthError = require('../errors/auth-error');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_ERROR_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new AuthError(AUTH_ERROR_MESSAGE));
  }

  req.user = payload;

  next();
};

module.exports = auth;

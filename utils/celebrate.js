const { celebrate, Joi } = require('celebrate');
const { LINK_PATTERN } = require('./constants');

const signInCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LINK_PATTERN),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const paramsUserIdCelebrate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const updateUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarCelebrate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(LINK_PATTERN),
  }),
});

const createCardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(LINK_PATTERN),
  }),
});

const cardAndOwnerCelebrate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  signInCelebrate,
  signUpCelebrate,
  paramsUserIdCelebrate,
  updateUserCelebrate,
  updateAvatarCelebrate,
  createCardCelebrate,
  cardAndOwnerCelebrate,
};

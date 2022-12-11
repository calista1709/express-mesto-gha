const { celebrate, Joi } = require('celebrate');

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
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const authCelebrate = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
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
    avatar: Joi.string().required(),
  }),
});

const createCardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
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
  authCelebrate,
  paramsUserIdCelebrate,
  updateUserCelebrate,
  updateAvatarCelebrate,
  createCardCelebrate,
  cardAndOwnerCelebrate,
};

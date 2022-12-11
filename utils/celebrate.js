const { celebrate, Joi } = require('celebrate');

const signCelebrate = celebrate({
  body: Joi.object().keys({
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

const reqUserIdCelebrate = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
});

const updateUserCelebrate = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarCelebrate = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

const createCardCelebrate = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
});

const cardAndOwnerCelebrate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
});

module.exports = {
  signCelebrate,
  authCelebrate,
  paramsUserIdCelebrate,
  reqUserIdCelebrate,
  updateUserCelebrate,
  updateAvatarCelebrate,
  createCardCelebrate,
  cardAndOwnerCelebrate,
};

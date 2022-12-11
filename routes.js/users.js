const usersRouter = require('express').Router();
const {
  getAllUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');
const {
  paramsUserIdCelebrate,
  reqUserIdCelebrate,
  updateUserCelebrate,
  updateAvatarCelebrate,
} = require('../utils/celebrate');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', reqUserIdCelebrate, getUser);
usersRouter.get('/users/:userId', paramsUserIdCelebrate, getUserById);
usersRouter.patch('/users/me', updateUserCelebrate, updateUser);
usersRouter.patch('/users/me/avatar', updateAvatarCelebrate, updateAvatar);

module.exports = usersRouter;

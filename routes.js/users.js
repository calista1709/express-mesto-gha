const usersRouter = require('express').Router();
const {
  getAllUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', getUser);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;

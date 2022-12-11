const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_MESSAGE = 'Данной страницы не существует';
const NOT_FOUND_DATA_MESSAGE = 'Запрашиваемая информация не найдена';
const INCORRECT_DATA_ERROR_CODE = 400;
const INCORRECT_DATA_MESSAGE = 'Переданы некорректные данные';
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';
const INVALID_ID_MESSAGE = 'Невалидный id';
const STATUS_CREATED = 201;
const AUTH_ERROR_CODE = 401;
const AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const SALT_NUMBER = 10;
const SECRET_KEY = 'YandexPraktikum';
const EXPIRES_IN_VALUE = '7d';
const DELETE_MESSAGE = 'Пост удален';
const FORBIDDEN_ERROR_CODE = 403;
const FORBIDDEN_MESSAGE = 'Доступ к данным запрещен';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с такой почтой уже зарегистрирован';
const LINK_PATTERN = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;

module.exports = {
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_MESSAGE,
  INCORRECT_DATA_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  INVALID_ID_MESSAGE,
  STATUS_CREATED,
  AUTH_ERROR_CODE,
  AUTH_ERROR_MESSAGE,
  SALT_NUMBER,
  SECRET_KEY,
  EXPIRES_IN_VALUE,
  DEFAULT_ERROR_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  NOT_FOUND_DATA_MESSAGE,
  DELETE_MESSAGE,
  FORBIDDEN_ERROR_CODE,
  FORBIDDEN_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  LINK_PATTERN,
};

const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyAccessToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json(
        formatResponse(401, 'Токен не предоставлен', null)
      );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json(
        formatResponse(401, 'Неверный формат токена', null)
      );
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = decoded.user;

    next();
  } catch (error) {
    console.error('Ошибка проверки access токена:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(
        formatResponse(401, 'Токен истек', null)
      );
    }

    return res.status(401).json(
      formatResponse(401, 'Невалидный токен', null)
    );
  }
}

module.exports = verifyAccessToken;
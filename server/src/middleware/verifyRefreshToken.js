const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json(
        formatResponse(401, 'Refresh токен отсутствует', null)
      );
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = decoded.user;

    next();
  } catch (error) {
    console.error('Ошибка проверки refresh токена:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(
        formatResponse(401, 'Refresh токен истек', null)
      );
    }

    return res.status(401).json(
      formatResponse(401, 'Невалидный refresh токен', null)
    );
  }
}

module.exports = verifyRefreshToken;
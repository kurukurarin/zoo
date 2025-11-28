const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

/**
 * Middleware для проверки refresh токена
 * 
 * ✅ ИСПРАВЛЕНО: Используем ОДИН SECRET_REFRESH_TOKEN (как в auth.service.js)
 */
function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;  // Refresh токен идет в body (не в cookies!)

    if (!refreshToken) {
      return res.status(401).json(
        formatResponse(401, 'Refresh токен отсутствует', null)
      );
    }

    
    const secret = process.env.SECRET_REFRESH_TOKEN || 'your_super_secret_refresh_token_key_here';
    const decoded = jwt.verify(refreshToken, secret);
    
    req.user = decoded;

    next();
  } catch (error) {
    console.error('❌ Ошибка проверки refresh токена:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(
        formatResponse(401, 'Refresh токен истек', null)
      );
    }

    return res.status(401).json(
      formatResponse(401, 'Невалидный refresh токен: ' + error.message, null)
    );
  }
}

module.exports = verifyRefreshToken;
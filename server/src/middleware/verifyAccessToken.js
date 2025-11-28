const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyAccessToken(req, res, next) {
  try {
    console.log('🔍 ПРОВЕРКА ТОКЕНА:');
    console.log('📨 Headers:', req.headers);
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log('❌ Authorization header не найден!');
      return res.status(401).json(
        formatResponse(401, 'Токен не предоставлен', null)
      );
    }

    console.log('✅ Authorization header найден:', authHeader.substring(0, 20) + '...');

    const token = authHeader.split(' ')[1];

    if (!token) {
      console.log('❌ Токен не найден в заголовке!');
      return res.status(401).json(
        formatResponse(401, 'Неверный формат токена', null)
      );
    }

    console.log('✅ Токен найден:', token.substring(0, 20) + '...');
    console.log('🔐 SECRET_ACCESS_TOKEN:', process.env.SECRET_ACCESS_TOKEN ? '✅ есть' : '❌ НЕТ!');

    const secret = process.env.SECRET_ACCESS_TOKEN || 'your_super_secret_access_token_key_here';
    const decoded = jwt.verify(token, secret);
    
    console.log('✅ Токен проверен успешно:', decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.error('❌ Ошибка проверки access токена:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(
        formatResponse(401, 'Токен истек', null)
      );
    }

    return res.status(401).json(
      formatResponse(401, 'Невалидный токен: ' + error.message, null)
    );
  }
}

module.exports = verifyAccessToken;




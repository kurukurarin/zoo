const express = require('express');
const router = express.Router();

const TariffController = require('../controllers/tarrifs.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

//ТАРИФЫ ROUTES
 
// Получить текущие тарифы 
router.get('/', TariffController.getTariffs);

// Получить информацию об администраторе, который последний обновил тарифы 
router.get('/info/last-updated', TariffController.getLastUpdatedInfo);

// Обновить тарифы (только админ)
router.put(
  '/',
  verifyAccessToken,                 // проблема - не видит верифай ❌ 
  TariffController.updateTariffs
);

module.exports = router;

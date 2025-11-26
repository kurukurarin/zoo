'use strict';

const express = require('express');
const router = express.Router();

const TariffController = require('../../controllers/tariffController');
const { verifyAccessToken, verifyAdmin } = require('../../middleware/authMiddleware');

//ТАРИФЫ ROUTES
 

// Получить текущие тарифы 
router.get('/', TariffController.getTariffs);

// Получить информацию об администраторе, который последний обновил тарифы 
router.get('/info/last-updated', TariffController.getLastUpdatedInfo);

// Обновить тарифы (только админ)
router.put(
  '/',
  verifyAccessToken,
  verifyAdmin,
  TariffController.updateTariffs
);

module.exports = router;

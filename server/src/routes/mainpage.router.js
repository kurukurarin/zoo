'use strict';

const express = require('express');
const router = express.Router();

const MainPageController = require('../../controllers/mainPageController');
const { verifyAccessToken, verifyAdmin } = require('../../middleware/authMiddleware');

//ГЛАВНАЯ СТРАНИЦА ROUTES


// Получить информацию главной страницы 
router.get('/', MainPageController.getMainPage);

// Получить информацию об администраторе, который последний обновил страницу 
router.get('/info/last-updated', MainPageController.getLastUpdatedInfo);

// Обновить информацию главной страницы (только админ)
router.put(
  '/',
  verifyAccessToken,
  verifyAdmin,
  MainPageController.updateMainPage
);

module.exports = router;

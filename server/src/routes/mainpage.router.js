'use strict';

const express = require('express');
const router = express.Router();

const MainPageController = require('../controllers/mainpage.controller');
const  verifyAccessToken  = require('../middleware/verifyAccessToken');

//ГЛАВНАЯ СТРАНИЦА ROUTES

// Получить информацию главной страницы 
router.get('/', MainPageController.getMainPage);

// Получить информацию об администраторе, который последний обновил страницу 
router.get('/info/last-updated', MainPageController.getLastUpdatedInfo);

// Обновить информацию главной страницы (только админ)
router.put(
  '/',
  verifyAccessToken,                     // проблема - не видит верифай ❌ 
  // verifyAdmin,
  MainPageController.updateMainPage
);

module.exports = router;

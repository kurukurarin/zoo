'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const verifyAccessToken  = require('../middleware/verifyAccessToken');


//АУТЕНТИФИКАЦИЯ ROUTES

// Логин администратора
router.post('/login', AuthController.login);

// Обновить access token
router.post('/refresh', AuthController.refreshToken);

// Логаут
router.post('/logout', AuthController.logout);

// Получить информацию текущего администратора
router.get('/me', verifyAccessToken, AuthController.getCurrentAdmin); // проблема - не видит верифай ❌ 

module.exports = router;



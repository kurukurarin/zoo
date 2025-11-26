'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../../controllers/authController');
const { verifyAccessToken } = require('../../middleware/authMiddleware');


//АУТЕНТИФИКАЦИЯ ROUTES

// Логин администратора
router.post('/login', AuthController.login);

// Обновить access token
router.post('/refresh', AuthController.refreshToken);

// Логаут
router.post('/logout', AuthController.logout);

// Получить информацию текущего администратора
router.get('/me', verifyAccessToken, AuthController.getCurrentAdmin);

module.exports = router;



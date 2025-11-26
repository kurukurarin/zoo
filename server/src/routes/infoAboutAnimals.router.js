'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const InfoAboutAnimalController = require('../../controllers/infoAboutAnimalController');
const { verifyAccessToken, verifyAdmin } = require('../../middleware/authMiddleware');

//ИНФОРМАЦИЯ О ЖИВОТНЫХ ROUTES
//Префикс: /animals/:animalId/info

// Получить всю информацию о животном (public)
router.get('/', InfoAboutAnimalController.getInfoByAnimal);

// Создать новую информационную запись (только админ)
router.post(
  '/',
  verifyAccessToken,
  verifyAdmin,
  InfoAboutAnimalController.createInfo
);

// Обновить информационную запись (только админ)
router.put(
  '/:infoId',
  verifyAccessToken,
  verifyAdmin,
  InfoAboutAnimalController.updateInfo
);

// Удалить информационную запись (только админ)
router.delete(
  '/:infoId',
  verifyAccessToken,
  verifyAdmin,
  InfoAboutAnimalController.deleteInfo
);

module.exports = router;

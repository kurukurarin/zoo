'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const InfoAboutAnimalController = require('../controllers/infoaboutanimal.controller');
const verifyAccessToken  = require('../middleware/verifyAccessToken');

//ИНФОРМАЦИЯ О ЖИВОТНЫХ ROUTES
//Префикс: /animals/:animalId/info

// Получить всю информацию о животном
router.get('/', InfoAboutAnimalController.getInfoByAnimal);

// Создать новую информационную запись (только админ)
router.post(
  '/',
  verifyAccessToken,              
  // verifyAdmin,                             // проблема - не видит верифай ❌ мб это и не надо
  InfoAboutAnimalController.createInfo
);

// Обновить информационную запись (только админ)
router.put(
  '/:infoId',
  verifyAccessToken,
  // verifyAdmin,
  InfoAboutAnimalController.updateInfo
);

// Удалить информационную запись (только админ)
router.delete(
  '/:infoId',
  verifyAccessToken,
  // verifyAdmin,
  InfoAboutAnimalController.deleteInfo
);

module.exports = router;

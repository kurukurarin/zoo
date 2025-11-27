'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const PhotoController = require('../controllers/photoofanimal.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');


 // ФОТОГРАФИИ ROUTES
 //Префикс: /animals/:animalId/photos

// Получить все фотографии животного 
router.get('/', PhotoController.getPhotosByAnimal);

// Добавить фотографию животному 
router.post(
  '/',
  verifyAccessToken,                        // проблема - не видит верифай ❌ 
  // verifyAdmin,
  PhotoController.createPhoto
);

// Переупорядочить все фотографии животного 
router.put(
  '/reorder',
  verifyAccessToken,
  // verifyAdmin,
  PhotoController.reorderPhotos
);

// Обновить порядок фотографии (только админ)
// Примечание: этот маршрут должен быть ПОСЛЕ /reorder
router.put(
  '/:photoId',
  verifyAccessToken,
  // verifyAdmin,
  PhotoController.updatePhotoOrder
);

// Удалить фотографию (только админ)
router.delete(
  '/:photoId',
  verifyAccessToken,
  // verifyAdmin,
  PhotoController.deletePhoto
);

module.exports = router;

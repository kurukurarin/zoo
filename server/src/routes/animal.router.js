'use strict';

const express = require('express');
const router = express.Router();

const AnimalController = require('../../controllers/animalController');
const { verifyAccessToken, verifyAdmin } = require('../../middleware/authMiddleware');


// Получить всех животных 
router.get('/', AnimalController.getAllAnimals);

// Получить животное по ID 
router.get('/:id', AnimalController.getAnimalById);

// Поиск животного по названию 
router.get('/search/:name', AnimalController.searchAnimal);

// Создать новое животное (только админ)
router.post(
  '/',
  verifyAccessToken,
  verifyAdmin,
  AnimalController.createAnimal
);

// Обновить животное (только админ)
router.put(
  '/:id',
  verifyAccessToken,
  verifyAdmin,
  AnimalController.updateAnimal
);

// Удалить животное (только админ)
router.delete(
  '/:id',
  verifyAccessToken,
  verifyAdmin,
  AnimalController.deleteAnimal
);

module.exports = router;

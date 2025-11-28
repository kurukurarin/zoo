const express = require('express');
const router = express.Router();

const AnimalController = require('../controllers/animal.controller');
const  verifyAccessToken = require('../middleware/verifyRefreshToken');


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
  // verifyAdmin,                 // проблема - не видит верифай ❌ 
  AnimalController.createAnimal
);

// Обновить животное (только админ)
router.put(
  '/:id',
  verifyAccessToken,
  // verifyAdmin,
  AnimalController.updateAnimal
);

// Удалить животное (только админ)
router.delete(
  '/:id',
  verifyAccessToken,
  // verifyAdmin,
  AnimalController.deleteAnimal
);

module.exports = router;

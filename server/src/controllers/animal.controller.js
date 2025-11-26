'use strict';

const AnimalService = require('../services/animalservice');

///AnimalController - Контроллер для работы с животными
 //Обрабатывает HTTP запросы:
 //- GET /api/animals - получить всех животных
 //- GET /api/animals/:id - получить животное по ID
 // - POST /api/animals - создать новое животное (только админ)
 // - PUT /api/animals/:id - обновить животное (только админ)
 // - DELETE /api/animals/:id - удалить животное (только админ)
 // - GET /api/animals/search/:name - поиск по названию


class AnimalController {
  // Получить ВСЕ животных
   //GET /api/animals
  
  static async getAllAnimals(req, res) {
    try {
      const animals = await AnimalService.getAllAnimals();

      return res.status(200).json({
        success: true,
        message: 'Животные успешно получены',
        data: animals,
        count: animals.length,
      });
    } catch (error) {
      console.error('❌ Ошибка в AnimalController.getAllAnimals:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Получить животное по ID
  // GET /api/animals/:id
   
  static async getAnimalById(req, res) {
    try {
      const { id } = req.params;

      // Валидация ID
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      const animal = await AnimalService.getAnimalById(parseInt(id));

      return res.status(200).json({
        success: true,
        message: 'Животное успешно получено',
        data: animal,
      });
    } catch (error) {
      console.error('❌ Ошибка в AnimalController.getAnimalById:', error.message);

      if (error.message.includes('не найдено')) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //Создать новое животное (только админ)
   //POST /api/animals
   // Body:
  //{
   //  "name": "Лев",
   //   "feature": "Описание...",
   //  "mainPhotoUrl": "/images/lion.jpg" (опционально)
  // }
  
  static async createAnimal(req, res) {
    try {
      const { name, feature, mainPhotoUrl } = req.body;

      // Валидация
      if (!name || !feature) {
        return res.status(400).json({
          success: false,
          message: 'Название и описание животного обязательны',
        });
      }

      const animal = await AnimalService.createAnimal({
        name,
        feature,
        mainPhotoUrl,
      });

      return res.status(201).json({
        success: true,
        message: 'Животное успешно создано',
        data: animal,
      });
    } catch (error) {
      console.error('❌ Ошибка в AnimalController.createAnimal:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //Обновить животное (только админ)
  //PUT /api/animals/:id
   //Body:
   //{
   //  "name": "Новое название",
   //  "feature": "Новое описание",
   //  "mainPhotoUrl": "/images/new-lion.jpg"
   //}
   
  static async updateAnimal(req, res) {
    try {
      const { id } = req.params;
      const { name, feature, mainPhotoUrl } = req.body;

      // Валидация ID
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      const animal = await AnimalService.updateAnimal(parseInt(id), {
        name,
        feature,
        mainPhotoUrl,
      });

      return res.status(200).json({
        success: true,
        message: 'Животное успешно обновлено',
        data: animal,
      });
    } catch (error) {
      console.error('❌ Ошибка в AnimalController.updateAnimal:', error.message);

      if (error.message.includes('не найдено')) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //Удалить животное (только админ)
   //DELETE /api/animals/:id
  
  static async deleteAnimal(req, res) {
    try {
      const { id } = req.params;

      // Валидация ID
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      const result = await AnimalService.deleteAnimal(parseInt(id));

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('❌ Ошибка в AnimalController.deleteAnimal:', error.message);

      if (error.message.includes('не найдено')) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Поиск животного по названию
  //GET /api/animals/search/:name
   
  static async searchAnimal(req, res) {
    try {
      const { name } = req.params;

      // Валидация
      if (!name || name.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Введите название животного (минимум 2 символа)',
        });
      }

      const animals = await AnimalService.searchAnimalByName(name);

      return res.status(200).json({
        success: true,
        message: 'Поиск завершён',
        data: animals,
        count: animals.length,
      });
    } catch (error) {
      console.error('❌ Ошибка в AnimalController.searchAnimal:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AnimalController;

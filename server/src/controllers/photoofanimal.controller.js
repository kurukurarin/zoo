'use strict';

const PhotoService = require('../services/photoService');

//PhotoController - Контроллер для работы с фотографиями
 
 //Обрабатывает HTTP запросы:
 //- GET /api/animals/:animalId/photos - получить все фото животного
 //- POST /api/animals/:animalId/photos - добавить фото (только админ)
 //- PUT /api/photos/:photoId - обновить порядок фото (только админ)
 //- DELETE /api/photos/:photoId - удалить фото (только админ)
 

class PhotoController {
  // Получить все фото животного
  // GET /api/animals/:animalId/photos
  
  static async getPhotosByAnimal(req, res) {
    try {
      const { animalId } = req.params;

      // Валидация
      if (!animalId || isNaN(animalId)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      const photos = await PhotoService.getPhotosByAnimalId(parseInt(animalId));

      return res.status(200).json({
        success: true,
        message: 'Фотографии успешно получены',
        data: photos,
        count: photos.length,
      });
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.getPhotosByAnimal:', error.message);

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

  // Добавить новую фотографию животному (только админ)
   //POST /api/animals/:animalId/photos
   
   //Body:
   //{
   //  "photoUrl": "/images/lion-new.jpg",
   // "order": 4 (опционально)
   //}
  
  static async createPhoto(req, res) {
    try {
      const { animalId } = req.params;
      const { photoUrl, order } = req.body;

      // Валидация
      if (!animalId || isNaN(animalId)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      if (!photoUrl) {
        return res.status(400).json({
          success: false,
          message: 'URL фотографии обязателен',
        });
      }

      const photo = await PhotoService.createPhoto(parseInt(animalId), {
        photoUrl,
        order,
      });

      return res.status(201).json({
        success: true,
        message: 'Фотография успешно добавлена',
        data: photo,
      });
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.createPhoto:', error.message);

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

  //Обновить порядок фотографии (только админ)
   //PUT /api/photos/:photoId
    
   // Body:
   // {
   //  "order": 3
   // }
  
  static async updatePhotoOrder(req, res) {
    try {
      const { photoId } = req.params;
      const { order } = req.body;

      // Валидация
      if (!photoId || isNaN(photoId)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID фотографии',
        });
      }

      if (!order || order < 1) {
        return res.status(400).json({
          success: false,
          message: 'Порядок должен быть положительным числом',
        });
      }

      const photo = await PhotoService.updatePhotoOrder(parseInt(photoId), order);

      return res.status(200).json({
        success: true,
        message: 'Порядок фотографии обновлён',
        data: photo,
      });
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.updatePhotoOrder:', error.message);

      if (error.message.includes('не найдена')) {
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

  //Удалить фотографию (только админ)
   //DELETE /api/photos/:photoId
   
  static async deletePhoto(req, res) {
    try {
      const { photoId } = req.params;

      // Валидация
      if (!photoId || isNaN(photoId)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID фотографии',
        });
      }

      const result = await PhotoService.deletePhoto(parseInt(photoId));

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.deletePhoto:', error.message);

      if (error.message.includes('не найдена')) {
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

  //Переупорядочить все фото животного
   //PUT /api/animals/:animalId/photos/reorder
   
  static async reorderPhotos(req, res) {
    try {
      const { animalId } = req.params;

      // Валидация
      if (!animalId || isNaN(animalId)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      const photos = await PhotoService.reorderPhotos(parseInt(animalId));

      return res.status(200).json({
        success: true,
        message: 'Фотографии переупорядочены',
        data: photos,
      });
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.reorderPhotos:', error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = PhotoController;

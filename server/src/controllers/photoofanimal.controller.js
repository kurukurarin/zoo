'use strict';

const PhotoService = require('../services/photoofanimal.sevice');
const formatResponse = require('../utils/formatResponse');

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
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID животного', null, 'VALIDATION_ERROR')
        );
      }

      const photos = await PhotoService.getPhotosByAnimalId(parseInt(animalId));

      return res.status(200).json(
        formatResponse(200, 'Фотографии успешно получены', {
          photos,
          count: photos.length,
        })
      );
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.getPhotosByAnimal:', error.message);

      if (error.message.includes('не найдено')) {
        return res.status(404).json(
          formatResponse(404, error.message, null, 'NOT_FOUND')
        );
      }

      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
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

      if (!animalId || isNaN(animalId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID животного', null, 'VALIDATION_ERROR')
        );
      }

      if (!photoUrl) {
        return res.status(400).json(
          formatResponse(400, 'URL фотографии обязателен', null, 'VALIDATION_ERROR')
        );
      }

      const photo = await PhotoService.createPhoto(parseInt(animalId), {
        photoUrl,
        order,
      });

      return res.status(201).json(
        formatResponse(201, 'Фотография успешно добавлена', photo)
      );
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.createPhoto:', error.message);

      if (error.message.includes('не найдено')) {
        return res.status(404).json(
          formatResponse(404, error.message, null, 'NOT_FOUND')
        );
      }

      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
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

      //валидация
      if (!photoId || isNaN(photoId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID фотографии', null, 'VALIDATION_ERROR')
        );
      }

      if (!order || order < 1) {
        return res.status(400).json(
          formatResponse(400, 'Порядок должен быть положительным числом', null, 'VALIDATION_ERROR')
        );
      }

      const photo = await PhotoService.updatePhotoOrder(parseInt(photoId), order);

      return res.status(200).json(
        formatResponse(200, 'Порядок фотографии обновлён', photo)
      );
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.updatePhotoOrder:', error.message);

      if (error.message.includes('не найдена')) {
        return res.status(404).json(
          formatResponse(404, error.message, null, 'NOT_FOUND')
        );
      }

      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }

  //Удалить фотографию (только админ)
   //DELETE /api/photos/:photoId
   
  static async deletePhoto(req, res) {
    try {
      const { photoId } = req.params;

      //валидация
      if (!photoId || isNaN(photoId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID фотографии', null, 'VALIDATION_ERROR')
        );
      }

      const result = await PhotoService.deletePhoto(parseInt(photoId));

      return res.status(200).json(
        formatResponse(200, result.message, null)
      );
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.deletePhoto:', error.message);

      if (error.message.includes('не найдена')) {
        return res.status(404).json(
          formatResponse(404, error.message, null, 'NOT_FOUND')
        );
      }

      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }


  //Переупорядочить все фото животного
   //PUT /api/animals/:animalId/photos/reorder
   
  static async reorderPhotos(req, res) {
    try {
      const { animalId } = req.params;

      if (!animalId || isNaN(animalId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID животного', null, 'VALIDATION_ERROR')
        );
      }

      const photos = await PhotoService.reorderPhotos(parseInt(animalId));

      return res.status(200).json(
        formatResponse(200, 'Фотографии переупорядочены', {
          photos,
          count: photos.length,
        })
      );
    } catch (error) {
      console.error('❌ Ошибка в PhotoController.reorderPhotos:', error.message);

      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }
}

module.exports = PhotoController;

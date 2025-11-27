'use strict';

const InfoAboutAnimalService = require('../services/infoaboutanimalşservice');
const formatResponse = require('../utils/formatResponse');

//InfoAboutAnimalController - Контроллер для работы с информацией о животных
 //Обрабатывает HTTP запросы:
 //- GET /api/animals/:animalId/info - получить всю информацию
 //- POST /api/animals/:animalId/info - создать информацию (только админ)
 //- PUT /api/info/:infoId - обновить информацию (только админ)
 //- DELETE /api/info/:infoId - удалить информацию (только админ)


class InfoAboutAnimalController {
  //Получить всю информацию о животном
  //GET /api/animals/:animalId/info
  
  static async getInfoByAnimal(req, res) {
    try {
      const { animalId } = req.params;

      // Валидация
     if (!animalId || isNaN(animalId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID животного', null, 'VALIDATION_ERROR')
        );
      }

      const info = await InfoAboutAnimalService.getInfoByAnimalId(parseInt(animalId));

      return res.status(200).json(
        formatResponse(200, 'Информация успешно получена', {
          info,
          count: info.length,
        })
      );
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.getInfoByAnimal:', error.message);

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

  //Создать новую информационную запись (только админ)
  // POST /api/animals/:animalId/info
   
   // Body:
   // {
   //  "description": "Дополнительное описание...",
   //   "facts": "Интересный факт 1 | Факт 2 | Факт 3"
   // }
   
  static async createInfo(req, res) {
    try {
      const { animalId } = req.params;
      const { description, facts } = req.body;

      // Валидация
       if (!animalId || isNaN(animalId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID животного', null, 'VALIDATION_ERROR')
        );
      }

      if (!description || !facts) {
        return res.status(400).json(
          formatResponse(400, 'Описание и факты обязательны', null, 'VALIDATION_ERROR')
        );
      }

      const info = await InfoAboutAnimalService.createInfo(parseInt(animalId), {
        description,
        facts,
      });

      return res.status(201).json(
        formatResponse(201, 'Информация успешно создана', info)
      );
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.createInfo:', error.message);

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

  // Обновить информационную запись (только админ)
   // PUT /api/info/:infoId
   
   //Body:
   //{
   //  "description": "Новое описание",
   //   "facts": "Новые факты"
  // }
  
  static async updateInfo(req, res) {
    try {
      const { infoId } = req.params;
      const { description, facts } = req.body;

      // Валидация
       if (!infoId || isNaN(infoId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID информации', null, 'VALIDATION_ERROR')
        );
      }

      if (!description && !facts) {
        return res.status(400).json(
          formatResponse(400, 'Передайте хотя бы одно поле для обновления', null, 'VALIDATION_ERROR')
        );
      }

      const info = await InfoAboutAnimalService.updateInfo(parseInt(infoId), {
        description,
        facts,
      });

      return res.status(200).json(
        formatResponse(200, 'Информация успешно обновлена', info)
      );
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.updateInfo:', error.message);

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

  //
   // Удалить информационную запись (только админ)
   //DELETE /api/info/:infoId
   
  static async deleteInfo(req, res) {
    try {
      const { infoId } = req.params;

      // Валидация
       if (!infoId || isNaN(infoId)) {
        return res.status(400).json(
          formatResponse(400, 'Некорректный ID информации', null, 'VALIDATION_ERROR')
        );
      }

      const result = await InfoAboutAnimalService.deleteInfo(parseInt(infoId));

      return res.status(200).json(
        formatResponse(200, result.message, null)
      );
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.deleteInfo:', error.message);

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
}

module.exports = InfoAboutAnimalController;

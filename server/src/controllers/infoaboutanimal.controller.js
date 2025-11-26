'use strict';

const InfoAboutAnimalService = require('../services/infoAboutAnimalService');

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
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      const info = await InfoAboutAnimalService.getInfoByAnimalId(parseInt(animalId));

      return res.status(200).json({
        success: true,
        message: 'Информация успешно получена',
        data: info,
        count: info.length,
      });
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.getInfoByAnimal:', error.message);

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

  //Создать новую информационную запись (только админ)
   POST /api/animals/:animalId/info
   
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
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID животного',
        });
      }

      if (!description || !facts) {
        return res.status(400).json({
          success: false,
          message: 'Описание и факты обязательны',
        });
      }

      const info = await InfoAboutAnimalService.createInfo(parseInt(animalId), {
        description,
        facts,
      });

      return res.status(201).json({
        success: true,
        message: 'Информация успешно создана',
        data: info,
      });
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.createInfo:', error.message);

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
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID информации',
        });
      }

      if (!description && !facts) {
        return res.status(400).json({
          success: false,
          message: 'Передайте хотя бы одно поле для обновления',
        });
      }

      const info = await InfoAboutAnimalService.updateInfo(parseInt(infoId), {
        description,
        facts,
      });

      return res.status(200).json({
        success: true,
        message: 'Информация успешно обновлена',
        data: info,
      });
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.updateInfo:', error.message);

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

  //
   // Удалить информационную запись (только админ)
   //DELETE /api/info/:infoId
   
  static async deleteInfo(req, res) {
    try {
      const { infoId } = req.params;

      // Валидация
      if (!infoId || isNaN(infoId)) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный ID информации',
        });
      }

      const result = await InfoAboutAnimalService.deleteInfo(parseInt(infoId));

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('❌ Ошибка в InfoAboutAnimalController.deleteInfo:', error.message);

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
}

module.exports = InfoAboutAnimalController;

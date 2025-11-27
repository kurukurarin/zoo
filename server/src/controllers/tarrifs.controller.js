// TariffController
//- get()
//- update()



'use strict';

const TariffService = require('../services/tariffs.service');
const formatResponse = require('../utils/formatResponse');

//TariffController - Контроллер для работы с тарифами
 //Обрабатывает HTTP запросы:
 //- GET /api/tariffs - получить текущие тарифы
 // - PUT /api/tariffs - обновить тарифы (только админ)
 

class TariffController {
  //Получить текущие тарифы
   //GET /api/tariffs
   //
static async getTariffs(req, res) {
    try {
      const tariff = await TariffService.getTariffs();

      return res.status(200).json(
        formatResponse(200, 'Тарифы успешно получены', tariff)
      );
    } catch (error) {
      console.error('❌ Ошибка в TariffController.getTariffs:', error.message);
      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }

  
//Обновить тарифы (только админ)
//PUT /api/tariffs
   
   //Body:
   // {
   //  "tariff_weekdays": 550.00,
   //  "tariff_weekend": 800.00,
   // "benefits": "Студенты - 20% скидка",
   //   "conditions": "Вход разрешён с 09:00 до 18:00"
   // }
   
  static async updateTariffs(req, res) {
    try {
      const { tariff_weekdays, tariff_weekend, benefits, conditions } = req.body;
      const adminId = req.user.id; // ID админа из JWT токена (будет установлено в middleware)

      // Валидация
      if (!tariff_weekdays && !tariff_weekend && !benefits && !conditions) {
        return res.status(400).json(
          formatResponse(400, 'Передайте хотя бы одно поле для обновления', null, 'VALIDATION_ERROR')
        );
      }

      const tariff = await TariffService.updateTariffs(
        {
          tariff_weekdays,
          tariff_weekend,
          benefits,
          conditions,
        },
        adminId
      );

      return res.status(200).json(
        formatResponse(200, 'Тарифы успешно обновлены', tariff)
      );
    } catch (error) {
      console.error('❌ Ошибка в TariffController.updateTariffs:', error.message);
      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }
  //Получить информацию об администраторе, который последний обновил тарифы
   //GET /api/tariffs/info/last-updated
   
  static async getLastUpdatedInfo(req, res) {
    try {
      const info = await TariffService.getLastUpdatedBy();

      return res.status(200).json(
        formatResponse(200, 'Информация об обновлении получена', info)
      );
    } catch (error) {
      console.error('❌ Ошибка в TariffController.getLastUpdatedInfo:', error.message);
      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }
}

module.exports = TariffController;
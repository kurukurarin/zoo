// TariffController
//- get()
//- update()



'use strict';

const TariffService = require('../services/tariffService');

//TariffController - Контроллер для работы с тарифами
 //Обрабатывает HTTP запросы:
 //- GET /api/tariffs - получить текущие тарифы
 // - PUT /api/tariffs - обновить тарифы (только админ)
 

class TariffController {
  // Получить текущие тарифы
   //GET /api/tariffs
   //
  static async getTariffs(req, res) {
    try {
      const tariff = await TariffService.getTariffs();

      return res.status(200).json({
        success: true,
        message: 'Тарифы успешно получены',
        data: tariff,
      });
    } catch (error) {
      console.error('❌ Ошибка в TariffController.getTariffs:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
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
        return res.status(400).json({
          success: false,
          message: 'Передайте хотя бы одно поле для обновления',
        });
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

      return res.status(200).json({
        success: true,
        message: 'Тарифы успешно обновлены',
        data: tariff,
      });
    } catch (error) {
      console.error('❌ Ошибка в TariffController.updateTariffs:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //Получить информацию об администраторе, который последний обновил тарифы
   //GET /api/tariffs/info/last-updated
   
  static async getLastUpdatedInfo(req, res) {
    try {
      const info = await TariffService.getLastUpdatedBy();

      return res.status(200).json({
        success: true,
        message: 'Информация об обновлении получена',
        data: info,
      });
    } catch (error) {
      console.error('❌ Ошибка в TariffController.getLastUpdatedInfo:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = TariffController;
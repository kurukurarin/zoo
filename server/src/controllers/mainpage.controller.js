// MainPageController
//- get()
//- update()



'use strict';

const MainPageService = require('../services/mainPageService');

//MainPageController - Контроллер для работы с главной страницей
 
 //Обрабатывает HTTP запросы:
 //- GET /api/main-page - получить информацию главной страницы
 //- PUT /api/main-page - обновить информацию (только админ)


class MainPageController {
  //Получить информацию главной страницы
// GET /api/main-page
   
  static async getMainPage(req, res) {
    try {
      const mainPage = await MainPageService.getMainPage();

      return res.status(200).json({
        success: true,
        message: 'Информация главной страницы получена',
        data: mainPage,
      });
    } catch (error) {
      console.error('❌ Ошибка в MainPageController.getMainPage:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //Обновить информацию главной страницы (только админ)
   //PUT /api/main-page
   
   //Body:
   //{
   //  "info": "Новая информация о зоопарке...",
   //  "contacts": "Новые контакты..."
   //}
   
  static async updateMainPage(req, res) {
    try {
      const { info, contacts } = req.body;
      const adminId = req.user.id; // ID админа из JWT токена

      // Валидация
      if (!info && !contacts) {
        return res.status(400).json({
          success: false,
          message: 'Передайте хотя бы одно поле для обновления',
        });
      }

      const mainPage = await MainPageService.updateMainPage(
        { info, contacts },
        adminId
      );

      return res.status(200).json({
        success: true,
        message: 'Главная страница успешно обновлена',
        data: mainPage,
      });
    } catch (error) {
      console.error('❌ Ошибка в MainPageController.updateMainPage:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //Получить информацию об администраторе, который последний обновил страницу
   //GET /api/main-page/info/last-updated
   
  static async getLastUpdatedInfo(req, res) {
    try {
      const info = await MainPageService.getLastUpdatedBy();

      return res.status(200).json({
        success: true,
        message: 'Информация об обновлении получена',
        data: info,
      });
    } catch (error) {
      console.error('❌ Ошибка в MainPageController.getLastUpdatedInfo:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = MainPageController;
// MainPageController
//- get()
//- update()



'use strict';

const MainPageService = require('../services/mainpage.service');
const formatResponse = require('../utils/formatResponse');


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

      return res.status(200).json(
        formatResponse(200, 'Информация главной страницы получена', mainPage)
      );
    } catch (error) {
      console.error('❌ Ошибка в MainPageController.getMainPage:', error.message);
      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
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
      const adminId = req.user.id; // id админа из jwt

      //валидаиця
      if (!info && !contacts) {
        return res.status(400).json(
          formatResponse(400, 'Передайте хотя бы одно поле для обновления', null, 'VALIDATION_ERROR')
        );
      }

      const mainPage = await MainPageService.updateMainPage(
        { info, contacts },
        adminId
      );

      return res.status(200).json(
        formatResponse(200, 'Главная страница успешно обновлена', mainPage)
      );
    } catch (error) {
      console.error('❌ Ошибка в MainPageController.updateMainPage:', error.message);
      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }

  //Получить информацию об администраторе, который последний обновил страницу
   //GET /api/main-page/info/last-updated
   
   static async getLastUpdatedInfo(req, res) {
    try {
      const info = await MainPageService.getLastUpdatedBy();

      return res.status(200).json(
        formatResponse(200, 'Информация об обновлении получена', info)
      );
    } catch (error) {
      console.error('❌ Ошибка в MainPageController.getLastUpdatedInfo:', error.message);
      return res.status(500).json(
        formatResponse(500, error.message, null, 'INTERNAL_SERVER_ERROR')
      );
    }
  }
}


module.exports = MainPageController;
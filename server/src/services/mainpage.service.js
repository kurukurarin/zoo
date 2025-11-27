'use strict';

const db = require('../db/models');
const { MainPage, AdminUser } = db;

// MainPageService - Сервис для работы с главной страницей
 // Содержит логику для:
 // - Получения информации главной страницы
 // - Обновления информации (только админ)


class MainPageService {

  //Получить информацию главной страницы
  
  static async getMainPage() {
    try {
      let mainPage = await MainPage.findOne({
        include: [
          {
            model: AdminUser,
            as: 'updatedByUser',
            attributes: ['id', 'email'],
          },
        ],
      });

      // Если записи нет, создаём с дефолтными значениями
      if (!mainPage) {
        mainPage = await MainPage.create({
          info: 'Информация о зоопарке',
          contacts: 'Контакты здесь',
          updatedBy: null,
        });
      }

      return mainPage;
    } catch (error) {
      throw new Error(`Ошибка при получении главной страницы: ${error.message}`);
    }
  }

  //Обновить информацию главной страницы (только админ)
 // data - Новые данные
// data.info - Информация о зоопарке
 // data.contacts - Контакты
  // adminId - ID администратора
  
  static async updateMainPage(data, adminId) {
    try {
      // Валидация
      if (!data.info && !data.contacts) {
        throw new Error('Передайте хотя бы одно поле для обновления');
      }

      // Получаем существующую запись или создаём новую
      let mainPage = await MainPage.findOne();

      if (!mainPage) {
        mainPage = await MainPage.create({
          info: data.info || '',
          contacts: data.contacts || '',
          updatedBy: adminId,
        });
      } else {
        // Обновляем только переданные поля
        if (data.info !== undefined) mainPage.info = data.info;
        if (data.contacts !== undefined) mainPage.contacts = data.contacts;
        mainPage.updatedBy = adminId;

        await mainPage.save();
      }

      // Загружаем обновлённую запись с информацией об админе
      const updatedMainPage = await MainPage.findByPk(mainPage.id, {
        include: [
          {
            model: AdminUser,
            as: 'updatedByUser',
            attributes: ['id', 'email'],
          },
        ],
      });

      return updatedMainPage;
    } catch (error) {
      throw new Error(`Ошибка при обновлении главной страницы: ${error.message}`);
    }
  }

  //Получить информацию об администраторе, который последний изменил страницу
 
  static async getLastUpdatedBy() {
    try {
      const mainPage = await MainPage.findOne({
        include: [
          {
            model: AdminUser,
            as: 'updatedByUser',
            attributes: ['id', 'email', 'role'], // это может быть и не надо,  так как роли у нас нет
          },
        ],
      });

      if (!mainPage || !mainPage.updatedByUser) {
        return { message: 'Главная страница ещё не обновлялась' };
      }

      return {
        updatedBy: mainPage.updatedByUser,
        updatedAt: mainPage.updatedAt,
      };
    } catch (error) {
      throw new Error(`Ошибка при получении информации: ${error.message}`);
    }
  }
}

module.exports = MainPageService;
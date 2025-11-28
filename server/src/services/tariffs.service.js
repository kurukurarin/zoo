// const db = require('../db/models');
// const { Tariff, AdminUser } = db;

// //TariffService - Сервис для работы с тарифами
// //Содержит логику для:
//  // - Получения текущих тарифов
//  //- Обновления тарифов (только админ)
//  // - Просмотра истории изменений


// class TariffService {

//   //Получить текущие тарифы
// // возвращаем Объект с тарифами

//   static async getTariffs() {
//     try {
//       // Обычно в таблице Tariffs одна запись
//       let tariff = await Tariff.findOne({
//         include: [
//           {
//             model: AdminUser,
//             as: 'updatedByUser',
//             attributes: ['id', 'email'],
//           },
//         ],
//       });

//       // Если записи нет, создаём с дефолтными значениями
//       if (!tariff) {
//         tariff = await Tariff.create({
//           tariff_weekdays: 500.00,
//           tariff_weekend: 750.00,
//           benefits: 'Скидки не установлены',
//           conditions: 'Условия не установлены',
//           updatedBy: null,
//         });
//       }

//       return tariff;
//     } catch (error) {
//       throw new Error(`Ошибка при получении тарифов: ${error.message}`);
//     }
//   }

//   //Обновить тарифы (только админ)
//  // data - Новые данные тарифов
//  //data.tariff_weekdays - Цена в будни
// //data.tariff_weekend - Цена в выходные
// // data.benefits - Информация о скидках
// // data.conditions - Условия посещения
// // adminId - ID администратора

//   static async updateTariffs(data, adminId) {
//     try {
//       // Валидация цен
//       if (data.tariff_weekdays && isNaN(data.tariff_weekdays)) {
//         throw new Error('Цена в будни должна быть числом');
//       }

//       if (data.tariff_weekend && isNaN(data.tariff_weekend)) {
//         throw new Error('Цена в выходные должна быть числом');
//       }

//       // Получаем существующий тариф или создаём новый
//       let tariff = await Tariff.findOne();

//       if (!tariff) {
//         tariff = await Tariff.create({
//           tariff_weekdays: data.tariff_weekdays || 500.00,
//           tariff_weekend: data.tariff_weekend || 750.00,
//           benefits: data.benefits || '',
//           conditions: data.conditions || '',
//           updatedBy: adminId,
//         });
//       } else {
//         // Обновляем только переданные поля
//         if (data.tariff_weekdays !== undefined) tariff.tariff_weekdays = data.tariff_weekdays;
//         if (data.tariff_weekend !== undefined) tariff.tariff_weekend = data.tariff_weekend;
//         if (data.benefits !== undefined) tariff.benefits = data.benefits;
//         if (data.conditions !== undefined) tariff.conditions = data.conditions;
//         tariff.updatedBy = adminId;

//         await tariff.save();
//       }

//       // Загружаем обновлённый тариф с информацией об админе
//       const updatedTariff = await Tariff.findByPk(tariff.id, {
//         include: [
//           {
//             model: AdminUser,
//             as: 'updatedByUser',
//             attributes: ['id', 'email'],
//           },
//         ],
//       });

//       return updatedTariff;
//     } catch (error) {
//       throw new Error(`Ошибка при обновлении тарифов: ${error.message}`);
//     }
//   }

//   //Получить информацию об администраторе, который последний обновил тарифы

//   static async getLastUpdatedBy() {
//     try {
//       const tariff = await Tariff.findOne({
//         include: [
//           {
//             model: AdminUser,
//             as: 'updatedByUser',
//             attributes: ['id', 'email', 'role'],
//           },
//         ],
//       });

//       if (!tariff || !tariff.updatedByUser) {
//         return { message: 'Тарифы ещё не обновлялись' };
//       }

//       return {
//         updatedBy: tariff.updatedByUser,
//         updatedAt: tariff.updatedAt,
//       };
//     } catch (error) {
//       throw new Error(`Ошибка при получении информации: ${error.message}`);
//     }
//   }
// }

// module.exports = TariffService;




const db = require('../db/models');
const { Tariff, AdminUser } = db;

//TariffService - Сервис для работы с тарифами
//Содержит логику для:
 // - Получения текущих тарифов
 //- Обновления тарифов (только админ)
 // - Просмотра истории изменений


class TariffService {

  //Получить текущие тарифы
// возвращаем Объект с тарифами

  static async getTariffs() {
    try {
      // Обычно в таблице Tariffs одна запись
      let tariff = await Tariff.findOne({
        include: [
          {
            model: AdminUser,
            as: 'updatedByUser',
            attributes: ['id', 'email'],
          },
        ],
      });

      // Если записи нет, создаём с дефолтными значениями
      if (!tariff) {
        tariff = await Tariff.create({
          tariff_weekdays: 500.00,
          tariff_weekend: 750.00,
          benefits: 'Скидки не установлены',
          conditions: 'Условия не установлены',
          updatedBy: null,
          updatedAt: new Date(),
        });
      }

      return tariff;
    } catch (error) {
      throw new Error(`Ошибка при получении тарифов: ${error.message}`);
    }
  }

  //Обновить тарифы (только админ)
 // data - Новые данные тарифов
 //data.tariff_weekdays - Цена в будни
//data.tariff_weekend - Цена в выходные
// data.benefits - Информация о скидках
// data.conditions - Условия посещения
// adminId - ID администратора

  static async updateTariffs(data, adminId) {
    try {
      // Валидация цен
      if (data.tariff_weekdays && isNaN(data.tariff_weekdays)) {
        throw new Error('Цена в будни должна быть числом');
      }

      if (data.tariff_weekend && isNaN(data.tariff_weekend)) {
        throw new Error('Цена в выходные должна быть числом');
      }

      // Получаем существующий тариф или создаём новый
      let tariff = await Tariff.findOne();

      if (!tariff) {
        tariff = await Tariff.create({
          tariff_weekdays: data.tariff_weekdays || 500.00,
          tariff_weekend: data.tariff_weekend || 750.00,
          benefits: data.benefits || '',
          conditions: data.conditions || '',
          updatedBy: adminId,
          updatedAt: new Date(),
        });
      } else {
        // Обновляем только переданные поля
        if (data.tariff_weekdays !== undefined) tariff.tariff_weekdays = data.tariff_weekdays;
        if (data.tariff_weekend !== undefined) tariff.tariff_weekend = data.tariff_weekend;
        if (data.benefits !== undefined) tariff.benefits = data.benefits;
        if (data.conditions !== undefined) tariff.conditions = data.conditions;
        tariff.updatedBy = adminId;
        tariff.updatedAt = new Date();

        await tariff.save();
      }

      // Загружаем обновлённый тариф с информацией об админе
      const updatedTariff = await Tariff.findByPk(tariff.id, {
        include: [
          {
            model: AdminUser,
            as: 'updatedByUser',
            attributes: ['id', 'email'],
          },
        ],
      });

      return updatedTariff;
    } catch (error) {
      throw new Error(`Ошибка при обновлении тарифов: ${error.message}`);
    }
  }

  //Получить информацию об администраторе, который последний обновил тарифы

  static async getLastUpdatedBy() {
    try {
      const tariff = await Tariff.findOne({
        include: [
          {
            model: AdminUser,
            as: 'updatedByUser',
            attributes: ['id', 'email', 'role'],
          },
        ],
      });

      if (!tariff || !tariff.updatedByUser) {
        return { message: 'Тарифы ещё не обновлялись' };
      }

      return {
        updatedBy: tariff.updatedByUser,
        updatedAt: tariff.updatedAt,
      };
    } catch (error) {
      throw new Error(`Ошибка при получении информации: ${error.message}`);
    }
  }
}

module.exports = TariffService;
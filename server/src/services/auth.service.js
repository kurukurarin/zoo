const { AdminUser } = require('../db/models');

class AuthService {
  static async getAdminUserByEmail(email) {
    try {
      const user = await AdminUser.findOne({
        where: { email: email.toLowerCase() }
      });
      return user;
    } catch (error) {
      console.error('Ошибка поиска пользователя:', error);
      throw error;
    }
  }

  static async getAdminUserById(id) {
    try {
      const user = await AdminUser.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      return user;
    } catch (error) {
      console.error('Ошибка поиска пользователя по ID:', error);
      throw error;
    }
  }
}

module.exports = AuthService;





// 'use strict';

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../models');
// const { AdminUser } = db;

// /AuthService - Сервис для работы с аутентификацией
//  Содержит логику для:
//  - Логина администратора
//  - Проверки токена
//  - Логаута
// 

// class AuthService {
//   
//. Логин администратора
//   
//   static async login(email, password) {
//     try {
//       // Валидация
//       if (!email || !password) {
//         throw new Error('Email и пароль обязательны');
//       }

//       // Проверяем формат email
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         throw new Error('Некорректный формат email');
//       }

//       // Ищем администратора по email
//       const admin = await AdminUser.findOne({
//         where: { email },
//         attributes: { exclude: ['createdAt', 'updatedAt'] }, // Исключаем лишние поля
//       });

//       if (!admin) {
//         throw new Error('Администратор не найден');
//       }

//       // Проверяем пароль
//       const isPasswordValid = await bcrypt.compare(password, admin.password);

//       if (!isPasswordValid) {
//         throw new Error('Неверный пароль');
//       }

//       // Создаём JWT токен (действует 24 часа)
//       const accessToken = jwt.sign(
//         {
//           id: admin.id,
//           email: admin.email,
//           role: admin.role,
//         },
//         process.env.JWT_SECRET || 'your-secret-key-change-in-env',
//         { expiresIn: '24h' }
//       );

//       // Создаём refresh токен (действует 7 дней)
//       const refreshToken = jwt.sign(
//         {
//           id: admin.id,
//           email: admin.email,
//         },
//         process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-env',
//         { expiresIn: '7d' }
//       );

//       return {
//         admin: {
//           id: admin.id,
//           email: admin.email,
//           role: admin.role,
//         },
//         accessToken,
//         refreshToken,
//       };
//     } catch (error) {
//       throw new Error(`Ошибка при логине: ${error.message}`);
//     }
//   }


//Проверить access token
//   
//   static async verifyToken(token) {
//     try {
//       if (!token) {
//         throw new Error('Токен не предоставлен');
//       }

//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET || 'your-secret-key-change-in-env'
//       );

//       return decoded;
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         throw new Error('Токен истёк');
//       }
//       throw new Error(`Некорректный токен: ${error.message}`);
//     }
//   }


//    Обновить access token используя refresh token
//    
//   static async refreshAccessToken(refreshToken) {
//     try {
//       if (!refreshToken) {
//         throw new Error('Refresh токен не предоставлен');
//       }

//       // Проверяем refresh токен
//       const decoded = jwt.verify(
//         refreshToken,
//         process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-env'
//       );

//       // Получаем администратора по ID из токена
//       const admin = await AdminUser.findByPk(decoded.id);

//       if (!admin) {
//         throw new Error('Администратор не найден');
//       }

//       // Создаём новый access токен
//       const newAccessToken = jwt.sign(
//         {
//           id: admin.id,
//           email: admin.email,
//           role: admin.role,
//         },
//         process.env.JWT_SECRET || 'your-secret-key-change-in-env',
//         { expiresIn: '24h' }
//       );

//       return {
//         accessToken: newAccessToken,
//         admin: {
//           id: admin.id,
//           email: admin.email,
//           role: admin.role,
//         },
//       };
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         throw new Error('Refresh токен истёк, требуется повторный логин');
//       }
//       throw new Error(`Ошибка при обновлении токена: ${error.message}`);
//     }
//   }

//   
//     Логаут (клиент сам удаляет токены из localStorage)
//   
//   static async logout() {
//     try {
//       return { message: 'Логаут успешен' };
//     } catch (error) {
//       throw new Error(`Ошибка при логауте: ${error.message}`);
//     }
//   }
// }

// module.exports = AuthService;
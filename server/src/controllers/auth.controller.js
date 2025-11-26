// AuthController
//- login()
//- logout()

const bcrypt = require('bcrypt');
const AuthService = require('../services/auth.service');
const { AdminUser } = require('../db/models');
const formatResponse = require('../utils/formatResponse');
const generateTokens = require('../utils/generateJWTTokens');
const cookieConfig = require('../config/cookieConfig');

class AuthController {

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json(
          formatResponse(400, 'Email и пароль обязательны')
        );
      }

      const user = await AuthService.getUserByEmail(email);

      if (!user) {
        return res.status(401).json(
          formatResponse(401, 'Неверный email или пароль')
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json(
          formatResponse(401, 'Неверный email или пароль')
        );
      }

      const userWithoutPassword = user.toJSON();
      delete userWithoutPassword.password;

      const { accessToken, refreshToken } = generateTokens({ 
        user: userWithoutPassword 
      });

      res.cookie('refreshToken', refreshToken, cookieConfig);

      return res.status(200).json(
        formatResponse(200, 'Вход выполнен успешно', {
          user: userWithoutPassword,
          accessToken
        })
      );
    } catch (error) {
      console.error('====AuthController.login====', error);
      return res.status(500).json(
        formatResponse(500, 'Ошибка сервера при входе', null, error.message)
      );
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie('refreshToken');

      return res.status(200).json(
        formatResponse(200, 'Выход выполнен успешно')
      );
    } catch (error) {
      console.error('====AuthController.logout====', error);
      return res.status(500).json(
        formatResponse(500, 'Ошибка при выходе', null, error.message)
      );
    }
  }

  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });

      res.cookie('refreshToken', refreshToken, cookieConfig);

      return res.status(200).json(
        formatResponse(200, 'Токены обновлены', {
          user,
          accessToken
        })
      );
    } catch (error) {
      console.error('====AuthController.refreshTokens====', error);
      return res.status(500).json(
        formatResponse(500, 'Ошибка при обновлении токенов', null, error.message)
      );
    }
  }
}

module.exports = AuthController;







// 'use strict';

// const AuthService = require('../services/authService');

// AuthController - Контроллер для работы с аутентификацией
//  Обрабатывает HTTP запросы:
//  - POST /api/auth/login - логин администратора
//   - POST /api/auth/refresh - обновить access token
//  - POST /api/auth/logout - логаут
//  - GET /api/auth/me - получить информацию текущего админа
// 

// class AuthController {
//   //Логин администратора
//     POST /api/auth/login
//    //
//     //Body:
//    //{
//    //   "email": "admin@zoo.com",
//    //  "password": "password123"
//    //}
//   
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;

//       // Валидация
//       if (!email || !password) {
//         return res.status(400).json({
//           success: false,
//           message: 'Email и пароль обязательны',
//         });
//       }

//       const result = await AuthService.login(email, password);

//       // Отправляем refreshToken в httpOnly cookie
//       res.cookie('refreshToken', result.refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', // Только для https в продакшене
//         sameSite: 'strict',
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
//       });

//       return res.status(200).json({
//         success: true,
//         message: 'Логин успешен',
//         data: {
//           admin: result.admin,
//           accessToken: result.accessToken,
//           // refreshToken НЕ отправляем в response (он в cookie)
//         },
//       });
//     } catch (error) {
//       console.error('❌ Ошибка в AuthController.login:', error.message);

//       if (error.message.includes('не найден')) {
//         return res.status(404).json({
//           success: false,
//           message: error.message,
//         });
//       }

//       if (error.message.includes('Неверный пароль')) {
//         return res.status(401).json({
//           success: false,
//           message: error.message,
//         });
//       }

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   
//    //Обновить access token
//    //POST /api/auth/refresh
//    
//    //refreshToken берётся из cookie (httpOnly)
//    
//   static async refreshToken(req, res) {
//     try {
//       const refreshToken = req.cookies.refreshToken;

//       if (!refreshToken) {
//         return res.status(401).json({
//           success: false,
//           message: 'Refresh токен не найден, требуется повторный логин',
//         });
//       }

//       const result = await AuthService.refreshAccessToken(refreshToken);

//       return res.status(200).json({
//         success: true,
//         message: 'Access токен обновлён',
//         data: {
//           accessToken: result.accessToken,
//           admin: result.admin,
//         },
//       });
//     } catch (error) {
//       console.error('❌ Ошибка в AuthController.refreshToken:', error.message);

//       // Удаляем некорректный refresh токен
//       res.clearCookie('refreshToken');

//       if (error.message.includes('истёк')) {
//         return res.status(401).json({
//           success: false,
//           message: error.message,
//         });
//       }

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   
//    //Логаут
//    //POST /api/auth/logout
//   
//   static async logout(req, res) {
//     try {
//       // Удаляем refresh токен из cookie
//       res.clearCookie('refreshToken', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//       });

//       const result = await AuthService.logout();

//       return res.status(200).json({
//         success: true,
//         message: result.message,
//       });
//     } catch (error) {
//       console.error('❌ Ошибка в AuthController.logout:', error.message);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   
//    //Получить информацию текущего администратора
//    //GET /api/auth/me
//    
//    //Требуется валидный access token в Authorization header
//    
//   static async getCurrentAdmin(req, res) {
//     try {
//       // req.user установлен middleware'ом verifyAccessToken
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Не авторизирован',
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: 'Информация о текущем администраторе получена',
//         data: req.user,
//       });
//     } catch (error) {
//       console.error('❌ Ошибка в AuthController.getCurrentAdmin:', error.message);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }

// module.exports = AuthController;
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
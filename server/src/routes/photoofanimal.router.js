const { User } = require('../db/models');

class AuthService {
  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email: email.toLowerCase() }
      });
      return user;
    } catch (error) {
      console.error('Ошибка поиска пользователя:', error);
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const user = await User.create({
        username: userData.username,
        email: userData.email.toLowerCase(),
        password: userData.password,
        role: userData.role || 'user'
      });

      const userWithoutPassword = user.toJSON();
      delete userWithoutPassword.password;

      return userWithoutPassword;
    } catch (error) {
      console.error('Ошибка создания пользователя:', error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
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
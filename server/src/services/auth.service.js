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
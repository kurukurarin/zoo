 //AuthApi - API для аутентификации
 //Логин, выход, обновление токена


import { axiosInstance, setAccessToken } from '../src/shared/lib/axiosInstance';

export default class AuthApi {

  // Логин администратора
  static async login(email, password) {
    try {
      const { data } = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      // Сохраняем токен
      setAccessToken(data.data.accessToken);

      return data.data; // { admin, accessToken }
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Обновить access token
  
  static async refreshToken() {
    try {
      const { data } = await axiosInstance.post('/auth/refresh');

      // Сохраняем новый токен
      setAccessToken(data.data.accessToken);

      return data.data; // { admin, accessToken }
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Получить текущего администратора

  static async getCurrentAdmin() {
    try {
      const { data } = await axiosInstance.get('/auth/me');
      return data.data; // { id, email, role, isActive, ... }
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Логаут администратора
  
  static async logout() {
    try {
      const { data } = await axiosInstance.post('/auth/logout');

      // Удаляем токен
      setAccessToken(null);

      return data.data; // { message }
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

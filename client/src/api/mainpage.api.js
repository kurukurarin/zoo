//API для главной страницы
//Получение и обновление содержимого главной страницы

import { axiosInstance } from "../shared/lib/axiosInstance";

export default class MainPageApi {
  //Получить содержимое главной страницы
  // { id, info, contacts, updatedBy, createdAt, updatedAt }
  static async get() {
    try {
      const { data } = await axiosInstance.get("/main-page");
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Обновить главную страницу (требуется авторизация)
  // mainPageData - { info, contacts }

  static async update(mainPageData) {
    try {
      const { data } = await axiosInstance.put("/main-page", mainPageData);
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Получить информацию об последнем обновлении главной страницы
  // { updatedBy, updatedAt }

  static async getLastUpdatedInfo() {
    try {
      const { data } = await axiosInstance.get("/main-page/info/last-updated");
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

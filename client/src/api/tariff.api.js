//API для тарифов
//Получение и обновление тарифов на посещение

import { axiosInstance } from "../shared/lib/axiosInstance";

export default class TariffApi {
  //Получить текущие тарифы
  //{ id, tariff_weekdays, tariff_weekend, benefits, conditions, ... }
  static async get() {
    try {
      const { data } = await axiosInstance.get("/tariffs");
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Обновить тарифы (требуется авторизация)
  //tariffData - { tariff_weekdays, tariff_weekend, benefits, conditions }

  static async update(tariffData) {
    try {
      const { data } = await axiosInstance.put("/tariffs", tariffData);
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Получить информацию об последнем обновлении тарифов
  //{ updatedBy, updatedAt }

  static async getLastUpdatedInfo() {
    try {
      const { data } = await axiosInstance.get("/tariffs/info/last-updated");
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

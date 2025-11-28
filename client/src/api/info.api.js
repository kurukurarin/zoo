//API для информации о животных
//Описание и интересные факты о животных

import { axiosInstance } from "../shared/lib/axiosInstance";

export default class InfoApi {
  //Получить информацию о животном

  static async getByAnimalId(animalId) {
    try {
      const { data } = await axiosInstance.get(`/animals/${animalId}/info`);
      return data.data.info;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Создать информацию о животном (требуется авторизация)
  // animalId - ID животного
  // infoData - { description, facts }

  static async create(animalId, infoData) {
    try {
      const { data } = await axiosInstance.post(
        `/animals/${animalId}/info`,
        infoData
      );
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Обновить информацию о животном (требуется авторизация)
  // animalId - ID животного
  // infoId - ID информации
  // infoData - { description, facts }

  static async update(animalId, infoId, infoData) {
    try {
      const { data } = await axiosInstance.put(
        `/animals/${animalId}/info/${infoId}`,
        infoData
      );
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Удалить информацию о животном (требуется авторизация)
  //animalId - ID животного
  //infoId - ID информации

  static async delete(animalId, infoId) {
    try {
      const { data } = await axiosInstance.delete(
        `/animals/${animalId}/info/${infoId}`
      );
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

//API для фотографий животных
 //Управление фотографиями животных
 

import { axiosInstance } from '../shared/lib/axiosInstance';

export default class PhotoApi {

  //Получить все фотографии животного
  // animalId - ID животного
  static async getByAnimalId(animalId) {
    try {
      const { data } = await axiosInstance.get(
        `/animals/${animalId}/photos`
      );
      return data.data.photos;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Добавить фотографию (требуется авторизация)
   // animalId - ID животного
   // photoData - { photoUrl, order }
  
  static async create(animalId, photoData) {
    try {
      const { data } = await axiosInstance.post(
        `/animals/${animalId}/photos`,
        photoData
      );
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Обновить порядок фотографии (требуется авторизация)
  // animalId - ID животного
  // photoId - ID фотографии
  //order - Новый порядок
  
  static async updateOrder(animalId, photoId, order) {
    try {
      const { data } = await axiosInstance.put(
        `/animals/${animalId}/photos/${photoId}`,
        { order }
      );
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Удалить фотографию (требуется авторизация)
  // animalId - ID животного
   // photoId - ID фотографии

  static async delete(animalId, photoId) {
    try {
      const { data } = await axiosInstance.delete(
        `/animals/${animalId}/photos/${photoId}`
      );
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Переупорядочить все фотографии (требуется авторизация)
   // animalId - ID животного

  static async reorder(animalId) {
    try {
      const { data } = await axiosInstance.put(
        `/animals/${animalId}/photos/reorder`
      );
      return data.data.photos;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

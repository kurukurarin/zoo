// API для животных
// CRUD операции для животных


import { axiosInstance } from '../src/shared/lib/axiosInstance';

export default class AnimalApi {

  // Получить всех животных (массив животных)
  static async getAll() {
    try {
      const { data } = await axiosInstance.get('/animals');
      return data.data.animals;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Получить животное по ID
 
  static async getById(id) {
    try {
      const { data } = await axiosInstance.get(`/animals/${id}`);
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Поиск животного по названию
   
  static async search(name) {
    try {
      const { data } = await axiosInstance.get(`/animals/search/${name}`);
      return data.data.animals;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  //Создать животное (требуется авторизация)
  // animalData - { name, feature, mainPhotoUrl }
  static async create(animalData) {
    try {
      const { data } = await axiosInstance.post('/animals', animalData);
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Обновить животное (требуется авторизация)
  // id - ID животного
  //  animalData - { name, feature, mainPhotoUrl }
 
  static async update(id, animalData) {
    try {
      const { data } = await axiosInstance.put(`/animals/${id}`, animalData);
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Удалить животное (требуется авторизация)
  
  static async delete(id) {
    try {
      const { data } = await axiosInstance.delete(`/animals/${id}`);
      return data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

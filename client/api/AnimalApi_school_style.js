/**
 * AnimalApi - API для работы с животными
 * Стиль: как в школе (static методы)
 */

import { axiosInstance } from "../shared/lib/axiosInstance";
import Animal from "../entities/Animal";

export default class AnimalApi {
  // Получить всех животных
  static async getAllAnimals() {
    const { data } = await axiosInstance.get("/animals");
    return data.data.animals.map(animal => Animal.fromResponse(animal));
  }

  // Получить одно животное по ID
  static async getAnimalById(id) {
    const { data } = await axiosInstance.get(`/animals/${id}`);
    return Animal.fromResponse(data.data);
  }

  // Поиск животного по названию
  static async searchAnimal(name) {
    const { data } = await axiosInstance.get(`/animals/search/${name}`);
    return data.data.animals.map(animal => Animal.fromResponse(animal));
  }

  // Создать новое животное (требуется авторизация)
  static async createAnimal(animalData) {
    const { data } = await axiosInstance.post("/animals", animalData);
    return Animal.fromResponse(data.data);
  }

  // Обновить животное (требуется авторизация)
  static async updateAnimal(id, animalData) {
    const { data } = await axiosInstance.put(`/animals/${id}`, animalData);
    return Animal.fromResponse(data.data);
  }

  // Удалить животное (требуется авторизация)
  static async deleteAnimal(id) {
    const { data } = await axiosInstance.delete(`/animals/${id}`);
    return data.data;
  }
}

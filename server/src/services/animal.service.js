'use strict';

const db = require('../db/models');
const { Animal, PhotoOfAnimal, InfoAboutAnimal } = db;

// AnimalService - Сервис для работы с животными
//Содержит всю бизнес-логику для операций с животными:
// - Получение животных (все или по ID)
// - Создание животного
// - Обновление животного
// - Удаление животного
// - поиск животного  


class AnimalService {
  //Получить ВСЕ животных со всеми связанными данными, массив животных с фото и информацией
   
  static async getAllAnimals() {
    try {
      const animals = await Animal.findAll({
        include: [
          {
            model: PhotoOfAnimal,
            as: 'photos',
            attributes: ['id', 'photoUrl', 'order'],
            order: [['order', 'ASC']], // Сортировка по порядку
          },
          {
            model: InfoAboutAnimal,
            as: 'extraInfo',
            attributes: ['id', 'description', 'facts'],
          },
        ],
        order: [['name', 'ASC']], // Сортировка по названию
      });

      return animals;
    } catch (error) {
      throw new Error(`Ошибка при получении животных: ${error.message}`);
    }
  }

  //Получить животное по ID со всеми данными: 
   //id - ID животного
   // Животное с фото и информацией

  static async getAnimalById(id) {
    try {
      const animal = await Animal.findByPk(id, {
        include: [
          {
            model: PhotoOfAnimal,
            as: 'photos',
            attributes: ['id', 'photoUrl', 'order'],
            order: [['order', 'ASC']],
          },
          {
            model: InfoAboutAnimal,
            as: 'extraInfo',
            attributes: ['id', 'description', 'facts'],
          },
        ],
      });

      if (!animal) {
        throw new Error(`Животное с ID ${id} не найдено`);
      }

      return animal;
    } catch (error) {
      throw new Error(`Ошибка при получении животного: ${error.message}`);
    }
  }

  //Создать новое животное: 
   //data - Данные животного
   // data.name - Название животного
   // data.feature - Описание животного
   // data.mainPhotoUrl - URL главной фотографии (опционально)
  
  static async createAnimal(data) {
    try {
      // Валидация
      if (!data.name || !data.feature) {
        throw new Error('Название и описание животного обязательны');
      }

      const animal = await Animal.create({
        name: data.name,
        feature: data.feature,
        mainPhotoUrl: data.mainPhotoUrl || null,
      });

      return animal;
    } catch (error) {
      throw new Error(`Ошибка при создании животного: ${error.message}`);
    }
  }

  //Обновить животное
  //id - ID животного
   // data - Новые данные

  static async updateAnimal(id, data) {
    try {
      const animal = await Animal.findByPk(id);

      if (!animal) {
        throw new Error(`Животное с ID ${id} не найдено`);
      }

      // Обновляем только переданные поля
      if (data.name) animal.name = data.name;
      if (data.feature) animal.feature = data.feature;
      if (data.mainPhotoUrl) animal.mainPhotoUrl = data.mainPhotoUrl;

      await animal.save();

      return animal;
    } catch (error) {
      throw new Error(`Ошибка при обновлении животного: ${error.message}`);
    }
  }

  //Удалить животное (и все связанные фото и информацию - ON DELETE CASCADE)
   // id - ID животного

  static async deleteAnimal(id) {
    try {
      const animal = await Animal.findByPk(id);

      if (!animal) {
        throw new Error(`Животное с ID ${id} не найдено`);
      }

      // При удалении животного, Sequelize автоматически удалит:
      // - PhotoOfAnimals (onDelete: CASCADE)
      // - InfoAboutAnimals (onDelete: CASCADE)
      await animal.destroy();

      return { message: `Животное ${animal.name} успешно удалено` };
    } catch (error) {
      throw new Error(`Ошибка при удалении животного: ${error.message}`);
    }
  }

  //Поиск животного по названию
// name - Название для поиска
//вернем - Массив животных, соответствующих поиску

  static async searchAnimalByName(name) {
    try {
      const animals = await Animal.findAll({
        where: {
          name: {
            [db.Sequelize.Op.iLike]: `%${name}%`, // Поиск без учёта регистра
          },
        },
        include: [
          {
            model: PhotoOfAnimal,
            as: 'photos',
            attributes: ['id', 'photoUrl', 'order'],
            order: [['order', 'ASC']],
          },
        ],
      });

      return animals;
    } catch (error) {
      throw new Error(`Ошибка при поиске животного: ${error.message}`);
    }
  }
}

module.exports = AnimalService;
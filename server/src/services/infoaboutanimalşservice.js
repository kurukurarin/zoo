const db = require('../db/models');
const { InfoAboutAnimal, Animal } = db;

//InfoAboutAnimalService - Сервис для работы с дополнительной информацией о животных
//Содержит логику для:
 //- Получения информации о животном
 //- Создания информации
 //- Обновления информации
 //- Удаления информации
 

class InfoAboutAnimalService {
  // Получить всю информацию о животном
  // animalId - ID животного
 
  static async getInfoByAnimalId(animalId) {
    try {
      // Проверяем что животное существует
      const animal = await Animal.findByPk(animalId);
      if (!animal) {
        throw new Error(`Животное с ID ${animalId} не найдено`);
      }

      const info = await InfoAboutAnimal.findAll({
        where: { animalId },
      });

      return info;
    } catch (error) {
      throw new Error(`Ошибка при получении информации: ${error.message}`);
    }
  }

  
   //Получить одну информационную запись по ID
   // infoId - ID информационной записи
  
  static async getInfoById(infoId) {
    try {
      const info = await InfoAboutAnimal.findByPk(infoId);

      if (!info) {
        throw new Error(`Информация с ID ${infoId} не найдена`);
      }

      return info;
    } catch (error) {
      throw new Error(`Ошибка при получении информации: ${error.message}`);
    }
  }

  
   //Создать новую информационную запись
 // animalId - ID животного
 // data - Данные информации
// data.description - Дополнительное описание
 // data.facts - Интересные факты
  
  static async createInfo(animalId, data) {
    try {
      // Проверяем что животное существует
      const animal = await Animal.findByPk(animalId);
      if (!animal) {
        throw new Error(`Животное с ID ${animalId} не найдено`);
      }

      // Валидация
      if (!data.description || !data.facts) {
        throw new Error('Описание и факты обязательны');
      }

      const info = await InfoAboutAnimal.create({
        animalId,
        description: data.description,
        facts: data.facts,
      });

      return info;
    } catch (error) {
      throw new Error(`Ошибка при создании информации: ${error.message}`);
    }
  }

  //Обновить информационную запись
   // infoId - ID информационной записи
 // data - Новые данные
 
  static async updateInfo(infoId, data) {
    try {
      const info = await InfoAboutAnimal.findByPk(infoId);

      if (!info) {
        throw new Error(`Информация с ID ${infoId} не найдена`);
      }

      // Обновляем только переданные поля
      if (data.description) info.description = data.description;
      if (data.facts) info.facts = data.facts;

      await info.save();

      return info;
    } catch (error) {
      throw new Error(`Ошибка при обновлении информации: ${error.message}`);
    }
  }

  //Удалить информационную запись
   // infoId - ID информационной записи

  static async deleteInfo(infoId) {
    try {
      const info = await InfoAboutAnimal.findByPk(infoId);

      if (!info) {
        throw new Error(`Информация с ID ${infoId} не найдена`);
      }

      await info.destroy();

      return { message: 'Информация успешно удалена' };
    } catch (error) {
      throw new Error(`Ошибка при удалении информации: ${error.message}`);
    }
  }
}

module.exports = InfoAboutAnimalService;
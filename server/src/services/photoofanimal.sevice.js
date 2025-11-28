const db = require('../db/models');
const { PhotoOfAnimal, Animal } = db;

//PhotoService - Сервис для работы с фотографиями животных
 //Содержит логику для:
 // - Получения фото животного
 //- Создания новой фотографии
 // - Обновления порядка фото
 //- Удаления фотографии
 

class PhotoService {
  // Получить все фото животного
   // animalId - ID животного
   // Возвращаем Массив фотографий отсортированных по порядку
  
  static async getPhotosByAnimalId(animalId) {
    try {
      // Проверяем что животное существует
      const animal = await Animal.findByPk(animalId);
      if (!animal) {
        throw new Error(`Животное с ID ${animalId} не найдено`);
      }

      const photos = await PhotoOfAnimal.findAll({
        where: { animalId },
        order: [['order', 'ASC']], // Сортировка по порядку
      });

      return photos;
    } catch (error) {
      throw new Error(`Ошибка при получении фото: ${error.message}`);
    }
  }

  //создать новую фотографию
// animalId - ID животного
// data - Данные фотографии
 // data.photoUrl - URL фотографии
// data.order - Порядок в галерее (опционально)

  static async createPhoto(animalId, data) {
    try {
      // Проверяем что животное существует
      const animal = await Animal.findByPk(animalId);
      if (!animal) {
        throw new Error(`Животное с ID ${animalId} не найдено`);
      }

      // Валидация
      if (!data.photoUrl) {
        throw new Error('URL фотографии обязателен');
      }

      // Если order не передан, берём максимальный порядок + 1
      let order = data.order;
      if (!order) {
        const lastPhoto = await PhotoOfAnimal.findOne({
          where: { animalId },
          order: [['order', 'DESC']],
        });
        order = lastPhoto ? lastPhoto.order + 1 : 1;
      }

      const photo = await PhotoOfAnimal.create({
        animalId,
        photoUrl: data.photoUrl,
        order,
      });

      return photo;
    } catch (error) {
      throw new Error(`Ошибка при создании фото: ${error.message}`);
    }
  }

  ///Обновить порядок фотографии
   // photoId - ID фотографии
   // newOrder - Новый порядок
  
  static async updatePhotoOrder(photoId, newOrder) {
    try {
      const photo = await PhotoOfAnimal.findByPk(photoId);

      if (!photo) {
        throw new Error(`Фотография с ID ${photoId} не найдена`);
      }

      if (!newOrder || newOrder < 1) {
        throw new Error('Порядок должен быть положительным числом');
      }

      photo.order = newOrder;
      await photo.save();

      return photo;
    } catch (error) {
      throw new Error(`Ошибка при обновлении порядка: ${error.message}`);
    }
  }

  //Получить одну фотографию по ID
   // photoId - ID фотографии

  static async getPhotoById(photoId) {
    try {
      const photo = await PhotoOfAnimal.findByPk(photoId);

      if (!photo) {
        throw new Error(`Фотография с ID ${photoId} не найдена`);
      }

      return photo;
    } catch (error) {
      throw new Error(`Ошибка при получении фото: ${error.message}`);
    }
  }

  //Удалить фотографию
  //photoId - ID фотографии

  static async deletePhoto(photoId) {
    try {
      const photo = await PhotoOfAnimal.findByPk(photoId);

      if (!photo) {
        throw new Error(`Фотография с ID ${photoId} не найдена`);
      }

      await photo.destroy();

      return { message: `Фотография успешно удалена` };
    } catch (error) {
      throw new Error(`Ошибка при удалении фото: ${error.message}`);
    }
  }

  //Переупорядочить фото после удаления
// (например, если удалили фото с order=2, то фото с order=3 становится order=2)
// animalId - ID животного

  static async reorderPhotos(animalId) {
    try {
      const photos = await PhotoOfAnimal.findAll({
        where: { animalId },
        order: [['order', 'ASC']],
      });

      // Переупорядочиваем по индексу
      for (let i = 0; i < photos.length; i++) {
        photos[i].order = i + 1;
        await photos[i].save();
      }

      return photos;
    } catch (error) {
      throw new Error(`Ошибка при переупорядочивании: ${error.message}`);
    }
  }
}

module.exports = PhotoService;
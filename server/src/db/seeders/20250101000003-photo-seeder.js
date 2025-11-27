'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    //Для каждого животного добавляем несколько фотографий
    // Используется поле order для сортировки в галерее (1, 2, 3...)
     // Animal IDs:
     //1 - Лев
     //2 - Слон
     //3 - Жираф
     //4 - Тигр
     //5 - Обезьяна
     //6 - Панда
     //7 - Полярный медведь
     //8 - Зебра
     

    await queryInterface.bulkInsert('PhotoOfAnimals', [
      // лев
      {
        animalId: 1,
        photoUrl: '/images/lion-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 1,
        photoUrl: '/images/lion-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 1,
        photoUrl: '/images/lion-3.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото слона
      {
        animalId: 2,
        photoUrl: '/images/elephant-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 2,
        photoUrl: '/images/elephant-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 2,
        photoUrl: '/images/elephant-3.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото жирафа
      {
        animalId: 3,
        photoUrl: '/images/giraffe-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 3,
        photoUrl: '/images/giraffe-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото тигра
      {
        animalId: 4,
        photoUrl: '/images/tiger-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 4,
        photoUrl: '/images/tiger-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 4,
        photoUrl: '/images/tiger-3.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото обезьяны
      {
        animalId: 5,
        photoUrl: '/images/monkey-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 5,
        photoUrl: '/images/monkey-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото панды
      {
        animalId: 6,
        photoUrl: '/images/panda-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 6,
        photoUrl: '/images/panda-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 6,
        photoUrl: '/images/panda-3.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото полярного медведя
      {
        animalId: 7,
        photoUrl: '/images/polar-bear-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 7,
        photoUrl: '/images/polar-bear-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото зебры
      {
        animalId: 8,
        photoUrl: '/images/zebra-1.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 8,
        photoUrl: '/images/zebra-2.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 8,
        photoUrl: '/images/zebra-3.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log('PhotoOfAnimals seeder завершён');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PhotoOfAnimals', null, {});
    console.log('PhotoOfAnimals seeder откачен');
  },
};

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
        photoUrl: 'https://ru.pinterest.com/pin/772085929916653237/',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 1,
        photoUrl: 'https://i.pinimg.com/1200x/e8/c3/07/e8c3073c581d84d3672481973231c9a6.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 1,
        photoUrl: 'https://i.pinimg.com/1200x/6a/73/0c/6a730cf456dedd8a46ad2bedacacf0d1.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото слона
      {
        animalId: 2,
        photoUrl: 'https://i.pinimg.com/1200x/d9/58/23/d958235ee27e39d6be709f9a6bda4ff7.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 2,
        photoUrl: 'https://i.pinimg.com/1200x/01/5d/b9/015db92e1fd1212256b1c0cf3e3cc43b.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 2,
        photoUrl: 'https://i.pinimg.com/736x/48/c5/e2/48c5e27b8a6926667c3bc4982bd8fbdc.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото жирафа
      {
        animalId: 3,
        photoUrl: 'https://i.pinimg.com/736x/44/ca/d5/44cad51ce9b690e8426aeb8637a9817b.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 3,
        photoUrl: 'https://i.pinimg.com/736x/e6/44/05/e644055c53bec9820d405b985b7b0034.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото тигра
      {
        animalId: 4,
        photoUrl: 'https://i.pinimg.com/736x/04/0b/de/040bde82e0bdc57913a073bf78e6daf2.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 4,
        photoUrl: 'https://i.pinimg.com/736x/1a/64/01/1a6401d781f19bca64eee655921a687e.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 4,
        photoUrl: 'https://i.pinimg.com/736x/08/dc/c8/08dcc8e66ed31e9aba3e0c2d272c8390.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото обезьяны
      {
        animalId: 5,
        photoUrl: 'https://i.pinimg.com/736x/42/a1/5a/42a15a8e8926c8ce05f68cf0b7ceea34.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 5,
        photoUrl: 'https://i.pinimg.com/1200x/cb/52/bc/cb52bc12632c67fa829b1514355b1897.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото панды
      {
        animalId: 6,
        photoUrl: 'https://i.pinimg.com/1200x/f5/7c/7a/f57c7ae974f3b8119536ac740bd1560c.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 6,
        photoUrl: 'https://i.pinimg.com/1200x/52/fd/cb/52fdcbce75b23fb1bbaa9c5ad0e7540b.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 6,
        photoUrl: 'https://i.pinimg.com/736x/6e/71/0a/6e710a928a91e6571141a86932eea377.jpg',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото полярного медведя
      {
        animalId: 7,
        photoUrl: 'https://i.pinimg.com/1200x/47/c5/7e/47c57ec87b334eca1050b74d9192b49c.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 7,
        photoUrl: 'https://i.pinimg.com/1200x/36/de/22/36de22e7c520e75c78f15cd4754061c7.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // фото зебры
      {
        animalId: 8,
        photoUrl: 'https://i.pinimg.com/736x/af/cf/1d/afcf1d1f119ffe9df8d51690da021935.jpg',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 8,
        photoUrl: 'https://i.pinimg.com/736x/25/2c/72/252c72c0a52d58e02ac1d480b8a9e611.jpg',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        animalId: 8,
        photoUrl: 'https://i.pinimg.com/736x/f8/60/33/f860336f624931692886149becd6a8ff.jpg',
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

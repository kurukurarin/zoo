'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
 
     //Добавляем тестовых разнообразных животных в зоопарк:
     //- Лев (Хищник)
     // - Слон (Травоядное)
     //- Жираф (Травоядное)
     //- Тигр (Хищник)
     //- Обезьяна (Всеядное)
     

    await queryInterface.bulkInsert('Animals', [
      {
        name: 'Лев',
        feature: 'Величественный король зверей. Известен своей силой и мастерством охоты. Самцы имеют характерную гриву, которая служит защитой и показателем статуса.',
        mainPhotoUrl: '/images/lion-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Слон',
        feature: 'Самое крупное наземное животное на планете. Обладает высоким интеллектом и сложной социальной структурой. Слоны известны своей долгой памятью и способностью к эмпатии.',
        mainPhotoUrl: '/images/elephant-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Жираф',
        feature: 'Самое высокое животное на Земле с длинной шеей и ногами. Благодаря своему росту, жирафы могут доставать листья с высоких деревьев, недоступные другим животным.',
        mainPhotoUrl: '/images/giraffe-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Тигр',
        feature: 'Самый крупный представитель семейства кошачьих. Известен своей оранжевой шерстью с чёрными полосами. Отличный охотник и пловец, в отличие от других больших кошек.',
        mainPhotoUrl: '/images/tiger-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Обезьяна',
        feature: 'Интеллигентные приматы, близкие родственники человека. Обезьяны живут в социальных группах с сложной иерархией. Известны своей ловкостью и способностью к обучению.',
        mainPhotoUrl: '/images/monkey-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Панда',
        feature: 'Редкое и уникальное животное, символ защиты природы. Панды в основном едят бамбук, хотя технически они хищники. Известны своей мягкой внешностью и игривым поведением.',
        mainPhotoUrl: '/images/panda-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Полярный медведь',
        feature: 'Крупнейший представитель семейства медведей. Адаптирован к жизни в арктических условиях с толстым слоем жира и водоотталкивающим мехом. Отличный пловец и охотник на льду.',
        mainPhotoUrl: '/images/polar-bear-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Зебра',
        feature: 'Африканское животное, известное своим характерным чёрно-белым полосатым окрасом. Полосы уникальны для каждой особи, как отпечатки пальцев. Живут в больших стадах для защиты от хищников.',
        mainPhotoUrl: '/images/zebra-main.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log('Animals seeder завершён');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Animals', null, {});
    console.log('Animals seeder откачен');
  },
};

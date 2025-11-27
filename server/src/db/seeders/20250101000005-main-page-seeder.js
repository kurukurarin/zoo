'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    //тест инфа для главной страницы

    await queryInterface.bulkInsert('MainPages', [
      {
        info: `Добро пожаловать в наш зоопарк! 

Наш зоопарк - это место, где вы можете увидеть и узнать об удивительных животных со всего мира. Мы посвящены образованию, сохранению и благополучию животных.

Наша миссия - вдохновлять людей любить и защищать дикую природу. Мы верим, что каждый может внести свой вклад в сохранение биоразнообразия нашей планеты.

В нашем зоопарке вы найдёте более 100 видов животных из разных континентов. От величественных львов до игривых обезьян, каждое животное имеет свою уникальную историю.

Посетите нас и проведите день, полный приключений и открытий!`,
        
        contacts: `Телефон: +7 (999) 123-45-67
Почта: info@zoo.com
Адрес: ул. Животных, 42, Город, Область, 123456
Время работы: 09:00 - 18:00 (все дни недели)
Последний вход: 17:00

Социальные сети:
Facebook: /ourzoopages
Instagram: @our_zoo_official
VK: vk.com/our_zoo`,

        updatedBy: 1, // Обновлено администратором с ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log(' Main_Page seeder завершён');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MainPages', null, {});
    console.log(' Main_Page seeder откачен');
  },
};

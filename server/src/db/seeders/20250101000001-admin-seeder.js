'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    // тестовые администраторы
     // Пароли:
     // admin@zoo.com: Admin123!!!
     // staff@zoo.com: Admin456!!!
   
    
    // Хешируем пароли
    const hashedPassword1 = await bcrypt.hash('Admin123!!!', 10);
    const hashedPassword2 = await bcrypt.hash('Admin456!!!', 10);

    await queryInterface.bulkInsert('AdminUsers', [
      {
        email: 'admin@zoo.com',
        password: hashedPassword1,
        // role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'staff@zoo.com',
        password: hashedPassword2,
        // role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log('AdminUsers seeder завершён');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AdminUsers', null, {});
    console.log('AdminUsers seeder откачен');
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PhotoOfAnimals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      animalId: {
        type: Sequelize.INTEGER,
        references: { model: "Animals", key: "id" },
        onDelete: "CASCADE",
      },
      photoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PhotoOfAnimals");
  },
};

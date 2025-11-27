'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InfoAboutAnimal extends Model {
    static associate(models) {
      // Информация принадлежит одному животному
      this.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });
    }
  }

  InfoAboutAnimal.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      animalId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'Animals',
          key: 'id',
        },
        onDelete: 'CASCADE', // удаляет инфо при удалении животного
        comment: 'Ссылка на животное',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Дополнительное описание животного',
      },
      facts: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment:
          'Интересные факты о животном', 
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'InfoAboutAnimal',
      tableName: 'InfoAboutAnimals',
      timestamps: true,
    }
  );

  return InfoAboutAnimal;
};

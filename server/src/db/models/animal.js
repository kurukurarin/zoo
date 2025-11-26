'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      // Одно животное имеет много фотографий
      this.hasMany(models.PhotoOfAnimal, {
        foreignKey: 'animalId',
        as: 'photos',
        onDelete: 'CASCADE', // Если удалить животное, удалятся все его фото
      });

      // Одно животное имеет дополнительную информацию
      this.hasMany(models.InfoAboutAnimal, {
        foreignKey: 'animalId',
        as: 'extraInfo',
        onDelete: 'CASCADE', 
      });
    }
  }

  Animal.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(255), 
        allowNull: false, 
        comment: 'Название животного (Лев, Слон, Жираф и т.д.)',
      },
      feature: {
        type: DataTypes.TEXT, 
        allowNull: false,
        comment: 'Неподробное описание животного',
      },
      
      mainPhotoUrl: {
        // ✅ ДОБАВЛЕНО: главная фотография для карточки
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'URL главной фотографии (показывается на карточке)',
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
      modelName: 'Animal',
      tableName: 'Animals',
      timestamps: true,
    }
  );

  return Animal;
};

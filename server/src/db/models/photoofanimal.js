'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PhotoOfAnimal extends Model {
    static associate(models) {
      // Много фотографий принадлежат одному животному
      this.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });
    }
  }

  PhotoOfAnimal.init(
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
        onDelete: 'CASCADE', // удаляет фото при удалении животного
        comment: 'Ссылка на животное',
      },
      photoUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: 'URL фотографии (путь к файлу в /public или облако)',
      },
      order: {
        // ✅ ДОБАВЛЕНО: порядок фото в галерее
        type: DataTypes.INTEGER,
        defaultValue: 1,
        // allowNull: false,
        comment: 'Порядок фотографии в галерее (1, 2, 3...)',
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
      modelName: 'PhotoOfAnimal',
      tableName: 'PhotoOfAnimals',
      timestamps: true,
    }
  );

  return PhotoOfAnimal;
};

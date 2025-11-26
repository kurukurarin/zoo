'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InfoAboutAnimal extends Model {
    static associate(models) {
      this.belongsTo(models.Animal, {
        foreignKey: 'animal_id'
      });
    }
  }
  InfoAboutAnimal.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      animal_id: {
        type: DataTypes.BIGINT,
        references: {
        model: { tableName: 'Animals' },
        key: 'id'
      }
      },
      description: {
        type: DataTypes.TEXT
      },
      facts: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'InfoAboutAnimal',
  });
  return InfoAboutAnimal;
};
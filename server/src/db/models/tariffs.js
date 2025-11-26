'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tariffs extends Model {
    static associate(models) {
      // define association here
    }
  }
  Tariffs.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tariff_weekdays: {
        type: DataTypes.TEXT
      },
      tariff_weekend: {
        type: DataTypes.TEXT
      },
      benefits: {
        type: DataTypes.TEXT
      },
      conditions: {
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
    modelName: 'Tariffs',
  });
  return Tariffs;
};
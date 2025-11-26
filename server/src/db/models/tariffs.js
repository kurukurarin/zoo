'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tariffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tariffs.init({
    tariff_weekdays: DataTypes.TEXT,
    tariff_weekend: DataTypes.TEXT,
    benefits: DataTypes.TEXT,
    conditions: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tariffs',
  });
  return Tariffs;
};
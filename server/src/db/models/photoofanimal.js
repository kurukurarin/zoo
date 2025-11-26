'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoOfAnimal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhotoOfAnimal.init({
    animal_id: DataTypes.BIGINT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhotoOfAnimal',
  });
  return PhotoOfAnimal;
};
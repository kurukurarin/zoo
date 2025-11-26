'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InfoAboutAnimal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InfoAboutAnimal.init({
    animal_id: DataTypes.BIGINT,
    description: DataTypes.TEXT,
    facts: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'InfoAboutAnimal',
  });
  return InfoAboutAnimal;
};
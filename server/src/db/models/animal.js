const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      this.hasMany(models.InfoAboutAnimal, {
        foreignKey: 'animal_id'
      });

      this.hasMany(models.PhotoOfAnimal, {
        foreignKey: 'animal_id'
      })
    }
  }
  Animal.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      info: {
        type: DataTypes.STRING
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
    modelName: 'Animal',
  });
  return Animal;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoOfAnimal extends Model {
    static associate(models) {
      this.belongsTo(models.Animal, {
        foreignKey: 'animal_id'
      })
    }
  }
  PhotoOfAnimal.init({
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
      photo_url: {
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
    modelName: 'PhotoOfAnimal',
  });
  return PhotoOfAnimal;
};
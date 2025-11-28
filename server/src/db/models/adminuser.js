'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdminUser extends Model {
    static associate(models) {
      // Один администратор может обновлять много тарифов
      this.hasMany(models.Tariff, {
        foreignKey: 'updatedBy',
        as: 'tariffUpdates'
      });

      // Один администратор может обновлять главную страницу
      this.hasMany(models.MainPage, {
        foreignKey: 'updatedBy',
        as: 'mainPageUpdates'
      });
    }
  }

  AdminUser.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING(255), 
        allowNull: false,
        unique: true, //почта должна быть уникальной
        validate: {
          isEmail: true, // Проверка что это почта
        },
      },
      password: {
        type: DataTypes.STRING(255), 
        allowNull: false,
      },
      // role: {
      //   // ДОБАВЛЕНО: новое поле роль
      //   type: DataTypes.STRING(50),
      //   defaultValue: 'ADMIN',
      //   allowNull: false,
      //   validate: {
      //     isIn: [['ADMIN', 'USER']], // Только admin же у нас
      //   },
      // },
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
      modelName: 'AdminUser',
      tableName: 'AdminUsers', // Имя таблицы в БД
      timestamps: true,
    }
  );

  return AdminUser;
};

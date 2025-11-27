'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MainPage extends Model {
    static associate(models) {
      // Кто последний изменил главную страницу
      this.belongsTo(models.AdminUser, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser',
      });
    }
  }

  MainPage.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Информация о зоопарке на главной странице (описание)',
      },
      contacts: {
        // ДОБАВЛЕНО: контакты 
        type: DataTypes.STRING(500),
        allowNull: false,
        comment:
          'Контакты зоопарка (телефон, почта, адрес, время работы и т.д.)',
      },
      updatedBy: {
        // ✅ ДОБАВЛЕНО: кто последний изменил
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'AdminUsers',
          key: 'id',
        },
        onDelete: 'SET NULL', // Если удалить админа, то updatedBy = NULL
        comment: 'ID администратора который последний изменил страницу',
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
      modelName: 'MainPage',
      tableName: 'Main_Page', // Имя таблицы в БД (с подчеркиванием)
      timestamps: true,
    }
  );

  return MainPage;
};

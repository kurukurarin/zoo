'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tariffs extends Model {
    static associate(models) {
      // Кто последний изменил тарифы
      this.belongsTo(models.AdminUser, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser',
      });
    }
  }

  Tariffs.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tariff_weekdays: {
        // цена в будни
        type: DataTypes.DECIMAL(10, 2), // 10 цифр, 2 после запятой
        allowNull: false,
        comment: 'Цена билета в будни (пн-чт)',
      },
      tariff_weekend: {
        // цена в выходной
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Цена билета в выходные (сб-вс)',
      },
      benefits: {
        // Скидки и льготы
        type: DataTypes.TEXT,
        allowNull: true,
        comment:
          'Информация о скидках и льготах (студенты, инвалиды, пенсионеры и т.д.)',
      },
      conditions: {
        // Условия посещения
        type: DataTypes.TEXT,
        allowNull: true,
        comment:
          'Условия посещения (правила поведения, время работы, запреты и т.д.)',
      },
      updatedBy: {
        // Кто последний изменил
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'AdminUsers',
          key: 'id',
        },
        onDelete: 'SET NULL', // Если удалить админа, то updatedBy = NULL
        comment: 'ID администратора который последний изменил тарифы',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Tariff',
      tableName: 'Tariffs',
      timestamps: false, // Только updatedAt, createdAt не нужен
      createdAt: false,
      updatedAt: true,
    }
  );

  return Tariffs;
};

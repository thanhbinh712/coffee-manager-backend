// const { Sequelize } = require("sequelize");
var Promotions = sequelize.define(
    "promotions",
    {
      promotion_code: {
          type: Sequelize.STRING(45),
          field: "promotion_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      name: {
        type: Sequelize.STRING(255),
        field: "name",
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        field: "start_date",
        allowNull: true,
      },
      finish_date: {
        type: Sequelize.DATE,
        field: "finish_date",
        allowNull: true,
      },
      status: {
        type: Sequelize.BIGINT,
        field: "status",
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "createdAt",
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updatedAt",
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [],
    },
  );
  module.exports = Promotions;
// const { Sequelize } = require("sequelize");
var Promotion_details = sequelize.define(
    "promotion_details",
    {
      id: {
          type: Sequelize.BIGINT,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
      promotion_code: {
        type: Sequelize.STRING(45),
        field: "promotion_code",
        allowNull: true,
      },
      product_code: {
        type: Sequelize.STRING(45),
        field: "product_code",
        allowNull: true,
      },
      percent: {
        type: Sequelize.BIGINT,
        field: "percent",
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
  module.exports = Promotion_details;
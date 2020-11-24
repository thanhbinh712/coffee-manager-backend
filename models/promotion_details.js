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
      percent: {
        type: Sequelize.BIGINT,
        field: "percent",
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
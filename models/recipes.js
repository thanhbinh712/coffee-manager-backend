// const { Sequelize } = require("sequelize");
var Recipes = sequelize.define(
    "recipes",
    {
      id: {
          type: Sequelize.BIGINT,
          field: "id",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      quantity: {
        type: Sequelize.BIGINT,
        field: "quantity",
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
  module.exports = Recipes;
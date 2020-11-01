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
      product_details_id: {
        type: Sequelize.BIGINT,
        field: "product_details_id",
        allowNull: true,
      },
      ingredient_code: {
        type: Sequelize.STRING(45),
        field: "ingredient_code",
        allowNull: true,
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
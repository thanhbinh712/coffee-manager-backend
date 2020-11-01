// const { Sequelize } = require("sequelize");
var Ingredients = sequelize.define(
  "ingredients",
  {
    ingredient_code: {
      type: Sequelize.STRING(45),
      field: "ingredient_code",
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      field: "name",
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING(45),
      field: "unit",
      allowNull: true,
    },
    quantity: {
        type: Sequelize.BIGINT,
        field: "quantity",
        allowNull: false,
      },
    warning_limited: {
        type: Sequelize.BIGINT,
        field: "warning_limited",
        allowNull: true,
      },
    inventory: {
        type: Sequelize.BIGINT,
        field: "inventory",
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
  }
);
module.exports = Ingredients;

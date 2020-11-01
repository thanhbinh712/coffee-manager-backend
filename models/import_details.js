// const { Sequelize } = require("sequelize");
var Import_details = sequelize.define(
    "import_details",
    {
      id: {
        type: Sequelize.BIGINT,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      import_code: {
        type: Sequelize.STRING(45),
        field: "product_code",
        allowNull: false,
      },
      ingredient_code: {
        type: Sequelize.STRING(45),
        field: "ingredient_code",
        allowNull: true,
      },
      number: {
        type: Sequelize.BIGINT,
        field: "number",
        allowNull: true,
      },
      price_unit: {
        type: Sequelize.BIGINT,
        field: "price_unit",
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
  module.exports = Import_details;
  
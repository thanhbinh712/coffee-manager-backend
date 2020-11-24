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
  
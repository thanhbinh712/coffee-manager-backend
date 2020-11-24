// const { Sequelize } = require("sequelize");
var Bill_details = sequelize.define(
    "import_details",
    {
      id: {
        type: Sequelize.BIGINT,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
  module.exports = Bill_details;
  
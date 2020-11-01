// const { Sequelize } = require("sequelize");
var Bills = sequelize.define(
    "bills",
    {
      bill_code: {
          type: Sequelize.STRING(45),
          field: "area_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      total: {
        type: Sequelize.BIGINT,
        field: "total",
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
  module.exports = Bills;
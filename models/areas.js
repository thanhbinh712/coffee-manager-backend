// const { Sequelize } = require("sequelize");
var Areas = sequelize.define(
    "areas",
    {
      area_code: {
          type: Sequelize.STRING(45),
          field: "area_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      name: {
        type: Sequelize.STRING(255),
        field: "name",
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
  module.exports = Areas;
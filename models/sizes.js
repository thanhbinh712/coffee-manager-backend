// const { Sequelize } = require("sequelize");
var Sizes = sequelize.define(
    "sizes",
    {
      size_code: {
          type: Sequelize.STRING(45),
          field: "size_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      name: {
        type: Sequelize.STRING(45),
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
  module.exports = Sizes;
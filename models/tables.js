const { Sequelize } = require("sequelize");
var Tables = sequelize.define(
    "tables",
    {
      table_code: {
          type: Sequelize.STRING(45),
          field: "table_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      name: {
        type: Sequelize.STRING(45),
        field: "name",
        allowNull: true,
      },
      seat_number: {
        type: Sequelize.BIGINT,
        field: "seat_number",
        allowNull: true,
      },
      status: {
        type: Sequelize.BIGINT,
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
  module.exports = Tables;
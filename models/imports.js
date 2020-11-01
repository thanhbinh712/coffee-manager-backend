// const { Sequelize } = require("sequelize");
var Imports = sequelize.define(
    "imports",
    {
      import_code: {
          type: Sequelize.STRING(45),
          field: "import_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      total: {
        type: Sequelize.BIGINT,
        field: "total",
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
  module.exports = Imports;
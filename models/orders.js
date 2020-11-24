// const { Sequelize } = require("sequelize");
var Orders = sequelize.define(
  "orders",
  {
    table_code: {
      type: Sequelize.STRING(45),
      field: "table_code",
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    number: {
      type: Sequelize.BIGINT,
      field: "number",
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
module.exports = Orders;

// const { Sequelize } = require("sequelize");
var Orders = sequelize.define(
  "orders",
  {
    order_id: {
      type: Sequelize.BIGINT,
      field: "order_id",
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    number: {
      type: Sequelize.BIGINT,
      field: "number",
      allowNull: true,
    },
    paid: {
      type: Sequelize.BIGINT,
      field: "paid",
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

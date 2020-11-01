// const { Sequelize } = require("sequelize");
var Product_details = sequelize.define(
  "product_details",
  {
    id: {
      type: Sequelize.BIGINT,
      field: "id",
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_code: {
      type: Sequelize.STRING(45),
      field: "product_code",
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    size_code: {
      type: Sequelize.STRING(45),
      field: "size_code",
      primaryKey: true,
      autoIncrement: false,
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
module.exports = Product_details;

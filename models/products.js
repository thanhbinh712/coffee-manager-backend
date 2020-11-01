// const { Sequelize } = require("sequelize");
var Products = sequelize.define(
    "products",
    {
      product_code: {
          type: Sequelize.STRING(45),
          field: "product_code",
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
      name: {
        type: Sequelize.STRING(255),
        field: "name",
        allowNull: true,
      },
      price: {
        type: Sequelize.BIGINT,
        field: "price",
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(255),
        field: "description",
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(255),
        field: "image",
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
  module.exports = Products;
const { Sequelize } = require("sequelize");
var Users = sequelize.define(
  "users",
  {
    id: {
        type: Sequelize.BIGINT,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    email: {
      type: Sequelize.STRING(255),
      field: "email",
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(255),
      field: "password",
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING(255),
      field: "name",
      allowNull: true,
    },
    gender: {
      type: Sequelize.BIGINT,
      field: "gender",
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING(45),
      field: "phone",
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING(255),
      field: "address",
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
module.exports = Users;
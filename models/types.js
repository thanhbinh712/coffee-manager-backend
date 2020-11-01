var Types = sequelize.define(
    "types",
    {
      type_code: {
          type: Sequelize.STRING(45),
          field: "type_code",
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
  module.exports = Types;
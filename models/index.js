global.Sequelize = require("sequelize");
global.sequelize = new Sequelize("coffee_manager", "root", "binh123", {
  host: "127.0.0.1",
  //logging: false,
  dialect: "mysql",
  pool: {
    max: 50,
    min: 0,
    idle: 10000,
  },
});

global.Roles = require("./roles");
global.Users = require("./users");
global.Imports = require("./imports");
global.Bills = require("./bills");
global.Tables = require("./tables");
global.Areas = require("./areas");
global.Import_Details = require("./import_details");
global.Bill_Details = require("./bill_details");
global.Ingredients = require("./ingredients");
global.Recipes = require("./recipes");
global.Sizes = require("./sizes");
global.Types = require("./types");
global.Products = require("./products");
global.Product_Details = require("./product_details");
global.Orders = require("./orders");
global.Promotions = require("./promotions");
global.Promotion_Details = require("./promotion_details");

//join table
Roles.hasMany(Users, {
  sourceKey: "role_code",
  foreignKey: "roles_role_code",
  as: "list_user",
});

Users.belongsTo(Roles, {
  targetKey: "role_code",
  foreignKey: "roles_role_code",
  as: "detail_role",
});

Users.hasMany(Imports, {
  sourceKey: "id",
  foreignKey: "users_id",
  as: "list_import",
});

Imports.belongsTo(Users, {
  targetKey: "id",
  foreignKey: "users_id",
  as: "detail_user_import",
});

Users.hasMany(Bills, {
  sourceKey: "id",
  foreignKey: "users_id",
  as: "list_bill",
});

Bills.belongsTo(Users, {
  targetKey: "id",
  foreignKey: "users_id",
  as: "detail_user_bill",
});

Imports.hasMany(Import_Details, {
  sourceKey: "import_code",
  foreignKey: "imports_import_code",
  as: "list_import_detail",
});

Import_Details.belongsTo(Imports, {
  targetKey: "import_code",
  foreignKey: "imports_import_code",
  as: "detail_import",
});

Bills.hasMany(Bill_Details, {
  sourceKey: "bill_code",
  foreignKey: "bills_bill_code",
  as: "list_bill_detail",
});

Bill_Details.belongsTo(Bills, {
  targetKey: "bill_code",
  foreignKey: "bills_bill_code",
  as: "detail_bill",
});

Areas.hasMany(Tables, {

});

Tables.belongsTo(Areas, {

});

Tables.hasMany(Bills, {

});

Bills.belongsTo(Tables, {

});

Tables.hasMany(Orders, {

});

Orders.belongsTo(Tables, {

});



Types.hasMany(Products, {
  sourceKey: "type_code",
  foreignKey: "types_type_code",
  as: "list_product",
});

Products.belongsTo(Types, {
  targetKey: "type_code",
  foreignKey: "types_type_code",
  as: "detail_type",
});



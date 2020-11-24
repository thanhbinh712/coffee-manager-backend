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
global.Types = require("./types");
global.Products = require("./products");
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
  as: "list_user_bill",
});

Bills.belongsTo(Users, {
  targetKey: "id",
  foreignKey: "users_id",
  as: "detail_user_bill",
});

Imports.hasMany(Import_Details, {
  sourceKey: "import_code",
  foreignKey: "imports_import_code",
  as: "list_import_detail_product",
});

Import_Details.belongsTo(Imports, {
  targetKey: "import_code",
  foreignKey: "imports_import_code",
  as: "detail_import_product",
});

Ingredients.hasMany(Import_Details, {
    sourceKey: "ingredient_code",
    foreignKey: "ingredients_ingredient_code",
    as: "list_import_detail_ingredient",
});

Import_Details.belongsTo(Ingredients, {
    targetKey: "ingredient_code",
    foreignKey: "ingredients_ingredient_code",
    as: "detail_import_ingredient",
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

Products.hasMany(Bill_Details, {
  sourceKey: "product_code",
  foreignKey: "products_product_code",
  as: "list_bill_product",
});

Bill_Details.belongsTo(Products, {
  targetKey: "product_code",
  foreignKey: "products_product_code",
  as: "detail_bill_product",
});

Areas.hasMany(Tables, {
  sourceKey: "area_code",
  foreignKey: "areas_area_code",
  as: "list_table",
});

Tables.belongsTo(Areas, {
  targetKey: "area_code",
  foreignKey: "areas_area_code",
  as: "detail_area",
});

Tables.hasMany(Bills, {
  sourceKey: "table_code",
  foreignKey: "tables_table_code",
  as: "list_table_bill",
});

Bills.belongsTo(Tables, {
  targetKey: "table_code",
  foreignKey: "tables_table_code",
  as: "detail_table_bill",
});

Tables.hasMany(Orders, {
  sourceKey: "table_code",
  foreignKey: "tables_table_code",
  as: "list_table_order",
});

Orders.belongsTo(Tables, {
  targetKey: "table_code",
  foreignKey: "tables_table_code",
  as: "detail_table_order",
});

Products.hasMany(Orders, {
  sourceKey: "product_code",
  foreignKey: "products_product_code",
  as: "list_product_order",
});

Orders.belongsTo(Products, {
  targetKey: "product_code",
  foreignKey: "products_product_code",
  as: "detail_product_order",
});

Promotions.hasMany(Promotion_Details, {
  sourceKey: "promotion_code",
  foreignKey: "promotions_promotion_code",
  as: "list_promotion",
});

Promotion_Details.belongsTo(Promotions, {
  targetKey: "promotion_code",
  foreignKey: "promotions_promotion_code",
  as: "detail_promotion",
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

Products.hasMany(Promotion_Details, {
    sourceKey: "product_code",
    foreignKey: "products_product_code",
    as: "list_promotion_product",
});

Promotion_Details.belongsTo(Products, {
    targetKey: "product_code",
    foreignKey: "products_product_code",
    as: "detail_product_promotion",
});

Ingredients.hasMany(Recipes, {
    sourceKey: "ingredient_code",
    foreignKey: "ingredients_ingredient_code",
    as: "list_recipe_ingredient",
});

Recipes.belongsTo(Ingredients, {
    targetKey: "ingredient_code",
    foreignKey: "ingredients_ingredient_code",
    as: "detail_ingredient_recipe",
});

Products.hasMany(Recipes, {
    sourceKey: "product_code",
    foreignKey: "products_product_code",
    as: "list_recipe_product",
});

Recipes.belongsTo(Products, {
    targetKey: "product_code",
    foreignKey: "products_product_code",
    as: "detail_product_recipe",
});

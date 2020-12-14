const { verifySignUp, authJwt, verifyCreateProduct} = require("../middleware");
const controller = require("../controller/auth.controller");
const productController = require("../controller/product.controller");
const typeController = require("../controller/type.controller");
const ingredientController = require("../controller/ingredient.controller");
const areaController = require("../controller/area.controller");
const tableController = require("../controller/table.controller");
const importController = require("../controller/import.controller");
const promotionController = require("../controller/promotion.controller");
const orderController = require("../controller/order.controller");
const billController = require("../controller/bill.controller");
const staffController = require("../controller/user.controller");
const roleController = require("../controller/role.controller");
const importDetailsController = require("../controller/importdetails.controller");

const upload = require("../config/multer.config");
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept",
      );
      next();
    });

    //user
    app.get(
      "/api/auth/users",
      controller.getUsers,
    );
    app.get(
      "/api/auth/get_role",
      roleController.getRoles,
    );  
  app.post(
    "/api/auth/users",
    [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );
  app.post(
    "/api/auth/login",
    controller.login
  );

  app.put(
    "/api/auth/users",
    [authJwt.verifyToken],
    controller.updateUser
  );
  
  app.put(
    "/api/auth/delete_user",
    [authJwt.verifyToken],
    controller.deleteUser
  );

  app.get(
    "/api/product",
    productController.getProducts
  );
 app.post(
  "/api/product",
  upload.array("image", 1),
  productController.createProduct
);
app.post(
    "/api/update_product",
    upload.array("image", 1),
    productController.updateProduct
  );

app.get(
  "/api/type/product",
  productController.getProductsType
);
  app.delete(
    "/api/product",
    productController.deleteProduct
  );
app.get(
  "/api/type",
  typeController.getTypes
);
app.post(
"/api/type",
[authJwt.verifyToken],
typeController.createType
);
app.put(
"/api/type",
[authJwt.verifyToken],
typeController.updateType
);
app.delete(
"/api/type",
[authJwt.verifyToken],
typeController.deleteType
);
app.get(
  "/api/ingredient",
  ingredientController.getIngredients
);
app.post(
  "/api/ingredient",
  [authJwt.verifyToken],
  ingredientController.createIngredient
);
app.put(
    "/api/ingredient",
    [authJwt.verifyToken],
    ingredientController.updateIngredient
  );
  app.delete(
    "/api/ingredient",
    [authJwt.verifyToken],
    ingredientController.deleteIngredient
  );
app.post(
  "/api/area",
  [authJwt.verifyToken],
  areaController.createArea
);
app.get(
  "/api/area",
  areaController.getAreas
);
app.put(
  "/api/area",
  [authJwt.verifyToken],
  areaController.updateArea
);
app.delete(
    "/api/area",
    [authJwt.verifyToken],
    areaController.deleteArea
  );
app.post(
  "/api/table",
  [authJwt.verifyToken],
  tableController.createTable
);
app.get(
  "/api/table",
  tableController.getTables
);
app.put(
    "/api/table",
    [authJwt.verifyToken],
    tableController.updateTable
  );
  app.delete(
    "/api/table",
    [authJwt.verifyToken],
    tableController.deleteTable
  );
 app.get(
   "/api/area/table",
   tableController.getTablesAreas
 );

app.post(
  "/api/promotion",
  [authJwt.verifyToken],
  promotionController.createPromotion
);
app.get(
  "/api/promotion",
  promotionController.getPromotions
);

app.get(
  "/api/get_import",
  importController.getImports
)
app.post(
  "/api/auth/create_import",
  [authJwt.verifyToken],
  importController.createImport
)

app.get(
  "/api/get_import_details",
  importDetailsController.getImportDetails
)
app.post(
  "/api/auth/create_import_detail",
  [authJwt.verifyToken],
  importDetailsController.createImportDetails
)

app.post(
  "/api/create_order",
  orderController.createOrder
)

app.get(
  "/api/get_order",
  orderController.getOrder
)

app.get(
  "/api/get_import_details",
  importDetailsController.getImportDetails
)

};
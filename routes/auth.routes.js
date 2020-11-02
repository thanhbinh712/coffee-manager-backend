const { verifySignUp, authJwt, verifyCreateProduct} = require("../middleware");
const controller = require("../controller/auth.controller");
const productController = require("../controller/product.controller");
const typeController = require("../controller/type.controller");
const upload = require("../config/multer.config");
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept",
      );
      next();
    });
    app.get(
      "/api/auth/users",
      controller.getUsers,
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
  app.get(
    "/api/product",
    productController.getProducts
  );
 app.post(
  "/api/product",
  upload.array("image", 1),
  productController.createProduct
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

};
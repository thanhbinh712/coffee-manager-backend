const Products = require("../models/products");

checkDuplicateProductCode = (req, res, next) => {
  // Email
  Products.findOne({
    where: {
      product_code: req.body.product_code,
    },
  }).then((product) => {
    if (product) {
      res.status(400).send({
        message: "Failed! Product code is already in use!",
      });
      return;
    }

    next();
  });
};
const verifyCreateProduct = {
    checkDuplicateProductCode: checkDuplicateProductCode,
};
module.exports = verifyCreateProduct;

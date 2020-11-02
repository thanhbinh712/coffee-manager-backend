const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Products = require("../models/products");
exports.createProduct = async (req, res) => {
  // Save Product to Database
  let image = req.files[0].filename;
  console.log(image);
  let {
    product_code,
    name,
    price,
    description,
    types_type_code,
  } = req.body;

  try {
    let product = await Products.create({
      product_code,
      name,
      price,
      description,
      image,
      types_type_code,
    });
    if (product) {
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    let result = await Products.findAll({
      attributes: ["product_code", "name", "price", "description", "image"],
      include: [
        {
          model: Types,
          as: "detail_type",
        },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

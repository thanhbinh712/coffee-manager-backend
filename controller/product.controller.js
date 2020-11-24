const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Op = Sequelize.Op;
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
      description,
      image,
      price,
      types_type_code,
    });
    if (product) {
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
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
    let product = await Products.update(
      {
        name,
        description,
        image,
        price,
        types_type_code,
      },
      {
        where: {
            product_code: product_code,
        },
      }
    );
    if (product) {
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
    let { product_code } = req.body;
  
    try {
      let product = await Products.destroy({
        where: {
            product_code: product_code,
        },
      });
     
        res.status(200).send("success");
    
    } catch (error) {
      res.status(500).send(error);
    }
  };


exports.getProducts = (req, res) => {
  let { page, perPage, createdAt, name } = req.query;
  let where = {
    createdAt: {
      [Op.between]: [createdAt, new Date()],
    },
    name: {
      [Op.like]: `%${name}%`
    }
  };
  if (!createdAt) {
    delete where.createdAt;
  }
  if(!name)
  {
    delete where.name;
  }
  Products.findAndCountAll({
    limit: perPage ? parseInt(perPage) : 10,
    offset: page ? parseInt(page - 1) * parseInt(perPage) : 0,
    distinct: true,
    attributes: ["product_code", "name", "description", "price", "image"],
    include: [
              {
                model: Types,
                as: "detail_type",
              },
            ],
    where: where,
  })
    .then((result) =>
      res.json({
        total: result.count,
        data: result.rows,
      })
    )
    .catch((err) => {
      res.status(500).send("Internal server " + err);
    });
};


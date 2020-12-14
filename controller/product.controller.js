const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Op = Sequelize.Op;
const Products = require("../models/products");
exports.createProduct = async (req, res) => {
  // Save Product to Database
  let image = req.files[0].filename;
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
      res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
  let image = req.files[0].filename;
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
    let result=await Products.findOne({
      attributes:["product_code", "name","image", "description", "price"],
      include: [
        {
          model: Types,
          as: "detail_type",
        },
      ],
      where: {
        product_code:product_code
      }
    })
      res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
    let { product_code } = req.body;
    try {
       await Products.destroy({
        where: {
            product_code: product_code,
        },
      });
      res.status(200).send({
        deleted:product_code
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };


exports.getProducts =async (req, res) => {
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
  try {
    let result =await Products.findAndCountAll({
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
  });
  res.json({
          total: result.count,
          data: result.rows,
        })
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductsType = async (req, res) => {
  let { types_type_code } = req.query;
  try {
    let where={
      types_type_code: types_type_code,
   }
   if(!types_type_code){delete where.types_type_code}
    let result = await Products.findAll({
      attributes: ["product_code", "name", "description", "price", "image","types_type_code"],
      include: [
        {
          model: Types,
          as: "detail_type",
        },
      ],
      where: where,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.getProductsType =async (req, res) => {
//   let { types_type_code } = req.query;
//   try {
//     let result =await Products.findAndCountAll({
//     limit: perPage ? parseInt(perPage) : 10,
//     offset: page ? parseInt(page - 1) * parseInt(perPage) : 0,
//     distinct: true,
//     attributes: ["product_code", "name", "description", "price", "image", "types_type_code"],
//     include: [
//               {
//                 model: Types,
//                 as: "detail_type",
//               },
//             ],
//     where: {
//       types_type_code: types_type_code,
//     },
//   });
//   res.json({
//           total: result.count,
//           data: result.rows,
//         })
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
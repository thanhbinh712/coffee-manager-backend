const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Products = require("../models/products");
exports.createProduct = async (req, res) => {
  // Save Product to Database
  let {
    product_code,
    name,
    price,
    description,
    image,
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
//   exports.login = (req, res) => {
//     let { email, password } = req.body;
//     Users.findOne({
//       attributes: [
//         "email",
//         "name",
//         "password",
//         "gender",
//         "address",
//         "phone",
//         "roles_role_code",
//         "createdAt",
//         "updatedAt",
//       ],
//       where: {
//         email: email,
//       },
//     })
//       .then((user) => {
//         console.log(user)
//         if (!user) {
//           return res.status(404).send({ message: "User Not found." });
//         }

//         var passwordIsValid = bcrypt.compareSync(password, user.password);

//         if (!passwordIsValid) {
//           return res.status(401).send({
//             accessToken: null,
//             message: "Invalid Password!",
//           });
//         }

//         var token = jwt.sign({ id: user.email }, config.secret, {
//           expiresIn: "30d", // 24 hours
//         });

//         res.status(200).send({
//           email: user.email,
//           name: user.name,
//           roles_role_code: user.roles_role_code,
//           accessToken: token,
//         });
//       })
//       .catch((err) => {
//         res.status(500).send(err);
//       });
//   };
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

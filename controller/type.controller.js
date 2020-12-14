const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Op = Sequelize.Op;
const Types = require("../models/types");
exports.createType = async (req, res) => {
  // Save Product to Database
  let { type_code, name } = req.body;

  try {
    let type = await Types.create({
      type_code,
      name,
    });

    res.status(200).send(type);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateType = async (req, res) => {
  let { type_code, name } = req.body;

  try {
    let type = await Types.update(
      {
        name,
      },
      {
        where: {
          type_code: type_code,
        },
      }
    );
    let result=await Types.findOne({
      attributes:["type_code", "name"],
      where: {
        type_code:type_code
      }
    })
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteType = async (req, res) => {
  let { type_code } = req.body;
  try {
   await Types.destroy({
      where: {
        type_code: type_code,
      },
    });
    res.status(200).send({
      deleted:type_code
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.getTypes = async (req, res) => {
//   try {
//     let result = await Types.findAll({
//       attributes: ["type_code", "name"],
//     });
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

exports.getTypes =async (req, res) => {
  let {createdAt, name } = req.query;
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
    let result =await Types.findAndCountAll({
    attributes: ["type_code", "name"],
    where: where,
  });
  res.json({
          data: result.rows,
        })
  } catch (error) {
    res.status(500).send(error);
  }
};


const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Types = require("../models/types");
exports.createType = async (req, res) => {
  // Save Product to Database
  let {
    type_code,
    name,
  } = req.body;

  try {
    let type = await Types.create({
      type_code,
      name,
    });
    if (type) {
      res.status(200).send(type);
    }
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
    if (type) {
      res.status(200).send(type);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteType = async (req, res) => {
  let { type_code } = req.body;

  try {
    let type = await Types.destroy({
      where: {
        type_code: type_code,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTypes = async (req, res) => {
  try {
    let result = await Types.findAll({
      attributes: ["type_code", "name"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Areas = require("../models/areas");
exports.createArea = async (req, res) => {
  // Save Product to Database
  let { area_code, name } = req.body;

  try {
    let area = await Areas.create({
      area_code,
      name,
    });
    if (area) {
      res.status(200).send(area);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAreas = async (req, res) => {
  try {
    let result = await Areas.findAll({
      attributes: ["area_code", "name"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateArea = async (req, res) => {
  let { area_code, name } = req.body;

  try {
    let area = await Areas.update(
      {
        name,
      },
      {
        where: {
          area_code: area_code,
        },
      }
    );
    if (area) {
      res.status(200).send(area);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteArea = async (req, res) => {
  let { area_code } = req.body;

  try {
    let area = await Areas.destroy({
      where: {
        area_code: area_code,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

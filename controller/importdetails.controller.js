const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const ImportDetails = require("../models/import_details");
exports.createImportDetails = async (req, res) => {
  let {
    number,
    price_unit,
    imports_import_code,
    ingredients_ingredient_code,
  } = req.body;

  try {
    let import_details = await ImportDetails.create({
        number,
        price_unit,
        imports_import_code,
        ingredients_ingredient_code,
    });
    if (import_details) {
      res.status(200).send(import_details);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateImportDetails = async (req, res) => {
  let {
    id,
    number,
    price_unit,
    imports_import_code,
    ingredients_ingredient_code,
  } = req.body;

  try {
    let import_details = await ImportDetails.update({
        number,
        price_unit,
        imports_import_code,
        ingredients_ingredient_code,
      },
      {
        where: {
          id: id,
        }
      }
      );
    if (import_details) {
      res.status(200).send(import_details);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteImportDetails = async (req, res) => {
  let { id } = req.body;

  try {
    let import_details = await ImportDetails.destroy({
      where: {
        id: id,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getImportDetails = async (req, res) => {
  let {imports_import_code} = req.query;
  let where = {
    imports_import_code: imports_import_code
  }
  if(!imports_import_code) {
    delete where.imports_import_code;
  }
  try {
    let result = await ImportDetails.findAll({
      attributes: ["id", "imports_import_code", "ingredients_ingredient_code", "number", "price_unit"],
      include: [
        {
          model: Imports,
          as: "detail_import_product",
        },
        {
          model: Ingredients,
          as: "detail_import_ingredient",
        },
      ],
      where: where,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

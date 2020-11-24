const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Imports = require("../models/imports");
exports.createImport = async (req, res) => {
  // Save Product to Database
  let {
    import_code,
    total,
    users_id
  } = req.body;

  try {
    let imports = await Imports.create({
        import_code,
        total,
        users_id
    });
    if (imports) {
      res.status(200).send(imports);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getImports = async (req, res) => {
  try {
    let result = await Tables.findAll({
      attributes: ["import_code", "total"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

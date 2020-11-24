const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Bills = require("../models/bills");
exports.createBill = async (req, res) => {
  // Save Product to Database
  let {
    bill_code,
    total,
    status,
    tables_table_code,
    users_id,
  } = req.body;

  try {
    let bill = await Bills.create({
        bill_code,
        total,
        status,
        tables_table_code,
        users_id
    });
    if (bill) {
      res.status(200).send(bill);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBills = async (req, res) => {
  try {
    let result = await Bills.findAll({
      attributes: ["bill_code", "total"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

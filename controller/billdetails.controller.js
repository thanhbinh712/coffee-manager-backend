const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const BillDetails = require("../models/bill_details");
exports.createBillDetails = async (req, res) => {
  let {
    number,
    price_unit,
    bills_bill_code,
    product_details_id1,
  } = req.body;

  try {
    let bill_details = await BillDetails.create({
        number,
        price_unit,
        bills_bill_code,
        product_details_id1,
    });
    if (bill_details) {
      res.status(200).send(bill_details);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBillDetails = async (req, res) => {
  let {
    id,
    number,
    price_unit,
    bills_bill_code,
    product_details_id1,
  } = req.body;

  try {
    let bill_details = await BillDetails.update({
        number,
        price_unit,
        bills_bill_code,
        product_details_id1,
      },
      {
        where: {
          id: id,
        }
      }
      );
    if (bill_details) {
      res.status(200).send(bill_details);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteBillDetails = async (req, res) => {
  let { id } = req.body;

  try {
    let bill_details = await BillDetails.destroy({
      where: {
        id: id,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBillDetails = async (req, res) => {
  try {
    let result = await BillDetails.findAll({
      attributes: ["id"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

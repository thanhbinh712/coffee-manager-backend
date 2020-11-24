const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Promotions = require("../models/promotions");
exports.createPromotion = async (req, res) => {
  let {
    promotion_code,
    name,
    start_date,
    finish_date,
    status,
  } = req.body;

  try {
    let promotion = await Promotions.create({
        promotion_code,
        start_date,
        finish_date,
        name,
        status,
    });
    if (promotion) {
      res.status(200).send(promotion);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePromotion = async (req, res) => {
  let {
    promotion_code,
    name,
    start_date,
    finish_date,
    status,
  } = req.body;

  try {
    let promotion = await Promotions.update({
      name,
      start_date,
      finish_date,
      status,
      },
      {
        where: {
          promotion_code: promotion_code,
        }
      }
      );
    if (promotion) {
      res.status(200).send(promotion);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletePromotion = async (req, res) => {
  let { promotion_code } = req.body;

  try {
    let promotion = await Promotions.destroy({
      where: {
        promotion_code: promotion_code,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPromotions = async (req, res) => {
  try {
    let result = await Promotions.findAll({
      attributes: ["promotion_code", "name", "start_date", "finish_date", "status"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

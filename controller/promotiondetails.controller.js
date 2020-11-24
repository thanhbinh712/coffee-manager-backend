const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const PromotionDetails = require("../models/promotion_details");
exports.createPromotionDetails = async (req, res) => {
  let {
    percent,
    promotions_promotion_code,
    products_product_code,
  } = req.body;

  try {
    let promotion_details = await PromotionDetails.create({
        percent,
        promotions_promotion_code,
        products_product_code,
    });
    if (promotion_details) {
      res.status(200).send(promotion_details);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePromptionDetails = async (req, res) => {
  let {
    id,
    percent,
    promotions_promotion_code,
    products_product_code,
  } = req.body;

  try {
    let promotion_details = await PromotionDetails.update({
        number,
        percent,
        promotions_promotion_code,
        products_product_code,
      },
      {
        where: {
          id: id,
        }
      }
      );
    if (promotion_details) {
      res.status(200).send(promotion_details);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletePromotionDetails = async (req, res) => {
  let { id } = req.body;

  try {
    let promotion_details = await PromotionDetails.destroy({
      where: {
        id: id,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPromotionDetails = async (req, res) => {
  try {
    let result = await PromotionDetails.findAll({
      attributes: ["id"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Op = Sequelize.Op;
const Ingredients = require("../models/ingredients");
exports.createIngredient = async (req, res) => {
  let {
    ingredient_code,
    name,
    unit,
    quantity,
    warning_limited,
    inventory,
  } = req.body;

  try {
    let ingredient = await Ingredients.create({
        ingredient_code,
        name,
        unit,
        quantity,
        warning_limited,
        inventory,
    });
    if (ingredient) {
      res.status(200).send(ingredient);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateIngredient = async (req, res) => {
  let { 
    ingredient_code,
    name,
    unit,
    quantity,
    warning_limited,
    inventory,
   } = req.body;

  try {
    let ingredient = await Ingredients.update(
      {
        name,
        unit,
        quantity,
        warning_limited,
        inventory,
      },
      {
        where: {
            ingredient_code: ingredient_code,
        },
      }
    );
    if (ingredient) {
      res.status(200).send(ingredient);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteIngredient = async (req, res) => {
    let { ingredient_code } = req.body;
  
    try {
      let ingredient = await Ingredients.destroy({
        where: {
            ingredient_code: ingredient_code,
        },
      });
     
        res.status(200).send("success");
    
    } catch (error) {
      res.status(500).send(error);
    }
  };

exports.getIngredients = async (req, res) => {
  let { page, perPage, createdAt, name } = req.query;
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
  try{
      let result = await Ingredients.findAndCountAll({
      limit: perPage ? parseInt(perPage) : 10,
      offset: page ? parseInt(page - 1) * parseInt(perPage) : 0,
      distinct: true,
      attributes: ["ingredient_code", "name", "unit", "quantity", "warning_limited", "inventory"],
      where: where,
    });
    res.json({
        total: result.count,
        data: result.rows,
        })
      }
    catch(err) {
      res.status(500).send("Internal server " + err);
    }
};
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Recipes = require("../models/recipes");
exports.createRecipes = async (req, res) => {
  let {
    quantity,
    ingredients_ingredient_code,
    product_details_id1,
  } = req.body;

  try {
    let recipes = await Recipes.create({
        quantity,
        ingredients_ingredient_code,
        product_details_id1,
    });
    if (recipes) {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateRecipe = async (req, res) => {
  let {
    id,
    quantity,
    ingredients_ingredient_code,
    product_details_id1,
  } = req.body;

  try {
    let recipes = await Recipes.update({
        quantity,
        ingredients_ingredient_code,
        product_details_id1,
      },
      {
        where: {
          id: id,
        }
      }
      );
    if (recipes) {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteRecipes = async (req, res) => {
  let { id } = req.body;

  try {
    let recipes = await Recipes.destroy({
      where: {
        id: id,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRecipes = async (req, res) => {
  try {
    let result = await Recipes.findAll({
      attributes: ["id"],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

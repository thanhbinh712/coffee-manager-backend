const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Roles = require("../models/roles");
exports.getRoles=async (req,res)=>{
    try {
      let result=await Roles.findAll();
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  }
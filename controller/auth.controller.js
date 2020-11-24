const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Users = require("../models/users");
exports.signup = (req, res) => {
    // Save User to Database
    let {
      email,
      password,
      name,
      gender,
      phone,
      address,
      roles_role_code
    } = req.body;
    Users.create({
      email,
      name,
      gender,
      phone,
      address,
      email,
      roles_role_code,
      password: bcrypt.hashSync(password, 8),
    })
      .then((user) => {
        res.status(200).send(user)
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };
  exports.login = (req, res) => {
    let { email, password } = req.body;
    Users.findOne({
      attributes: [
        "email",
        "name",
        "password",
        "gender",
        "address",
        "phone",
        "roles_role_code",
        "createdAt",
        "updatedAt",
      ],
      where: {
        email: email,
      },
    })
      .then((user) => {
        console.log(user)
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(password, user.password);
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
  
        var token = jwt.sign({ id: user.email }, config.secret, {
          expiresIn: "30d", // 24 hours
        });
  
        res.status(200).send({
          email: user.email,
          name: user.name,
          roles_role_code: user.roles_role_code,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };
  exports.getUsers=async (req,res)=>{
    try {
      let result=await Users.findAll();
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
   
  }

  exports.createUser = async (req, res) => {
    // Save Product to Database
    let {
      email,
      password,
      name,
      gender,
      phone,
      address,
      roles_role_code
     } = req.body;
  
    try {
      let user = await Users.create({
        email,
        password,
        name,
        gender,
        phone,
        address,
        roles_role_code
      });
      if (user) {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.updateUser = async (req, res) => {
    let {  
      email,
      password,
      name,
      gender,
      phone,
      address,
      roles_role_code } = req.body;
  
    try {
      let user = await Users.update(
        {
          password,
          name,
          gender,
          phone,
          address,
          roles_role_code
        },
        {
          where: {
            email: email,
          },
        }
      );
      if (user) {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  exports.deleteUser = async (req, res) => {
    let { id } = req.body;
  
    try {
      let user = await Users.destroy({
        where: {
          id: id,
        },
      });
     
        res.status(200).send("success");
    
    } catch (error) {
      res.status(500).send(error);
    }
  };


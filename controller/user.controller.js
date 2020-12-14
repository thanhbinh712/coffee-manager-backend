const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Staffs = require("../models/users");
const Op = Sequelize.Op;
const Roles = require("../models/roles");
  exports.createStaffs = async (req, res) => {
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
      let user = await Staffs.create({
        email,
        password: bcrypt.hashSync(password, 8),
        name,
        gender,
        phone,
        address,
        roles_role_code,
        deleted: 0
      });
      if (user) {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.updateStaff = async (req, res) => {
    let {  
      id,
      email,
      password,
      name,
      gender,
      phone,
      address,
      roles_role_code } = req.body;
  
    try {
      let user = await Staffs.update(
        {
          password: bcrypt.hashSync(password, 8),
          email,
          name,
          gender,
          phone,
          address,
          roles_role_code
        },
        {
          where: {
            id: id,
          },
        }
      );
      let result=await Staffs.findOne({
        attributes:["id", "email", "name", "gender", "phone", "address", "roles_role_code"],
        where: {
          id:id
        }
      })
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };

exports.deleteStaff = async (req, res) => {
    let { roles_role_code, status_delete } = req.body;
    let result = await Staffs.update(
      { deleted: status_delete },
      {
        where: {
            roles_role_code: roles_role_code,
        },
      }
    );
    console.log(result);
    res.status(200).send({
      deleted: roles_role_code,
    });
  };

  exports.getStaffs = (req, res) => {
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
    Users.findAndCountAll({
      limit: perPage ? parseInt(perPage) : 10,
      offset: page ? parseInt(page - 1) * parseInt(perPage) : 0,
      distinct: true,
      attributes: ["id", "email", "name", "gender", "phone", "address"],
      include: [
                {
                  model: Roles,
                  as: "detail_role",
                },
              ],
      where: where,
    })
      .then((result) =>
        res.json({
          total: result.count,
          data: result.rows,
        })
      )
      .catch((err) => {
        res.status(500).send("Internal server " + err);
      });
  };
  

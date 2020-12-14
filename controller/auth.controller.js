const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Op = Sequelize.Op;
const Users = require("../models/users");
const Roles = require("../models/roles");
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
      deleted: 0,
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
        "id",
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
          id: user.id,
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
  // exports.getUsers=async (req,res)=>{
  //   try {
  //     let result=await Users.findAll({
  //       attributes: ["id", "email", "name", "gender", "phone", "address"],
  //           include: [
  //                     {
  //                       model: Roles,
  //                       as: "detail_role",
  //                     },
  //                   ],
  //     });
  //     res.status(200).send(result)
  //   } catch (error) {
  //     res.status(500).send(error)
  //   }
   
  // }

  exports.getUsers =async (req, res) => {
    let { page, perPage, createdAt, name, email, gender, address, phone } = req.query;
    let where = {
      createdAt: {
        [Op.between]: [createdAt, new Date()],
      },
      // [Op.or]: [
      //   {
          name: {
            [Op.like]: `%${name}%`
          }
      //   },
      //   {
      //     email: {
      //       [Op.like]: `%${email}%`
      //     }
      //   },
      //   {
      //     gender: {
      //       [Op.like]: `%${gender}%`
      //     }
      //   },
      //   {
      //     address: {
      //       [Op.like]: `%${address}%`
      //     }
      //   },
      //   {
      //     phone: {
      //       [Op.like]: `%${phone}%`
      //     }
      //   },
      // ]    
    };
    if (!createdAt) {
      delete where.createdAt;
    }
    if(!name)
    {
      delete where.name;
    }
    // if(!email)
    // {
    //   delete where.email;
    // }
    // if(!address)
    // {
    //   delete where.address;
    // }
    // if(!phone)
    // {
    //   delete where.phone;
    // }
    try {
      let result =await Users.findAndCountAll({
      limit: perPage ? parseInt(perPage) : 10,
      offset: page ? parseInt(page - 1) * parseInt(perPage) : 0,
      distinct: true,
      attributes: ["id", "email", "name", "gender", "phone", "address","roles_role_code"],
      include: [
                {
                  model: Roles,
                  as: "detail_role",
                },
              ],
              order: [
                ['createdAt', 'DESC']],
      where: where,
    });
    res.json({
            total: result.count,
            data: result.rows,
          })
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // exports.updateUser = async (req, res) => {
  //   let {  
  //     id,
  //     email,
  //     password,
  //     name,
  //     gender,
  //     phone,
  //     address,
  //     roles_role_code } = req.body;
  //   try {
  //     let user = await Users.update(
  //       {
  //         password,
  //         name,
  //         gender,
  //         phone,
  //         address,
  //         roles_role_code
  //       },
  //       {
  //         where: {
  //           id: id,
  //         },
  //       }
  //     );
  //     let result=await Users.findOne({
  //       attributes:["id", "email", "name", "gender", "phone", "address", "roles_role_code"],
  //       include: [
  //         {
  //           model: Roles,
  //           as: "detail_role",
  //         },
  //       ],
  //       where: {
  //         id:id
  //       }
  //     })
  //     res.status(200).send(result);
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // };

  exports.updateUser = async (req, res) => {
    let {  
      id,
      email,
      password,
      name,
      gender,
      phone,
      address,
      roles_role_code
     } = req.body;

      if (password) {
        await Users.update(
          {
            email,
            password,
            name,
            gender,
            phone,
            address,
            roles_role_code,
            password: bcrypt.hashSync(password, 8),
          },
          {
            where: {
              id: id,
            },
          }
        );
      } else {
        await Users.update(
          {
            email,
            name,
            gender,
            phone,
            address,
            roles_role_code,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      let result = await Users.findOne({
        include: [
          {
            model: Roles,
            as: "detail_role",
          },
        ],
        where: {
          id: id,
        },
      });
      res.status(200).send(result);
    };
    
  
  exports.deleteUser = async (req, res) => {
    let { id, roles_role_code, status_delete } = req.body;
    try {
      let result = await Users.update(
        { deleted: status_delete },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(result);
      res.status(200).send({
        deleted: roles_role_code,
      });   
    } catch (error) {
      res.status(500).send(error);
    }
  };


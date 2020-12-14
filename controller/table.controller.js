const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var moment = require("moment");
const Op = Sequelize.Op;
exports.createTable = async (req, res) => {
  // Save Product to Database
  let {
    table_code,
    name,
    seat_number,
    areas_area_code,
  } = req.body;

  try {
    let table = await Tables.create({
        table_code,
        name,
        seat_number,
        status: 0,
        areas_area_code,
    });
    if (table) {
      res.status(200).send(table);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTable = async (req, res) => {
  // Save Product to Database
  let {
    table_code,
    name,
    seat_number,
    status,
    areas_area_code,
  } = req.body;

  try {
    let table = await Tables.update({
      name,
      seat_number,
      status,
      areas_area_code,
      },
      {
        where: {
          table_code: table_code,
        }
      }
      );
    if (table) {
      res.status(200).send(table);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteTable = async (req, res) => {
  let { table_code } = req.body;

  try {
    let table = await Tables.destroy({
      where: {
        table_code: table_code,
      },
    });
   
      res.status(200).send("success");
  
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTables = (req, res) => {
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
  Tables.findAndCountAll({
    limit: perPage ? parseInt(perPage) : 10,
    offset: page ? parseInt(page - 1) * parseInt(perPage) : 0,
    distinct: true,
    attributes: ["table_code", "name","seat_number","status"],
    include: [
              {
                model: Areas,
                as: "detail_area",
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

exports.getTablesAreas = async (req, res) => {
  let { areas_area_code } = req.query;
  try {
    let where={
      areas_area_code: areas_area_code,
   }
   if(!areas_area_code){delete where.areas_area_code}
    let result = await Tables.findAll({
      attributes: ["table_code", "name","seat_number","status","areas_area_code"],
      include: [
        {
          model: Areas,
          as: "detail_area",
        },
      ],
      where: where
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};


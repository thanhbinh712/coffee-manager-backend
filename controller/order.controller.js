const { query } = require("express");
const Orders = require("../models/orders");

exports.createOrder = async (req, res) => {
  // Save Product to Database
  let {
    tables_table_code,
    listProducts
  } = req.body;

  try {
    let temp=[];
    for(let i=0; i<listProducts.length; i++) {
      temp.push({
        tables_table_code:tables_table_code,
        products_product_code:listProducts[i].products_product_code,
        number:parseInt(listProducts[i].number),
        paid: -1,
      })
    }
    console.log("abc",temp)
     let result=await Orders.bulkCreate([...temp])
    // if (imports) {
      res.status(200).send(result);
    // }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOrder = async (req, res) => {
  let {tables_table_code} = req.query;
  let where = {
    tables_table_code: tables_table_code,
  };
  if(!tables_table_code){
    delete where.tables_table_code
  }
  try {
    let result = await Orders.findAll({
      attributes: ["order_id", "number", "tables_table_code", "products_product_code", "createdAt"],
      include: [
        {
          model: Tables,
          as: "detail_table_order",
        },
        {
          model: Products,
          as: "detail_product_order",
        },
      ],
      order: [
        ['createdAt', 'DESC']],
      where: where,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOrderProductFromTable = async(req, res) => {
  let {products_product_code} = req.query;
  try{
    let table = await Tables.findOne({
      attributes: ["tables_table_code"],
      where: {
        code: products_product_code,
      }
    });
    let result = await sequelize.query(
      `SELECT MAX(products_product_code) as max FROM orders where tables_table_code='${table.table_code}' and status=1 GROUP BY tables_table_code`,
        {type: QueryTypes.SELECT}
      );
     let maxId = result[0].max;
     res.status(200).send({max_id: maxId}); 
  } catch(err){
    res.status(500).send(err);
  }
};
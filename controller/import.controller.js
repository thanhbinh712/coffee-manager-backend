
exports.createImport = async (req, res) => {
  // Save Product to Database
  let {
    import_code,
    total,
    users_id,
    listIngredients
  } = req.body;

  try {
    let imports = await Imports.create({
        import_code,
        total,
        users_id
    });
    let temp=[];
    for(let i=0; i<listIngredients.length; i++) {
      temp.push({
        imports_import_code:imports.import_code,
        ingredients_ingredient_code:listIngredients[i].ingredients_ingredient_code,
        price_unit:parseInt(listIngredients[i].price_unit),
        number:parseInt(listIngredients[i].number)
      })
    }
    console.log(temp)
     let result=await Import_Details.bulkCreate([...temp])
    // if (imports) {
      res.status(200).send(result);
    // }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getImports = async (req, res) => {
  try {
    let result = await Imports.findAll({
      attributes: ["import_code", "total","users_id"],
      include: [
        {
          model: Users,
          as: "detail_user_import",
        },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

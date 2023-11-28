const { getProductsName } = require ("../handlers/getProductsNameHandler")

const getByName = async (req, res) => {
  try {
    const searchTerm = req.query.name;

    const products = await getProductsName(searchTerm)

    return res.status(200).json(products);
  } catch (error) {
  
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getByName,
};

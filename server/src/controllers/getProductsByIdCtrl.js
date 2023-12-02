const {
  getProductsByIdHandler,
} = require("../handlers/getProductsByIdHandler");

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await getProductsByIdHandler(id);
    if(!productId) return res.status(400).send('Product not found')
    return res.status(200).json(productId);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { getProductsById };

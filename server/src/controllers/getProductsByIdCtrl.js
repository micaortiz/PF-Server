const {
  getProductsByIdHandler,
} = require("../handlers/getProductsByIdHandler");

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await getProductsByIdHandler(id);
    return res.status(200).json(productId);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { getProductsById };

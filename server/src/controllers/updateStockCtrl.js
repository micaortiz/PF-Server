const { updateStockHandler } = require("../handlers/updateStockHandler");

const updateStock = async (req, res) => {
  const { id, newStock } = req.body;
  try {
    const product = await updateStockHandler(id, newStock);

    if (!product) return res.status(404).send("Product not found");

    if (newStock < 0) {
      return res.status(400).send("New stock cannot be negative");
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  updateStock,
};

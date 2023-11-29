const { updateCarHandler } = require("../handlers/updateCarShoppingHandler");

const getUpdateCarShopping = async (req, res) => {
  const { id, quantityProd, userId } = req.body;
  try {
    const carShopping = await updateCarHandler(id, quantityProd, userId);
    if (!carShopping) return res.status(400).send("Not Found");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getUpdateCarShopping,
};

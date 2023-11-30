const {
  updateCartHandler,
} = require("../../handlers/updateCartShoppingHandler");

const updateCart = async (req, res) => {
  const { UserId, productId, quantityProd, totalPrice } = req.body;
  const quantityProU = quantityProd;
  try {
    const cartShopping = await updateCartHandler(
      productId,
      quantityProU,
      UserId,
      totalPrice,
    );
    if (!cartShopping) return res.status(400).send("Not Found");
    return res.status(200).json(cartShopping)
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  updateCart,
};

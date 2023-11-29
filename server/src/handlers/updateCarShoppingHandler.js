const { Cart } = require("../db");

const updateCarHandler = async (id, quantityProd, userId) => {
  const carShopping = await Cart.findOne({
    where: { userId: userId },
  });

  console.log("Este sería el carShopping ", carShopping);
  if (!carShopping) return "No shopping cart associated with the User";

  if (id !== undefined) carShopping.id = id;
  if (quantityProd !== undefined) carShopping.quantityProd = quantityProd;
  if (userId !== undefined) carShopping.userId = userId;

  await carShopping.save();
  return carShopping
};

module.exports = {
  updateCarHandler,
};

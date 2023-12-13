const { Cart } = require("../../db");

const deleteCart = async (UserId) => {

    console.log("Id del ususario para hacer el delete ", UserId);

  const deleteCart = await Cart.findOne({
    where: { UserId: UserId },
  });

  console.log(
    "Eliminado del carrito de compras del usuario con id de ",
    UserId,
    " El carro de compras es ",
    deleteCart
  );

  if (deleteCart) {
    await deleteCart.destroy();
  }

  return { message: "Empty shopping cart" };
};

module.exports = { deleteCart };

const { Cart, Product, Category, User } = require("../../db");

const deleteProductsCart = async (req, res) => {
  try {
    const { nameProd, UserId } = req.body;

    const user = await User.findByPk(UserId, {
      include: [
        {
          model: Cart,
          include: [
            {
              model: Product,
              through: { attributes: ["quantityProd"] },
              attributes: [
                "id",
                "nameProd",
                "image",
                "description",
                "price",
                "priceOnSale",
                "stock",
                "active",
              ],
              include: {
                model: Category,
                attributes: ["nameCat"],
              },
            },
          ],
        },
      ],
    });

    if (!user) return res.status(404).send("User not found");

    const cart = user.Cart;

    if (!cart) return res.status(404).send("Cart not found");

    // Buscar el producto por id o por name, ver cual es mas conveniente

    // const productInCart = cart.Products.find((product) => product.id === productId);
    const productInCart = cart.Products.find(
      (product) => product.nameProd === nameProd
    );

    if (!productInCart) return res.status(404).send("Products not found");

    // Obtener el precio del producto antes de eliminarlo
    const productPriceBeforeRemoval =
      productInCart.priceOnSale !== null
        ? productInCart.priceOnSale
        : productInCart.price;

    // Recalcular el precio total del carrito antes de eliminar el producto
    const totalPriceBeforeRemoval =
      cart.totalPrice -
      productPriceBeforeRemoval * productInCart.Product_Carts.quantityProd;

    await cart.removeProduct(productInCart);

    cart.totalPrice = totalPriceBeforeRemoval;

    await cart.save();

    return res.status(200).json("Product removed from the cart successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteProductsCart,
};

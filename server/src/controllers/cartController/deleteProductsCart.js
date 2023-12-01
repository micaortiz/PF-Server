const { Cart, Product, Category } = require("../../db");

const deleteProductsCart = async (req, res) => {
  try {
    const { nameProd, cartId } = req.body;

    const cart = await Cart.findByPk(cartId, {
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
          ],
          include: {
            model: Category,
            attributes: ["nameCat"],
          },
        },
      ],
    });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    

    // Buscar el producto por id o por name, ver cual es mas conveniente

    // const productInCart = cart.Products.find((product) => product.id === productId);
    const productInCart = cart.Products.find(
      (product) => product.nameProd === nameProd
    );

    if (!productInCart) return res.status(404).json({ error: "Products not found" });
    
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

    return res.status(200).json({
      message: "Product removed from the cart successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteProductsCart,
};

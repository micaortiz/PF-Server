const { Cart, Product, Category } = require("../../db");
const getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
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
            "active",
          ],
          include: {
            model: Category,
            attributes: ["nameCat"],
          },
        },
      ],
    });

    if (!cart) return res.status(404).send("Cart not found");

    // Calcular el precio total teniendo en cuenta price y priceOnSale en caso de que lo tenga
    let totalPrice = 0;
    cart.Products.forEach((product) => {
      const productPrice =
        product.priceOnSale !== null ? product.priceOnSale : product.price;
      totalPrice += productPrice * product.Product_Carts.quantityProd;
    });

    cart.totalPrice = totalPrice;

    const cartDetails = {
      id: cart.id,
      UserId: cart.UserId,
      items: cart.Products.map((product) => ({
        nameProd: product.nameProd,
        image: product.image[0],
        description: product.description,
        price: product.price,
        priceOnSale: product.priceOnSale,
        stock: product.stock,
        active: product.active,
        quantityProd: product.Product_Carts.quantityProd,
        category: product.Category.nameCat,
      })),
      totalPrice: cart.totalPrice,
    };

    return res.status(200).json(cartDetails);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getCartById,
};

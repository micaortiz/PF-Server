const { Cart, Product, Category, Product_Carts } = require("../../db");

const updateCartHandler = async (productId, quantityProU, UserId) => {
  try {
    console.log("Cantidad de producto a actualizar ", quantityProU);
    const cartShopping = await Cart.findOne({
      where: { UserId: UserId },
      include: {
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
    });

    if (!cartShopping) {
      return { error: "No shopping cart associated with the User" };
    }

    console.log("Esto esta en la base de datos", cartShopping.totalPrice);

    if (!cartShopping.Products || cartShopping.Products.length === 0) {
      return { error: "No products found in the cart" };
    }

    const productUpdateCart = cartShopping.Products.find(
      (product) => product.id === productId
    );

    if (!productUpdateCart) {
      return { error: "Product not found in the cart" };
    }

    if (quantityProU > productUpdateCart.stock) {
      return { error: "Not enough units" };
    }

    //* Actualizar la cantidad en la tabla intermedia (Product_Carts)
    const oldQuantity = productUpdateCart.Product_Carts.quantityProd;
    productUpdateCart.Product_Carts.quantityProd = quantityProU;

    await Product_Carts.update(
      { quantityProd: quantityProU },
      {
        where: {
          CartId: cartShopping.id,
          ProductId: productId,
        },
      }
    );

    const priceProduct =
      productUpdateCart.priceOnSale !== null
        ? productUpdateCart.priceOnSale
        : productUpdateCart.price;
    const oldProductTotalPrice = priceProduct * oldQuantity;
    const newProductTotalPrice = priceProduct * quantityProU;

    //* Actualizar el precio total del carrito
    cartShopping.totalPrice =
      cartShopping.totalPrice - oldProductTotalPrice + newProductTotalPrice;
    console.log("Antiguo valor ", oldProductTotalPrice);
    console.log("Nuevo valor ", newProductTotalPrice);
    console.log("Seria la cantidad antigua ", oldQuantity);
    console.log("Seria la cantidad nueva ", quantityProU);

    console.log(
      "El total de la actualización de los elementos en el carrito ",
      cartShopping.totalPrice
    );
    //* Guardar los cambios en la base de datos
    await cartShopping.save();

    console.log("Precio del producto", cartShopping.totalPrice);
    const itemsCart = {
      UserId: cartShopping.UserId,
      items: cartShopping.Products.map((product) => ({
        nameProd: product.nameProd,
        image: product.image && product.image[0], // Verificar si existe 'image'
        description: product.description,
        price: product.price,
        priceOnSale: product.priceOnSale,
        stock: product.stock,
        quantityProd: product.Product_Carts.quantityProd || 0, // Verificar si existe 'quantityProd'
        category: product.Category.nameCat,
      })),
      totalPrice: cartShopping.totalPrice,
    };

    return itemsCart;
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    return { error: "Error updating the shopping cart" };
  }
};

module.exports = {
  updateCartHandler,
};

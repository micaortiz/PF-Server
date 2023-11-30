const { Cart, Product, Category } = require("../db");

const updateCartHandler = async (
  productId,
  quantityProU,
  UserId,
  totalPrice
) => {
  console.log("Cantidad de producto a actualizar ", quantityProU);
  const cartShopping = await Cart.findOne({
    //* Busco el carrito de compra con el id del usuario, traigo las tablas a las cuales esta asociada el carrito de compras
    where: { UserId: UserId },
    include: {
      model: Product,
      through: { attributes: ["quantityProd"] },
      attributes: ["id", "priceOnSale", "price", "stock"],
      include: {
        model: Category,
        attributes: ["nameCat"],
      },
    },
  });

  if (!cartShopping)
    return { error: "No shopping cart associated with the User" };

  /*   console.log("Serian los productos en el carrito ", productsInCart); */

  const productUpdateCart = cartShopping.Products.find(
    (product) => product.id === productId
    //Busco el producto por su id
  );

  if (!productUpdateCart) {
    return { error: "Product not found in the cart" };
  }

  if (quantityProU > productUpdateCart.stock) {
    return { error: "Not enough units" };
  }
  productUpdateCart.Product_Carts.quantityProd = quantityProU;
  console.log("Actaulizada la cantidad ", cartShopping.quantityProd);

  const productsInCart = cartShopping.Products.map((product) => ({
    //* Mapeo y me quedo con los atributos necesarios para actualizar el carro de compras
    id: product.id,
    priceOnSale: product.priceOnSale,
    stock: product.stock,
    Category: {
      nameCat: product.Category.nameCat,
    },
    Product_Carts: {
      quantityProd: product.Product_Carts.quantityProd,
    },
  }));

  if (cartShopping.priceOnSale !== null) {
    totalPrice =
      productUpdateCart.Product_Carts.quantityProd * cartShopping.price;
  } else {
    totalPrice =
      productUpdateCart.Product_Carts.quantityProd * cartShopping.priceOnSale;
  }
  cartShopping.save();
  console.log("seria el total del producto ", totalPrice);

  console.log("Seria el carrito actualizado", productsInCart);

  /* if (quantityProU !== undefined)
    cartShopping.quantityProd = productUpdateCart.Product_Carts.quantityProd;
  console.log("Carrito actualizado ", cartShopping);
  if (UserId !== undefined) cartShopping.userId = UserId; */

  // await cartShopping.save();
  return cartShopping;
};

module.exports = {
  updateCartHandler,
};

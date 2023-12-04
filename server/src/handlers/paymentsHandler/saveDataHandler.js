const {
  Product,
  Category,
  Orders,
  Product_Order,
  Product_Carts,
  Cart,
} = require("../../db");

const savePurchaseDataHandler = async (
  status,
  payment,
  merchantOrder,
  UserId
) => {
  const saveData = {
    orderDate: new Date(),
    mercadopagoTransactionId: payment,
    mercadopagoTransactionStatus: status,
    UserId: UserId,
  };

  const cartShopping = await Cart.findOne({
    where: { UserId: UserId },
    include: [
      {
        model: Product,
        attributes: ["id", "nameProd", "stock"],
      },
      {
        model: Product_Carts,
        attributes: ["quantityProd"],
      },
    ],
  });

  console.log(
    "Me traeria los productos en el carrito de compra ",
    cartShopping.Products
  );

  if (!cartShopping || !cartShopping.Products) {
    console.error("Carrito de compras vacio");
    return { error: "The shopping cart is empty or does not exist." };
  }

  const productsInCart = cartShopping.Products.map((product) => {
    const productCart = product.Product_Carts[0];
    return {
      id: product.id,
      nameProd: product.nameProd,
      stock: product.stock,
      quantityProd: productCart ? productCart.quantityProd : 0,
    };
  });

  /*  const productCartsData = product.Product_Carts.map((productCart) => {
    return {
      cartId: productCart.CartId,
      quantityProd: productCart.quantityProd,
    };
  }); */

  console.log("Productos en el carrito de compras ", productsInCart);

  const savedOrders = await Orders.bulkCreate(dataItemsInter);

  const productOrderData = dataItems.map((order) => ({
    ProductId: order.ProductId,
    OrderId: order.id,
  }));

  await Product_Order.bulkCreate(productOrderData);
  console.log("Data saved successfully");
  return savedOrders;
};

module.exports = {
  savePurchaseDataHandler,
};

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
  mercadopagoTransactionId,
  mercadopagoTransactionStatus,
  UserId
) => {
  const saveData = {
    orderDate: new Date(),
    status: status,
    mercadopagoTransactionId: mercadopagoTransactionId,
    mercadopagoTransactionStatus: mercadopagoTransactionStatus,
    UserId: UserId,
  };

  const cartShopping = await Cart.findOne({
    where: { UserId: UserId },
    include: {
      model: Product_Carts,
      attributes: ["quantityProd", "ProductId", "CartId"],
    },
  });

  const productsFine = await Product.findOne({
    where: { id: cartShopping.Product_Carts.ProductId },
    attributes: ["id", "nameProd", "stock"],
  });

  console.log("Me traeria los productos segun el id ", productsFine);

  const dataItemsInter = items.map((item) => ({
    ProductId: item.ProductId,
    OrderId: item.ProductId,
  }));

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

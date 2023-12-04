const {
  Product,
  Order,
  Product_Order,
  Product_Carts,
  Cart,
} = require("../../db");

const { v4: uuidv4 } = require("uuid");

const savePurchaseDataHandler = async (status, payment_id, id) => {
  const paymentUUID = uuidv4({ namespace: payment_id }); //* Convierte el id del payment en un id tipo UUIDV4 para que lo pueda almacenar la base de datos
  const saveData = {
    orderDate: new Date(),
    mercadopagoTransactionId: paymentUUID,
    mercadopagoTransactionStatus:
      status.charAt(0).toUpperCase() + status.slice(1),
    UserId: id,
  };

  const cartShopping = await Cart.findOne({
    where: { UserId: id },
    include: [
      {
        model: Product,
        attributes: ["id", "nameProd", "stock"],
      },
    ],
  });

  if (!cartShopping || !cartShopping.Products) {
    console.error("Carrito de compras vacio");
    return { error: "The shopping cart is empty or does not exist." };
  }

  //* Busca en la tabla intermedia y trae los datos segun el id del Carro de compras
  const quantityProdIn = await Product_Carts.findAll({
    where: { CartId: cartShopping.id },
  });
  //* Me quedo con los datos necesarios de la tabla Intermedia para las cantidades
  const cartQuantityProd = quantityProdIn.map((productCart) => ({
    quantity: productCart.quantityProd,
    ProductId: productCart.ProductId,
  }));

  //* Nos quedamos con los datos necesarios del carrito de compras
  const productsInCart = cartShopping.Products.map((product) => {
    return {
      id: product.id,
      nameProd: product.nameProd,
      stock: product.stock,
    };
  });
  console.log("Productos en el carrito de compras ", productsInCart);

  // Lógica para restar el stock de cada producto
  for (const productInfo of cartQuantityProd) {
    const quantity = productInfo.quantity;
    const productId = productInfo.ProductId;
    console.log("Cantidad ", quantity);
    console.log("Ide del producto ", productId);

    // Buscar el producto por ID en la tabla Product
    const product = productsInCart.find((product) => product.id === productId);

    if (product) {
      // Restar la cantidad en stock
      const updatedStock = product.stock - quantity;

      // Actualizar el stock del producto en la base de datos
      await Product.update(
        { stock: updatedStock },
        { where: { id: productId } }
      );

      console.log(
        `Stock actualizado para el producto con ID ${productId}. Nuevo stock: ${updatedStock}`
      );
    } else {
      console.error(`No se encontró el producto con ID ${productId}.`);
    }
    console.log("Id de la Orden ", saveData.mercadopagoTransactionId);
    const valProduct_Order = {
      ProductId: productId,
      OrderId: saveData.mercadopagoTransactionId,
    };
    console.log("Productos que serían guardados en la BD en la tabla Product_Order ", valProduct_Order);

    const newProductOrder = Product_Order.build(valProduct_Order);
    await newProductOrder.save();
  }
  console.log("Product Order actualizada ", Product_Order);

  const newOrder = Order.build(saveData);
  await newOrder.save();
  return newOrder;
};

module.exports = {
  savePurchaseDataHandler,
};

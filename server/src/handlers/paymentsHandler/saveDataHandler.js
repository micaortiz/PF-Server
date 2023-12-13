const {
  Product,
  Category,
  Order,
  Product_Carts,
  Product_Order,
  Cart,
  User,
  Review,
} = require("../../db");
const {
  deleteCart,
} = require("../../controllers/cartController/deleteAllProductsCart");

const savePurchaseDataHandler = async (status, payment_id, id) => {
  const cartShopping = await Cart.findOne({
    //* Trae la informacion del carro de compras
    where: { UserId: id },
    include: [
      {
        model: Product,
        attributes: [
          "id",
          "nameProd",
          "stock",
          "price",
          "priceOnSale",
          "image",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "nameCat"],
          },
        ],
      },
    ],
  });

  const userData = await User.findOne({
    //* Trae la informacion del Usuario
    where: { id: id },
  });

  const reviews = await Review.findAll({
    where: {
      UserId: userData.id,
    },
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

  const reviewsData = reviews.map((review) => {
    return {
      rating: review.rating,
      comment: review.reviewText,
      idUser: review.UserId,
      productId: review.productId,
    };
  });
  console.log("DATO MAPEADOS DE LAS REVIEWS ", reviewsData);

  //* Nos quedamos con los productos del carrito de compras
  const productsInCart = cartShopping.Products.map((product) => {
    const quantityInfo = cartQuantityProd.find(
      (productCart) => productCart.ProductId === product.id
    );

    const matchingReviews = reviewsData.filter(
      (review) => review.productId === product.id
    );

    let productWithReviews;

    if (matchingReviews.length > 0) {
      console.log("Hay una review para este producto:", matchingReviews);
      productWithReviews = {
        id: product.id,
        nameProd: product.nameProd,
        price: product.price,
        priceOnSale: product.priceOnSale,
        stock: product.stock,
        quantityProd: quantityInfo ? quantityInfo.quantity : 0,
        category: product.Category.nameCat,
        image: product.image,
        reviews: matchingReviews,
      };
    } else {
      console.log("No hay una review para este producto");
      productWithReviews = {
        id: product.id,
        nameProd: product.nameProd,
        price: product.price,
        priceOnSale: product.priceOnSale,
        stock: product.stock,
        quantityProd: quantityInfo ? quantityInfo.quantity : 0,
        category: product.Category.nameCat,
        image: product.image,
        reviews: [],
      };
    }

    return productWithReviews;
  });

  const saveData = {
    //* Creo el objeto para despues crear la orden con la informacion almacenada en este objeto
    orderDate: new Date(),
    mercadopagoTransactionId: payment_id,
    mercadopagoTransactionStatus:
      status.charAt(0).toUpperCase() + status.slice(1),
    UserId: id,
    userName: userData.name,
    totalPrice: cartShopping.totalPrice,
    itemsCart: JSON.stringify(productsInCart),
  };

  console.log("DATOS GUARDAROS ", saveData);

  const newOrder = await Order.create(saveData); //* CREO LA ORDEN

  // Lógica para restar el stock de cada producto
  for (const productInfo of cartQuantityProd) {
    const quantity = productInfo.quantity;
    const productId = productInfo.ProductId;

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
    } else {
      throw new Error(`Product ID not found ${productId}.`);
    }

    await newOrder.addProduct(productId, { model: Product_Order });
  }

  await Order.update(
    { itemsCart: JSON.stringify(productsInCart) },
    { where: { id: newOrder.id } }
  );

  //* Llamado de la funcion para eliminar el carrito de compras
  await deleteCart(saveData.UserId);
  return newOrder;
};

module.exports = {
  savePurchaseDataHandler,
};

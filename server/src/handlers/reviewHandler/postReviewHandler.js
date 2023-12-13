const { User, Review, Order } = require("../../db");

const postReviewHandler = async (UserId, reviewText, rating, productId) => {
  const userFound = await User.findByPk(UserId, {
    attributes: ["id", "token", "email", "name"],
  });

  if (!userFound) {
    throw Error("User not found");
  }

  const ordersFound = await Order.findAll({
    where: {
      UserId: UserId,
    },
  });

  if (!ordersFound || ordersFound.length === 0) {
    throw Error("Order not found");
  }
  for (const orderFound of ordersFound) {
    const itemsCartArray = JSON.parse(orderFound.itemsCart);

    // Encontrar el producto en el carrito
    const productInOrder = itemsCartArray.find((item) => item.id === productId);
    console.log("Producto encontrado ", productInOrder);
    if (productInOrder) {
      // Verificar si el producto ya tiene una revisión
      if (!productInOrder.reviews || productInOrder.reviews.length === 0) {
        // Crear la revisión
        const review = await Review.create({
          UserId: userFound.id,
          reviewText: reviewText || "",
          rating: rating,
          productId: productId,
          userName: userFound.name,
        });

        const simplifiedReview = {
          rating: review.rating,
          comment: review.reviewText,
          idUser: review.UserId,
        };

        // Asociar la revisión con el usuario
        await userFound.addReview(review);

        // Agregar la revisión al producto en el carrito
        productInOrder.reviews = [simplifiedReview];

        // Volver a serializar la estructura de datos a JSON
        orderFound.itemsCart = JSON.stringify(itemsCartArray);

        // Guardar los cambios en la base de datos
        await orderFound.save();

        return review;
      } else {
        throw new Error("Product already has a review");
      }
    }
  }
};

module.exports = {
  postReviewHandler,
};

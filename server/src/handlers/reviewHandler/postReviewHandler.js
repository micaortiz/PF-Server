const { User, Review, Order } = require("../../db");

const postReviewHandler = async (UserId, reviewText, rating, productId) => {
  const userFound = await User.findByPk(UserId, {
    attributes: ["id", "token", "email", "name"],
  });

  if (!userFound) {
    throw Error("User not found");
  }

  const orderFound = await Order.findOne({
    where: {
      UserId: UserId,
    },
  });

  if (!orderFound) {
    throw Error("Order not found");
  }

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

  await userFound.addReview(review);

  const itemsCartArray = JSON.parse(orderFound.itemsCart);

  // Buscar el producto específico en el carrito
  const productToUpdate = itemsCartArray.find(
    (product) => product.id === productId
  );

  if (!productToUpdate) {
    throw Error("Product not found in the cart");
  }

  // Actualizar la revisión del producto
  productToUpdate.reviews.push(simplifiedReview);

  // Volver a serializar la estructura de datos a JSON
  orderFound.itemsCart = JSON.stringify(itemsCartArray);

  // Guardar los cambios en la base de datos
  await orderFound.save();

  return review;
};

module.exports = {
  postReviewHandler,
};

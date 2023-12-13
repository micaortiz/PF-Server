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
  let reviewAdded = false;
  let review;

  for (const orderFound of ordersFound) {
    const itemsCartArray = JSON.parse(orderFound.itemsCart);

    for (const item of itemsCartArray) {
      if (item.id === productId) {
        const productInOrder = item;

        console.log("Producto encontrado ", productInOrder);

        if (!productInOrder.reviews || productInOrder.reviews.length === 0) {
          review = await Review.create({
            UserId: userFound.id,
            reviewText: reviewText || "",
            rating: rating,
            productId: productId,
            userName: userFound.name,
          });
          console.log("Encontré un producto con el id de: ", productInOrder.id );
          console.log("El id a buscar es : ", productId );

          const simplifiedReview = {
            rating: review.rating,
            comment: review.reviewText,
            idUser: review.UserId,
          };

          await userFound.addReview(review);
          productInOrder.reviews = [simplifiedReview];
          console.log("ITEMS DEL CARRITO ", itemsCartArray);

          orderFound.itemsCart = JSON.stringify(itemsCartArray);
          await orderFound.save();

          reviewAdded = true;
          break; // Salir del bucle interno después de agregar la revisión
        } 
        else {
          throw new Error("Product already has a review");
        }
      }
    }

    if (reviewAdded) {
      break;
    }
  }

  return review;
};

module.exports = {
  postReviewHandler,
};

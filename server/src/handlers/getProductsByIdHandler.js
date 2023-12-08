const { Product, Category, Review } = require("../db");

const getProductsByIdHandler = async (id) => {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["nameCat"],
    },
  });

  const reviews = await Review.findAll({
    where: { productId: product.id },
  });

  console.log("Las reviews de los productos ", reviews);

  let productId;
  if (product) {
    productId = {
      id: product.id,
      nameProd: product.nameProd,
      brand: product.brand,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      priceOnSale: product.priceOnSale,
      image: product.image,
      active: product.active,
      tags: product.tags,
      stock: product.stock,
      category: product.Category ? product.Category.nameCat : null,
      reviews: reviews.map((review) => ({
        rating: review.rating,
        comment: review.reviewText,
      })),
    };
  }

  return productId;
};

module.exports = {
  getProductsByIdHandler,
};

const { Product, Category, Review } = require("../db");

const getProductsByIdHandler = async (id) => {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["nameCat", 'id'],
    },
  });

  const reviews = await Review.findAll({
    where: { productId: product.id },
  });

  console.log("Las reviews de los productos ", reviews.userName);

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
      categoryId: product.Category ? product.Category.id : null,
      reviews: reviews.map((review) => ({
        rating: review.rating,
        comment: review.reviewText,
        name: review.userName
      })),
    };
  }

  return productId;
};

module.exports = {
  getProductsByIdHandler,
};

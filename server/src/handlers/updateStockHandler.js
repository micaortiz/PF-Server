const { Product, Category, Review } = require("../db");

const updateStockHandler = async (id, newStock) => {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["id","nameCat"],
    },
  });
  const reviews = await Review.findAll({
    where: { productId: product.id },
  });

  if (newStock < 0) {
    return "New stock cannot be negative";
  }

  // actualizar el stock del producto
  product.stock = newStock;
  await product.save();

  let productId;
  if (product) {
    productId = {
      id: product.id,
      nameProd: product.nameProd,
      brand: product.brand,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discountPercentage: product.discountPercentage,
      priceOnSale: product.priceOnSale,
      image: product.image,
      active: product.active,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
      category: product.Category ? product.Category.nameCat : null,
      reviews: reviews.map((review) => ({
        rating: review.rating,
        comment: review.reviewText,
        name: review.userName,
      })),
    };
  }

  return productId;
};
module.exports = {
  updateStockHandler,
};

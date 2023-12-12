const { Product, Category, Review  } = require("../db");

const updateStock = async (req, res) => {
  const { id, newStock } = req.body;
  try {
    const product = await Product.findByPk(id,{
        include: {
            model: Category,
            attributes: ["nameCat"]
        },
    });
    const reviews = await Review.findAll({
        where: { productId: product.id },
      });
    
    if (!product) return res.status(404).send("Product not found");

    if (newStock < 0) {
      return res.status(400).send("New stock cannot be negative");
    }
    // Actualiza el stock del producto
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
          name: review.userName
        })),
      };
    }
    return res.status(200).json(productId);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  updateStock,
};
const { Product } = require("../db");

const updateHandler = async (
  id,
  nameProd,
  brand,
  description,
  price,
  discountPercentage,
  image,
  tags,
  stock,
  active,
  CategoryId
) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }

  let priceOnSale = 0;
  if (discountPercentage === 0) {
    priceOnSale = price;
  } else if (discountPercentage > 0 && discountPercentage <= 100) {
    priceOnSale = (price - price * (discountPercentage / 100)).toString();
  }
  /*  else {
    throw new Error("discount value must be between 0 and 100");
  } */
  if (discountPercentage !== undefined) {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error("discount value must be between 0 and 100");
    }
  }

  if (nameProd !== undefined) product.nameProd = nameProd;
  if (brand !== undefined) product.brand = brand;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (discountPercentage !== undefined)
    product.discountPercentage = discountPercentage;
  if (image !== undefined) product.image = image;
  if (tags !== undefined) product.tags = tags;
  if (stock !== undefined) product.stock = stock;
  if (priceOnSale !== undefined) product.priceOnSale = priceOnSale;
  if (active !== undefined) product.active = active;
  if (CategoryId !== undefined) product.CategoryId = CategoryId;

  await product.save();
  return product;
};

module.exports = {
  updateHandler,
};

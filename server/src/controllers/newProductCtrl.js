const { createProduct } = require("../handlers/newProductHandler");

const newProduct = async (req, res) => {
  const {
    nameProd,
    brand,
    description,
    price,
    discountPercentage,
    image,
    tags,
    stock,
    CategoryId,
  } = req.body;
  try {
    const product = await createProduct(
      nameProd,
      brand,
      description,
      price,
      discountPercentage,
      image,
      tags,
      stock,
      CategoryId
    );
    console.log({ text: "Product succesfully created" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  newProduct,
};

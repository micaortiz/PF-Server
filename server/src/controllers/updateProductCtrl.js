const { updateHandler } = require("../handlers/updateProductHandler");

const updateProduct = async (req, res) => {
  const {
    id,
    nameProd,
    brand,
    description,
    price,
    discountPercentage,
    image,
    tags,
    stock,
  } = req.body;
  console.log(
    id,
    nameProd,
    brand,
    description,
    price,
    discountPercentage,
    image,
    tags,
    stock
  );
  try {
    const update = await updateHandler(
      id,
      nameProd,
      brand,
      description,
      price,
      discountPercentage,
      image,
      tags,
      stock
    );

    console.log("Succesfully Updated");
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  updateProduct,
};

const { updateHandler } = require("../handlers/updateProductHandler");

const updateProduct = async (req, res) => { //*
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
    active,
    CategoryId,
  } = req.body;


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
      stock,
      active,
      CategoryId
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

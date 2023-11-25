const { deleteHandler } = require("../handlers/deleteProductHandler");

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const deleter = await deleteHandler(id);
    res.status(200).json(deleter);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  deleteProduct,
};

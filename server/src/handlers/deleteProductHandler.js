const { Product } = require("../db");

const deleteHandler = async (id) => {
  const deleted = await Product.destroy({
    where: {
      id: id,
    },
  });

  if (deleted) {
    return { success: true, data: deleted };
  } else {
    return { success: false, error: "No se logro eliminar" };
  }
};

module.exports = {
  deleteHandler,
};

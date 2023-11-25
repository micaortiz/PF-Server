const { Product } = require("../db");

const deleteHandler = async (id) => {
  const deleted = await Product.destroy({
    where: {
      id: id,
    },
  });

  if (deleted) {
    return "Eliminado con éxito";
  } else {
    return "No se pudo eliminar";
  }
};

module.exports = {
  deleteHandler,
};

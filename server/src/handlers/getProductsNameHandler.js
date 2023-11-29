const { Product, Category } = require("../db");
const { Op } = require("sequelize");

const getProductsName = async (searchTerm) => {
  if (!searchTerm) {
    return { error: "No hay términos de búsqueda" };
  }
  /*  console.log("Este sería el término enviado desde el frontend", searchTerm); */ //* Log para rectificar si llegan datos por parametro
  console.log("Este es el término de búsqueda:", searchTerm);

  const productsDB = await Product.findAll({
    where: {
      nameProd: { [Op.iLike]: `%${searchTerm}%` },
    },
    include: { model: Category },
  });

  let allResults = [];

  if (productsDB.length > 0) {
    productsDB.forEach((product) => {
      allResults.push({
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
        category: product.Category.nameCat,
      });
    });
    return allResults;
  } else {
    return { error: "No se encontraron elementos" };
  }
};

module.exports = {
  getProductsName,
};

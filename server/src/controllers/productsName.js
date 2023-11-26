const { Product, Category } = require("../db");
const { Op } = require("sequelize");

const getByName = async (req, res) => {
  try {
    const searchTerm = req.query.name;
    /*  console.log("Este sería el término enviado desde el frontend", searchTerm); */ //* Log para rectificar si llegan datos por parametro

    if (!searchTerm) {
      return res.status(400).send({ error: "No hay términos de búsqueda" });
    }

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
          category: product.category,
        });
      });

      console.log(allResults);
      return res.status(200).json(allResults);
    } else {
      return res.status(400).send({ error: "No se encontraron elementos" });
    }
  } catch (error) {
    console.error("Error durante la búsqueda:", error);
    return res.status(400).send({ error: "No se encontraron elementos" });
  }
};

module.exports = {
  getByName,
};

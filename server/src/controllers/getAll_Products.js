const { Product, Category } = require("../db");

const getAllProducts = async (req, res) => {
  try {
    const productsDB = await Product.findAll({
      //* Trae todos los videojuegos de la base de datos
      include: { model: Category }, //* incluyendo el modelo de la categoria
    });
    /* console.log("Serian los productos ",productsDB); */ //* console log para ver que productos trae de la base de datos
    if (!productsDB) return res.status(400).send("No se encontraron productos")

    let allResults = [];

    if (productsDB.length > 0) {
      productsDB.forEach((product) => {
        allResults.push({
          id: product.id,
          name: product.nameProd,
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


      return res.status(200).json(allResults)

    }
  } catch (error) {
    return res.status(400).send("No hay productos");
  }
};

module.exports = {
  getAllProducts
}

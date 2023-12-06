const { Product, Category } = require("../../db");

const getProductCountByCategory = async(req, res)=>{
    try {
        // Utiliza Sequelize para obtener la cantidad de productos por categoría
        // const productCounts = await Category.findAll({
        //     attributes: ["nameCat"],
        //     include: [{
        //         model: Product,
        //         attributes: [[Product.sequelize.fn("COUNT", Product.sequelize.col("Products.id")), "productCount"]],
        //     },
        //     ],
        //     group: ["Category.id", "Products.id"], // Ajusta según tu modelo de Category
        // });
        // const productCounts = await Category.findAll({
        //     attributes: ["nameCat", [Product.sequelize.fn("COUNT", "Products.id"), "productCount"]],
        //     include: [
        //       {
        //         model: Product,
        //         attributes: [],
        //       },
        //     ],
        //     group: ["Category.id", "Products.id"], // Ajusta según tu modelo de Category y Product
        //   });
      
        // Formatea los resultados según sea necesario
        // const formattedProductCounts = productCounts.map((result) => ({
        //     category: result.nameCat,
        //     productCount: result.Products.length > 0 ? result.Products[0].get("productCount") : 0,
        // }));

        // res.json({ productCounts: formattedProductCounts });

        // const formattedProductCounts = productCounts.map((result) => ({
        //     category: result.nameCat,
        //     productCount: result.get("productCount"),
        //   }));
      
        //   res.json({ productCounts: formattedProductCounts });


        const productCounts = await Category.findAll({
            attributes: ["nameCat", [Product.sequelize.fn("COUNT", "Products.id"), "productCount"]],
            include: [
              {
                model: Product,
                attributes: [],
              },
            ],
            group: ["Category.id"], 
            // order: [[{
            //     column: "productCount",
            //     direction: "ASC",
            // }]],
          });
      
        // Formatea los resultados según sea necesario
        const formattedProductCounts = productCounts.map((result) => ({
            category: result.nameCat,
            productCount: result.get("productCount"),
          }));
      
          res.json({ productCounts: formattedProductCounts });


    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    getProductCountByCategory
}
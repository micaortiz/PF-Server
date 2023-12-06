const { Product, Category } = require("../../db");

const getProductCountByCategory = async(req, res)=>{
    try {
        const productCounts = await Category.findAll({
            attributes: ["nameCat", [Product.sequelize.fn("COUNT", "Products.id"), "productCount"]],
            include: [
              {
                model: Product,
                attributes: [],
              },
            ],
            group: ["Category.id"], 
        });
      
  
        const productCategoryCounts =productCounts.map((result) => ({
            category: result.nameCat,
            productCount: result.get("productCount"),
          }));
      
        // return res.status(200).json({ productCounts: formattedProductCounts });
        return res.status(200).json(productCategoryCounts);
        

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    getProductCountByCategory
}
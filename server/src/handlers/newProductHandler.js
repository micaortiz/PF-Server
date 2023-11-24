const {Product , Category} = require("../db")

const createProduct = async (nameProd, brand, description, price, discountPercentage, priceOnSale, image, tags, stock, CategoryId) =>{
    try {
        const [product, created] = await Product.findOrCreate({
            where: { nameProd, brand, description, price, discountPercentage, priceOnSale, image, tags, stock }
        });

        console.log("Product:", product.get());
        
        const giveCategory = await product.setCategory(CategoryId);

        if (giveCategory) {
            console.log("Category added successfully");
            return product;
        } else {
            console.log("Failed to add category");
        }
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}

module.exports = {
    createProduct,
};
const {Product , Category} = require("../db")

const createProduct = async (nameProd, brand, description, price, discountPercentage, image, tags, stock, CategoryId) =>{
    try {
        let priceOnSale = 0;
        if (discountPercentage === 0) { //* Se agregó estas lineas de código para válidar que el decuento del producto no pase un maximo ni un minimo
          priceOnSale = price;
        } else if (discountPercentage > 0 && discountPercentage <= 100) {
          priceOnSale = (price - price * (discountPercentage / 100)).toString();
        } else {
            throw new Error("discount value must be between 0 and 100") //* Verificar la validacion de los errores, ya que colapsa el servidor
        }


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
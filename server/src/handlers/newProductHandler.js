const {Product} = require("../db")

const createProduct = async (nameProd, brand, description, price, discountPercentage, priceOnSale, image, tags, stock) =>{
    const product = await Product.create({nameProd, brand, description, price, discountPercentage, priceOnSale, image, tags, stock})

    try {
        return product
    } catch (error) {
        return error
    }
}

module.exports = {
    createProduct,
};
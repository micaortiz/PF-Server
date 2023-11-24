const {Product} = require("../db")

const updateHandler = async (id, nameProd, brand, description, price, discountPercentage, image, tags, stock) => {
    const product = await Product.findByPk(id);
    if(!product){
        throw new Error("Product not found")
    }
    
    if (nameProd !== undefined) product.nameProd = nameProd;
    if (brand !== undefined) product.brand = brand;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (discountPercentage !== undefined) product.discountPercentage = discountPercentage;
    if (image !== undefined) product.image = image;
    if (tags !== undefined) product.tags = tags;
    if (stock !== undefined) product.stock = stock;

    await product.save();
    return product
}

module.exports = {
    updateHandler,
}
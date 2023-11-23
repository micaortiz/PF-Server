const { createProduct } = require("../handlers/newProductHandler");

const newProduct = async(req, res) => {
    const {nameProd, brand, description, price, discountPercentage, image, tags, stock} = req.body;
    let priceOnSale = 0
    if(discountPercentage === 0){
        priceOnSale = price
    } else {
        priceOnSale = ((price * (1 - (1 / discountPercentage)))).toString();
    }    
    try {
        const product = await createProduct(nameProd, brand, description, price, discountPercentage, priceOnSale, image, tags, stock)
        console.log({text: "Product succesfully created"});
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    newProduct,
}
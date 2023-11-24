const {Product} = require("../db")

const getProductsByIdHandler = async(id)=>{
    const productId = await Product.findByPk(id)
    return productId;
}

module.exports={
    getProductsByIdHandler
}